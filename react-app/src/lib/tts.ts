import { detectEnglishRatio } from './ocr'

let currentAudio: HTMLAudioElement | null = null
let currentUtterance: SpeechSynthesisUtterance | null = null

export function stopAllAudio() {
  if (currentAudio) {
    currentAudio.pause()
    currentAudio = null
  }
  if (currentUtterance) {
    speechSynthesis.cancel()
  }
}

export function speakText(text: string, onEnd?: () => void): void {
  // 停止当前播放
  stopAllAudio()

  // 检测文本语言
  const englishRatio = detectEnglishRatio(text)
  const lang = englishRatio >= 0.8 ? 'en' : 'zh-CN'

  // 使用 Google Translate TTS API
  const apiUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${lang}&client=tw-ob&q=${encodeURIComponent(text)}`

  currentAudio = new Audio(apiUrl)

  currentAudio.onended = () => {
    if (onEnd) onEnd()
  }

  currentAudio.onerror = (e) => {
    console.error('Google TTS error:', e)
    // 回退到浏览器内置 TTS
    fallbackSpeakText(text, onEnd)
  }

  currentAudio.play().catch((e) => {
    console.error('Audio play error:', e)
    // 回退到浏览器内置 TTS
    fallbackSpeakText(text, onEnd)
  })
}

// 回退：浏览器内置 TTS
async function fallbackSpeakText(text: string, onEnd?: () => void) {
  if (currentUtterance) {
    speechSynthesis.cancel()
  }

  // 等待语音列表加载
  await new Promise<void>(resolve => {
    const voices = speechSynthesis.getVoices()
    if (voices.length > 0) {
      resolve()
    } else {
      speechSynthesis.onvoiceschanged = () => resolve()
    }
  })

  const voices = speechSynthesis.getVoices()
  const englishRatio = detectEnglishRatio(text)

  currentUtterance = new SpeechSynthesisUtterance(text)
  currentUtterance.lang = englishRatio >= 0.8 ? 'en-US' : 'zh-CN'
  currentUtterance.rate = 0.9
  currentUtterance.pitch = 1
  currentUtterance.volume = 1

  // 选择最佳语音
  const bestVoice = voices.find(voice =>
    englishRatio >= 0.8
      ? (voice.lang.includes('en-US') || voice.lang.includes('en-GB')) &&
        (voice.name.includes('Google') || voice.name.includes('Microsoft') || voice.name.includes('Samantha'))
      : voice.lang.includes('zh-CN') &&
        (voice.name.includes('Google') || voice.name.includes('Microsoft') || voice.name.includes('Ting-Ting'))
  )

  if (bestVoice) {
    currentUtterance.voice = bestVoice
    console.log('Using voice:', bestVoice.name)
  }

  currentUtterance.onend = () => {
    if (onEnd) onEnd()
  }

  currentUtterance.onerror = (e) => {
    console.error('Speech error:', e)
    if (onEnd) onEnd()
  }

  speechSynthesis.speak(currentUtterance)
}
