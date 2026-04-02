interface ResultListProps {
  items: string[]
  currentIndex: number
  onUpdate: (index: number, value: string) => void
  onDelete: (index: number) => void
  onAdd: () => void
  onSpeak: (index: number) => void
}

export function ResultList({
  items,
  currentIndex,
  onUpdate,
  onDelete,
  onAdd,
  onSpeak
}: ResultListProps) {
  if (items.length === 0) return null

  return (
    <div className="result-section show">
      <div className="result-header">
        <h2>Recognition Results</h2>
        <button className="btn btn-secondary" onClick={onAdd}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ verticalAlign: 'middle', marginRight: '6px' }}>
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add Entry
        </button>
      </div>

      <div className="result-list">
        {items.map((item, index) => (
          <div
            key={index}
            className={`result-item ${index === currentIndex ? 'current-playing' : ''}`}
          >
            <span className="item-number">{index + 1}.</span>
            <input
              type="text"
              className="item-input"
              value={item}
              onChange={(e) => onUpdate(index, e.target.value)}
            />
            <button
              className="btn btn-speak"
              onClick={() => onSpeak(index)}
              title="Play"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              </svg>
            </button>
            <button
              className="btn btn-delete"
              onClick={() => onDelete(index)}
              title="Delete"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <style>{`
        .result-section {
          margin-bottom: 24px;
        }

        .result-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .result-header h2 {
          font-size: 16px;
          font-weight: 600;
        }

        .btn {
          padding: 8px 16px;
          border: none;
          border-radius: var(--radius);
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-weight: 500;
        }

        .btn-secondary {
          background: hsl(var(--secondary));
          color: hsl(var(--secondary-foreground));
        }

        .btn-secondary:hover {
          background: hsl(var(--secondary) / 0.8);
        }

        .result-list {
          background: hsl(var(--card));
          border-radius: var(--radius);
          border: 1px solid hsl(var(--border));
          padding: 16px;
          max-height: 400px;
          overflow-y: auto;
        }

        .result-item {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 8px;
          padding: 10px 12px;
          background: hsl(var(--secondary));
          border-radius: 6px;
          transition: all 0.2s ease;
        }

        .result-item:last-child {
          margin-bottom: 0;
        }

        .result-item.current-playing {
          background: hsl(217.2 91.2% 59.8% / 0.1);
          border: 1px solid hsl(217.2 91.2% 59.8% / 0.3);
        }

        .item-number {
          color: hsl(var(--muted-foreground));
          font-size: 12px;
          font-weight: 500;
          min-width: 24px;
        }

        .item-input {
          flex: 1;
          border: none;
          background: transparent;
          font-size: 14px;
          color: hsl(var(--foreground));
          outline: none;
        }

        .item-input:focus {
          background: hsl(var(--background));
          border-radius: 4px;
          padding: 4px 8px;
          margin: -4px -8px;
        }

        .btn-delete {
          padding: 4px 8px;
          font-size: 16px;
          color: hsl(var(--muted-foreground));
          background: transparent;
        }

        .btn-delete:hover {
          color: hsl(var(--destructive));
          background: hsl(var(--destructive) / 0.1);
        }

        .btn-speak {
          padding: 4px 8px;
          font-size: 16px;
          color: hsl(var(--muted-foreground));
          background: transparent;
        }

        .btn-speak:hover {
          color: hsl(217.2 91.2% 59.8%);
          background: hsl(217.2 91.2% 59.8% / 0.1);
        }

        .result-list::-webkit-scrollbar {
          width: 6px;
        }

        .result-list::-webkit-scrollbar-track {
          background: transparent;
        }

        .result-list::-webkit-scrollbar-thumb {
          background: hsl(var(--border));
          border-radius: 3px;
        }

        .result-list::-webkit-scrollbar-thumb:hover {
          background: hsl(var(--muted-foreground));
        }
      `}</style>
    </div>
  )
}
