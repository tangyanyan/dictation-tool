// 文件转 Base64
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => resolve(e.target?.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

// 检测英文比例
export function detectEnglishRatio(text: string): number {
  if (!text || text.trim().length === 0) return 0

  const cleanText = text.replace(/\s+/g, '')
  if (cleanText.length === 0) return 0

  const englishChars = (cleanText.match(/[a-zA-Z]/g) || []).length
  return englishChars / cleanText.length
}

// OCR 识别
export async function performOCR(imageBase64: string): Promise<string | null> {
  try {
    const base64Data = imageBase64.split(',')[1]

    // 第一步：用英文识别快速检测语言
    const formData = new FormData()
    formData.append('base64Image', 'data:image/png;base64,' + base64Data)
    formData.append('apikey', 'K83524497588957')
    formData.append('language', 'eng')
    formData.append('isOverlayRequired', 'false')
    formData.append('OCREngine', '2')

    let response = await fetch('https://api.ocr.space/parse/image', {
      method: 'POST',
      body: formData
    })

    let result = await response.json()

    if (result.OCRExitCode === 1 && result.ParsedResults && result.ParsedResults.length > 0) {
      const text = result.ParsedResults[0].ParsedText
      const englishRatio = detectEnglishRatio(text)

      // 如果英文比例 >= 80%，直接返回结果
      if (englishRatio >= 0.8) {
        console.log(`Detected English document (English ratio: ${(englishRatio * 100).toFixed(1)}%)`)
        return text
      }

      // 如果英文比例 < 80%，用中文重新识别
      console.log(`Detected Chinese/mixed document (English ratio: ${(englishRatio * 100).toFixed(1)}%), Re-recognizing...`)

      const formDataChs = new FormData()
      formDataChs.append('base64Image', 'data:image/png;base64,' + base64Data)
      formDataChs.append('apikey', 'K83524497588957')
      formDataChs.append('language', 'chs')
      formDataChs.append('isOverlayRequired', 'false')
      formDataChs.append('OCREngine', '2')

      response = await fetch('https://api.ocr.space/parse/image', {
        method: 'POST',
        body: formDataChs
      })

      result = await response.json()

      if (result.OCRExitCode === 1 && result.ParsedResults && result.ParsedResults.length > 0) {
        return result.ParsedResults[0].ParsedText
      }
    }

    if (result.ErrorMessage) {
      console.error('OCR Error:', result.ErrorMessage)
    }
    return null
  } catch (error) {
    console.error('OCR error:', error)
    return null
  }
}

// 处理 OCR 结果
export function processOCRResult(text: string): string[] {
  // 按行分割并过滤空行
  let lines = text.split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)

  // 移除开头的序号
  lines = lines.map(line => {
    return line.replace(/^[\d]+[.、\s]+/, '').trim()
  }).filter(line => line.length > 0)

  return lines
}
