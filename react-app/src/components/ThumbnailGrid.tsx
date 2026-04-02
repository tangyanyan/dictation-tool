interface ThumbnailGridProps {
  files: File[]
  imageDataMap: Map<string, string>
  onRemove: (fileName: string) => void
  onPreview: (imageData: string) => void
}

export function ThumbnailGrid({ files, imageDataMap, onRemove, onPreview }: ThumbnailGridProps) {
  return (
    <>
      <div className="thumbnails-container">
        {files.map(file => {
          const imageData = imageDataMap.get(file.name)
          if (!imageData) return null

          return (
            <div
              key={file.name}
              className="thumbnail-item"
              onClick={() => onPreview(imageData)}
            >
              <img src={imageData} alt={file.name} />
              <button
                className="remove-btn"
                onClick={(e) => {
                  e.stopPropagation()
                  onRemove(file.name)
                }}
              >
                ×
              </button>
            </div>
          )
        })}
      </div>

      <style>{`
        .thumbnails-container {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 24px;
          justify-content: center;
          max-width: 900px;
        }

        .thumbnail-item {
          position: relative;
          width: 80px;
          height: 80px;
          border-radius: 6px;
          overflow: hidden;
          border: 1px solid hsl(var(--border));
          cursor: pointer;
        }

        .thumbnail-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .thumbnail-item .remove-btn {
          position: absolute;
          top: 4px;
          right: 4px;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: hsl(var(--destructive));
          color: hsl(var(--destructive-foreground));
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          opacity: 0;
          transition: opacity 0.2s;
        }

        .thumbnail-item:hover .remove-btn {
          opacity: 1;
        }
      `}</style>
    </>
  )
}

export function ImagePreviewModal({
  imageData,
  isOpen,
  onClose
}: {
  imageData: string | null
  isOpen: boolean
  onClose: () => void
}) {
  if (!isOpen || !imageData) return null

  return (
    <>
      <div className="image-preview-overlay show" onClick={(e) => {
        if (e.currentTarget === e.target) onClose()
      }}>
        <button className="close-btn" onClick={onClose}>×</button>
        <img src={imageData} alt="Preview" />
      </div>

      <style>{`
        .image-preview-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 40px;
        }

        .image-preview-overlay img {
          max-width: 90%;
          max-height: 90%;
          border-radius: 8px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
        }

        .image-preview-overlay .close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: hsl(var(--secondary));
          color: hsl(var(--secondary-foreground));
          border: none;
          cursor: pointer;
          font-size: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .image-preview-overlay .close-btn:hover {
          background: hsl(var(--destructive));
          color: hsl(var(--destructive-foreground));
        }
      `}</style>
    </>
  )
}
