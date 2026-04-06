'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{
        margin: 0,
        padding: 0,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0a0a0f',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}>
        <div style={{
          textAlign: 'center',
          padding: '2rem',
          maxWidth: '500px',
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            margin: '0 auto 1.5rem',
            borderRadius: '50%',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ef4444"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h1 style={{
            color: 'white',
            fontSize: '1.5rem',
            fontWeight: 600,
            margin: '0 0 1rem',
          }}>
            Something went wrong
          </h1>
          <p style={{
            color: '#9ca3af',
            fontSize: '1rem',
            margin: '0 0 1.5rem',
            lineHeight: 1.6,
          }}>
            A critical error occurred. Please try refreshing the page.
          </p>
          {error.message && (
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '1.5rem',
            }}>
              <code style={{
                color: '#9ca3af',
                fontSize: '0.875rem',
                wordBreak: 'break-word',
              }}>
                {error.message}
              </code>
            </div>
          )}
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}>
            <button
              onClick={reset}
              style={{
                backgroundColor: '#0d9488',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              Try Again
            </button>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/"
              style={{
                backgroundColor: 'transparent',
                color: '#9ca3af',
                border: '1px solid #374151',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: 500,
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              Go Home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
