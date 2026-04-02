interface PlayerProps {
  items: string[]
  currentIndex: number
  isPlaying: boolean
  interval: number
  loopCount: number
  onPrev: () => void
  onNext: () => void
  onTogglePlay: () => void
  onIntervalChange: (value: number) => void
  onLoopCountChange: (value: number) => void
  disabled: boolean
}

export function Player({
  items,
  currentIndex,
  isPlaying,
  interval,
  loopCount,
  onPrev,
  onNext,
  onTogglePlay,
  onIntervalChange,
  onLoopCountChange,
  disabled
}: PlayerProps) {
  return (
    <div className="player-section">
      {items.length > 0 && (
        <div className="progress-indicator">
          Preparing to play item <strong>{currentIndex + 1}</strong> / <strong>{items.length}</strong> items
        </div>
      )}

      <div className="player-controls">
        <button
          className="btn btn-secondary btn-nav"
          onClick={onPrev}
          disabled={disabled}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '6px', verticalAlign: 'middle' }}>
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          <span style={{ verticalAlign: 'middle' }}>Previous</span>
        </button>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <button
            className="btn btn-play"
            onClick={onTogglePlay}
            disabled={disabled}
          >
            <span>{isPlaying ? '⏸' : '▶'}</span>
          </button>
          <span className="btn-play-text">
            {isPlaying ? 'Restart' : 'Start Dictation'}
          </span>
        </div>

        <button
          className="btn btn-secondary btn-nav"
          onClick={onNext}
          disabled={disabled}
        >
          <span style={{ verticalAlign: 'middle' }}>Next</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: '6px', verticalAlign: 'middle' }}>
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '24px', marginTop: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label style={{ fontSize: '13px', color: 'hsl(var(--muted-foreground))' }}>Interval</label>
          <div className="select-wrapper">
            <select
              value={interval}
              onChange={(e) => onIntervalChange(Number(e.target.value))}
            >
              <option value="5">5s</option>
              <option value="10">10s</option>
              <option value="15">15s</option>
              <option value="20">20s</option>
              <option value="25">25s</option>
            </select>
            <svg className="select-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label style={{ fontSize: '13px', color: 'hsl(var(--muted-foreground))' }}>Loop Count</label>
          <div className="select-wrapper">
            <select
              value={loopCount}
              onChange={(e) => onLoopCountChange(Number(e.target.value))}
            >
              <option value="1">1x</option>
              <option value="2">2x</option>
              <option value="3">3x</option>
              <option value="4">4x</option>
              <option value="5">5x</option>
            </select>
            <svg className="select-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>
      </div>

      <style>{`
        .player-section {
          background: hsl(var(--card));
          border-radius: var(--radius);
          border: 1px solid hsl(var(--border));
          padding: 24px;
        }

        .progress-indicator {
          text-align: center;
          font-size: 14px;
          color: hsl(var(--muted-foreground));
          margin-bottom: 20px;
        }

        .progress-indicator strong {
          color: hsl(var(--foreground));
          font-size: 18px;
        }

        .player-controls {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
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

        .btn-secondary:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .btn-nav {
          padding: 8px 12px;
        }

        .btn-play {
          width: 140px;
          height: 56px;
          border-radius: 50px;
          background-image: linear-gradient(135deg, #feb692 0%, #ea5455 100%);
          box-shadow: 0 20px 30px -6px rgba(238, 103, 97, 0.5);
          border: none;
          cursor: pointer;
          color: white;
          font-size: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease-in-out;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .btn-play:hover {
          transform: translateY(3px);
          box-shadow: none;
        }

        .btn-play:active {
          opacity: 0.5;
        }

        .btn-play:disabled {
          opacity: 0.4;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .btn-play-text {
          font-size: 13px;
          font-weight: 500;
          color: hsl(var(--muted-foreground));
          white-space: nowrap;
        }

        .select-wrapper {
          position: relative;
          display: inline-flex;
          align-items: center;
        }

        .select-wrapper select {
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          padding: 8px 36px 8px 12px;
          padding-right: 36px;
          border-radius: 6px;
          background: hsl(var(--background));
          color: hsl(var(--foreground));
          border: 1px solid hsl(var(--border));
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s;
          min-width: 80px;
        }

        .select-wrapper select:hover {
          border-color: hsl(var(--ring));
        }

        .select-wrapper select:focus {
          outline: none;
          border-color: hsl(var(--ring));
          box-shadow: 0 0 0 2px hsl(var(--ring) / 0.2);
        }

        .select-icon {
          position: absolute;
          right: 10px;
          pointer-events: none;
          color: hsl(var(--muted-foreground));
          transition: transform 0.2s;
        }

        .select-wrapper:hover .select-icon {
          color: hsl(var(--foreground));
        }
      `}</style>
    </div>
  )
}
