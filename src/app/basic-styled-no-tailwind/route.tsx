import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

export async function GET() {
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
          backgroundColor: 'white',
        }}
      >
        <div
          style={{
            display: 'flex',
            backgroundColor: 'gray',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              paddingTop: '12px',
              paddingBottom: '12px',
              paddingLeft: '4px',
              paddingRight: '4px',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <h2
              style={{
                display: 'flex',
                flexDirection: 'column',
                fontSize: '1.875rem',
                lineHeight: '2.25rem',
                fontWeight: 'bold',
                color: 'gray',
                textAlign: 'left',
              }}
            >
              <span>Ready to dive in?</span>
              <span
                style={{
                  color: '#4F46E5',
                }}
              >
                Start your free trial today.
              </span>
            </h2>
            <div style={{ display: 'flex' }}>
              <div
                style={{
                  display: 'flex',
                  borderRadius: '0.375rem',
                  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                }}
              >
                <a
                  href="#"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '0.375rem',
                    borderWidth: '1px',
                    backgroundColor: '#4F46E5',
                    paddingLeft: '1rem',
                    paddingRight: '1rem',
                    paddingTop: '0.75rem',
                    paddingBottom: '0.75rem',
                    fontSize: '1rem',
                    fontWeight: 500,
                    lineHeight: '1.25rem',
                    color: 'white',
                  }}
                >
                  Get started
                </a>
              </div>
              <div
                style={{
                  display: 'flex',
                  borderRadius: '0.375rem',
                  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                  marginLeft: '0.75rem',
                }}
              >
                <a
                  href="#"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '0.375rem',
                    borderWidth: '1px',
                    backgroundColor: 'white',
                    paddingLeft: '1rem',
                    paddingRight: '1rem',
                    paddingTop: '0.75rem',
                    paddingBottom: '0.75rem',
                    fontSize: '1rem',
                    fontWeight: 500,
                    lineHeight: '1.25rem',
                    color: '#4F46E5',
                  }}
                >
                  Learn more
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1035,
      height: 1194,
    },
  );
}
