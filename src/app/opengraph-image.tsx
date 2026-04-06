import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0a0a0f 0%, #111118 50%, #0d1117 100%)',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '24px',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #0d9488, #0f766e)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              fontWeight: 'bold',
              color: 'white',
            }}
          >
            Z
          </div>
          <div
            style={{
              fontSize: '48px',
              fontWeight: 'bold',
              color: 'white',
            }}
          >
            Zyphon Systems
          </div>
        </div>
        <div
          style={{
            fontSize: '24px',
            color: '#a1a1aa',
            maxWidth: '600px',
            textAlign: 'center',
          }}
        >
          Production-Ready Mobile Apps, Admin Panels & Digital Platforms
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
