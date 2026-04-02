import { useCallback } from 'react'

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void
}

export function FileUpload({ onFilesSelected }: FileUploadProps) {
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.currentTarget.classList.add('dragover')
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.currentTarget.classList.remove('dragover')
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.currentTarget.classList.remove('dragover')
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'))
    if (files.length > 0) {
      onFilesSelected(files)
    }
  }, [onFilesSelected])

  const handleClick = useCallback(() => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.multiple = true
    input.onchange = (e) => {
      const files = Array.from((e.target as HTMLInputElement).files || [])
      if (files.length > 0) {
        onFilesSelected(files)
      }
    }
    input.click()
  }, [onFilesSelected])

  return (
    <div
      className="upload-section"
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="folder">
        <div className="back-side">
          <div className="cover"></div>
        </div>
        <div className="front-side">
          <div className="tip"></div>
          <div className="cover"></div>
        </div>
      </div>
      <div className="upload-text">Upload a File</div>

      <style>{`
        .upload-section {
          --transition: 350ms;
          --folder-W: 120px;
          --folder-H: 80px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          padding: 20px;
          background: linear-gradient(135deg, #f162ba, #ed45ae);
          border-radius: 20px;
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
          height: calc(var(--folder-H) * 1.7);
          width: 240px;
          margin: 0 auto 24px auto;
          border: none;
          cursor: pointer;
          transition: all var(--transition) ease;
          position: relative;
        }

        .upload-section:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .upload-section.dragover {
          background: linear-gradient(135deg, #ff7ed4, #ff5cb8);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
        }

        .folder {
          position: absolute;
          top: 5px;
          left: calc(50% - 60px);
          animation: float 2.5s infinite ease-in-out;
          transition: transform var(--transition) ease;
          pointer-events: none;
        }

        .folder .front-side,
        .folder .back-side {
          position: absolute;
          transition: transform var(--transition);
          transform-origin: bottom center;
          top: 0;
          left: 0;
        }

        .folder .back-side::before,
        .folder .back-side::after {
          content: "";
          display: block;
          background-color: white;
          opacity: 0.5;
          width: var(--folder-W);
          height: var(--folder-H);
          position: absolute;
          top: 0;
          left: 0;
          transform-origin: bottom center;
          border-radius: 15px;
          transition: transform 350ms;
          z-index: 0;
        }

        .upload-section:hover .back-side::before {
          transform: rotateX(-5deg) skewX(5deg);
        }

        .upload-section:hover .back-side::after {
          transform: rotateX(-15deg) skewX(12deg);
        }

        .folder .front-side {
          z-index: 1;
        }

        .upload-section:hover .front-side {
          transform: rotateX(-40deg) skewX(15deg);
        }

        .folder .tip {
          background: linear-gradient(135deg, #ff9a56, #ff6f56);
          width: 80px;
          height: 20px;
          border-radius: 12px 12px 0 0;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
          position: absolute;
          top: -10px;
          left: 0;
          z-index: 2;
        }

        .folder .cover {
          background: linear-gradient(135deg, #ffe563, #ffc663);
          width: var(--folder-W);
          height: var(--folder-H);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
          border-radius: 10px;
        }

        .upload-text {
          font-size: 1.1em;
          color: #ffffff;
          text-align: center;
          background: rgba(255, 255, 255, 0.2);
          border: none;
          border-radius: 10px;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
          transition: background var(--transition) ease;
          display: block;
          padding: 10px 35px;
          position: relative;
          z-index: 10;
          pointer-events: none;
          line-height: 1.4;
        }

        .upload-section:hover .upload-text {
          background: rgba(255, 255, 255, 0.4);
        }

        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
          100% {
            transform: translateY(0px);
          }
        }
      `}</style>
    </div>
  )
}
