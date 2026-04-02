import { useState, useEffect, useCallback, useRef } from 'react'
import { FileUpload } from './components/FileUpload'
import { ThumbnailGrid, ImagePreviewModal } from './components/ThumbnailGrid'
import { ResultList } from './components/ResultList'
import { Player } from './components/Player'
import { StatusMessage } from './components/StatusMessage'
import { fileToBase64, performOCR, processOCRResult } from './lib/ocr'
import { speakText, stopAllAudio } from './lib/tts'

function App() {
  // 文件状态
  const [files, setFiles] = useState<File[]>([])
  const [imageDataMap, setImageDataMap] = useState<Map<string, string>>(new Map())

  // OCR 状态
  const [status, setStatus] = useState<{ type: 'loading' | 'success' | 'error' | 'hidden', message: string }>({
    type: 'hidden',
    message: ''
  })

  // 结果状态
  const [items, setItems] = useState<string[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  // 播放状态
  const [isPlaying, setIsPlaying] = useState(false)
  const [interval, setInterval] = useState(10)
  const [loopCount, setLoopCount] = useState(1)

  // 图片预览
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  // 播放控制 ref
  const playTimeoutRef = useRef<number | null>(null)
  const currentLoopRef = useRef(0)

  // 处理文件上传
  const handleFilesSelected = useCallback(async (newFiles: File[]) => {
    setFiles(prev => [...prev, ...newFiles])

    // 读取图片数据
    for (const file of newFiles) {
      const base64 = await fileToBase64(file)
      setImageDataMap(prev => new Map(prev).set(file.name, base64))
    }

    // 开始 OCR
    processAllImages([...files, ...newFiles])
  }, [files])

  // 处理所有图片
  const processAllImages = async (filesToProcess: File[]) => {
    setStatus({ type: 'loading', message: 'Recognizing...' })

    const allTexts: string[] = []

    for (let i = 0; i < filesToProcess.length; i++) {
      try {
        const base64 = await fileToBase64(filesToProcess[i])
        const text = await performOCR(base64)
        if (text) {
          allTexts.push(text)
        }
      } catch (error) {
        console.error('OCR error for file:', filesToProcess[i].name, error)
      }
    }

    if (allTexts.length > 0) {
      const processedLines = processOCRResult(allTexts.join('\n'))
      setItems(processedLines)
      setCurrentIndex(0)
      setStatus({ type: 'success', message: `Recognition completed with ${processedLines.length} items` })
    } else {
      setStatus({ type: 'error', message: 'Recognition failed, please retry' })
    }
  }

  // 移除缩略图
  const handleRemoveThumbnail = useCallback((fileName: string) => {
    const newFiles = files.filter(f => f.name !== fileName)
    setFiles(newFiles)

    const newImageDataMap = new Map(imageDataMap)
    newImageDataMap.delete(fileName)
    setImageDataMap(newImageDataMap)

    // 如果还有图片，重新识别
    if (newFiles.length > 0) {
      processAllImages(newFiles)
    } else {
      setItems([])
    }
  }, [files, imageDataMap])

  // 预览图片
  const handlePreview = useCallback((imageData: string) => {
    setPreviewImage(imageData)
    setIsPreviewOpen(true)
  }, [])

  // 更新项目
  const handleUpdateItem = useCallback((index: number, value: string) => {
    setItems(prev => {
      const newItems = [...prev]
      newItems[index] = value
      return newItems
    })
  }, [])

  // 删除项目
  const handleDeleteItem = useCallback((index: number) => {
    setItems(prev => {
      const newItems = prev.filter((_, i) => i !== index)
      if (currentIndex >= newItems.length) {
        setCurrentIndex(Math.max(0, newItems.length - 1))
      }
      return newItems
    })
  }, [currentIndex])

  // 添加项目
  const handleAddItem = useCallback(() => {
    setItems(prev => [...prev, ''])
  }, [])

  // 单独播放某一项目
  const handleSpeakSingleItem = useCallback((index: number) => {
    if (index < 0 || index >= items.length) return

    const text = items[index]

    stopAllAudio()
    setIsPlaying(false)

    let currentLoop = 0
    const playLoop = () => {
      if (currentLoop >= loopCount) return
      currentLoop++

      speakText(text, () => {
        if (currentLoop < loopCount) {
          setTimeout(() => playLoop(), 500)
        }
      })
    }

    playLoop()
  }, [items, loopCount])

  // 播放当前项目
  const playCurrentItem = useCallback(() => {
    if (!isPlaying || currentIndex >= items.length) {
      setCurrentIndex(0)
      setIsPlaying(false)
      return
    }

    const text = items[currentIndex]

    playTimeoutRef.current = window.setTimeout(() => {
      if (!isPlaying) return

      currentLoopRef.current = 0
      const playLoop = () => {
        if (!isPlaying || currentLoopRef.current >= loopCount) {
          // 循环完成，播放下一个
          playTimeoutRef.current = window.setTimeout(() => {
            setCurrentIndex(prev => prev + 1)
          }, interval * 1000)
          return
        }

        currentLoopRef.current++
        speakText(text, () => {
          if (currentLoopRef.current < loopCount) {
            setTimeout(() => playLoop(), 500)
          } else {
            // 循环完成，播放下一个
            playTimeoutRef.current = window.setTimeout(() => {
              setCurrentIndex(prev => prev + 1)
            }, interval * 1000)
          }
        })
      }

      playLoop()
    }, 3000)
  }, [isPlaying, currentIndex, items, interval, loopCount])

  // 监听 currentIndex 变化，继续播放
  useEffect(() => {
    if (isPlaying) {
      playCurrentItem()
    }
  }, [currentIndex, isPlaying])

  // 切换播放
  const handleTogglePlay = useCallback(() => {
    if (isPlaying) {
      // 停止播放
      setIsPlaying(false)
      if (playTimeoutRef.current) {
        clearTimeout(playTimeoutRef.current)
        playTimeoutRef.current = null
      }
      stopAllAudio()
    } else {
      // 开始播放
      setIsPlaying(true)
    }
  }, [isPlaying])

  // 上一个
  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }, [currentIndex])

  // 下一个
  const handleNext = useCallback(() => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }, [currentIndex, items.length])

  // ESC 键关闭预览
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsPreviewOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // 页面卸载时清理
  useEffect(() => {
    return () => {
      stopAllAudio()
      if (playTimeoutRef.current) {
        clearTimeout(playTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '8px', fontSize: '28px', fontWeight: 600, letterSpacing: '-0.02em' }}>
        Intelligent Transcription
      </h1>
      <p style={{ textAlign: 'center', color: 'hsl(var(--muted-foreground))', marginBottom: '72px', fontSize: '12px' }}>
        Upload handwriting images → OCR recognition → Voice dictation
      </p>

      <FileUpload onFilesSelected={handleFilesSelected} />

      <ThumbnailGrid
        files={files}
        imageDataMap={imageDataMap}
        onRemove={handleRemoveThumbnail}
        onPreview={handlePreview}
      />

      <StatusMessage type={status.type} message={status.message} />

      <ResultList
        items={items}
        currentIndex={currentIndex}
        onUpdate={handleUpdateItem}
        onDelete={handleDeleteItem}
        onAdd={handleAddItem}
        onSpeak={handleSpeakSingleItem}
      />

      <Player
        items={items}
        currentIndex={currentIndex}
        isPlaying={isPlaying}
        interval={interval}
        loopCount={loopCount}
        onPrev={handlePrev}
        onNext={handleNext}
        onTogglePlay={handleTogglePlay}
        onIntervalChange={setInterval}
        onLoopCountChange={setLoopCount}
        disabled={items.length === 0}
      />

      <ImagePreviewModal
        imageData={previewImage}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
      />
    </div>
  )
}

export default App
