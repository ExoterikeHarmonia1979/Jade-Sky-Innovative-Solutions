import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Jade Sky Innovative Solutions — Azure, Microsoft 365 & AI Consulting';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
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
          backgroundColor: '#0b1120',
          backgroundImage: 'radial-gradient(circle at 50% 50%, #0f1b33 0%, #0b1120 70%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 96,
            height: 96,
            borderRadius: 24,
            border: '4px solid #22c58b',
            marginBottom: 40,
          }}
        >
          <span style={{ fontSize: 56 }}>☁</span>
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: '#f3f4f6',
            textAlign: 'center',
            padding: '0 80px',
          }}
        >
          Jade Sky Innovative Solutions
        </div>
        <div style={{ fontSize: 32, color: '#22c58b', marginTop: 24 }}>
          Azure · Microsoft 365 · AI Consulting
        </div>
      </div>
    ),
    { ...size }
  );
}
