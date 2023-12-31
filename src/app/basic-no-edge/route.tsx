import { NextRequest } from 'next/server';
import { ImageResponse } from '@vercel/og';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);
  const title = params.get('title') ?? 'Created with Netlify edge functions';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
          fontSize: 32,
        }}
      >
        <div>{title}</div>
        <div>World</div>
      </div>
    ),
    {
      width: 1035,
      height: 1194,
    },
  );
}
