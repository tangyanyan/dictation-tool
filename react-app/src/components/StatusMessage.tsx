interface StatusMessageProps {
  type: 'loading' | 'success' | 'error' | 'hidden'
  message: string
}

export function StatusMessage({ type, message }: StatusMessageProps) {
  if (type === 'hidden') return null

  return (
    <>
      <div className={`status ${type}`}>
        {type === 'loading' && <div className="spinner"></div>}
        {message}
      </div>

      <style>{`
        .status {
          padding: 12px 16px;
          border-radius: var(--radius);
          margin-bottom: 24px;
          font-size: 14px;
        }

        .status.loading {
          display: flex;
          align-items: center;
          gap: 8px;
          background: hsl(var(--secondary));
          color: hsl(var(--secondary-foreground));
        }

        .status.success {
          display: block;
          background: hsl(142.1 76.2% 36.3% / 0.1);
          color: hsl(142.1 76.2% 36.3%);
          border: 1px solid hsl(142.1 76.2% 36.3% / 0.2);
        }

        .status.error {
          display: block;
          background: hsl(var(--destructive) / 0.1);
          color: hsl(var(--destructive-foreground));
          border: 1px solid hsl(var(--destructive) / 0.2);
        }

        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid hsl(var(--muted));
          border-top-color: hsl(var(--foreground));
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  )
}
