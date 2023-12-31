import { NextRequest } from 'next/server';
import { ImageResponse } from '@vercel/og';
import { CardSauceBG } from '@/app/card/CardSauceBG';

/**
 * @params {string} username - username for the requested user
 * @params {number} w - Width of the card
 */

export const runtime = 'edge';

const ASPECT_RATIO = 245 / 348;
const BASE_WIDTH = 245;
const DEFAULT_WIDTH = 735;
const MAX_WIDTH = 1960;

const logoImg = fetch(new URL('../logo.png', import.meta.url)).then((res) => res.arrayBuffer());
const interSemiBoldFont = fetch(new URL('../Inter-SemiBold.ttf', import.meta.url)).then((res) =>
  res.arrayBuffer(),
);
const interBlackFont = fetch(new URL('../Inter-Black.ttf', import.meta.url)).then((res) =>
  res.arrayBuffer(),
);

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  if (!username) {
    return new Response('A username must be specified', { status: 403 });
  }

  const requestedWidth = Number.parseInt(searchParams.get('w') ?? '0', 10) || DEFAULT_WIDTH;

  const width = Math.min(requestedWidth, MAX_WIDTH);
  const height = width / ASPECT_RATIO;
  const avatarURL = getAvatarByUsername(username, 600);

  function size(size: number) {
    return size * (width / BASE_WIDTH);
  }

  const bufferSize = size(50);

  const [interSemiBoldFontData, interBlackFontData, logoImgData, prReq] = await Promise.all([
    interSemiBoldFont,
    interBlackFont,
    logoImg,
    fetchContributorPRs(username),
  ]);

  const { data: prData } = prReq;
  const prs = prData.length;
  const repos = getRepoList(
    Array.from(new Set(prData.map((prData: any) => prData.full_name))).join(','),
  ).length;

  return new ImageResponse(
    (
      <div
        style={{
          fontFamily: '"Inter"',
          display: 'flex',
          fontSize: size(16),
          fontWeight: 700,
          paddingBottom: bufferSize,
          paddingLeft: bufferSize,
          paddingRight: bufferSize,
        }}
      >
        <div
          style={{
            display: 'flex',
            position: 'relative',
            alignItems: 'stretch',
            overflow: 'hidden',
            border: '2px solid #fff',
            width,
            height,
            borderRadius: size(16),
            borderWidth: size(2),
            boxShadow: `0px ${size(20)} ${size(30)} -12px rgba(0, 0, 0, 0.25)`,
            background:
              '#11181C linear-gradient(152.13deg, rgba(217, 217, 217, 0.6) 4.98%, rgba(217, 217, 217, 0.1) 65.85%)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'stretch',
              overflow: 'hidden',
              width: '100%',
              height: '100%',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  height: '50%',
                  width: '100%',
                  position: 'relative',
                  flexShrink: 0,
                  flexGrow: 1,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                  }}
                >
                  <CardSauceBG width={size(245)} height={size(177)} />
                </div>
                <div
                  style={{
                    display: 'flex',
                    position: 'absolute',
                    alignItems: 'center',
                    left: size(10),
                    top: size(10),
                    height: size(13),
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element  */}
                  <img
                    alt="Open Sauced Logo"
                    width={size(13)}
                    height={size(13)}
                    // @ts-ignore
                    src={logoImgData}
                  />
                  <p style={{ fontSize: `${size(8)}px`, color: 'white' }}>OpenSauced</p>
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  color: '#fff',
                  height: '50%',
                  flexShrink: 0,
                  flexGrow: 1,
                  paddingTop: size(40),
                  paddingBottom: size(18),
                }}
              >
                <div
                  style={{ fontSize: size(14), marginBottom: size(12), fontWeight: 700 }}
                >{`@${username}`}</div>
                <div
                  style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-around',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 900,
                        display: 'flex',
                        fontSize: size(60),
                      }}
                    >
                      {prs}
                    </div>
                    <div style={{ display: 'flex', fontSize: size(12) }}>PRs created</div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                    }}
                  >
                    <div style={{ display: 'flex', fontWeight: 900, fontSize: size(60) }}>
                      {repos}
                    </div>
                    <div style={{ display: 'flex', fontSize: size(12) }}>
                      {repos === 1 ? 'Repo' : 'Repos'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={avatarURL}
              alt="avatar"
              width={size(116)}
              height={size(116)}
              style={{
                position: 'absolute',
                borderRadius: '1000px',
                border: `${size(2)}px solid #fff`,
                left: '50%',
                top: '50%',
                marginLeft: size(116) * -0.5,
                marginTop: size(116) * -0.8,
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: '2',
                display: 'flex',
                mixBlendMode: 'hard-light',
                opacity: 0.5,
                background:
                  'linear-gradient(45deg, rgba(255, 255, 255, 0.3), rgba(255,255,255, 0))',
              }}
            />
          </div>
        </div>
      </div>
    ),
    {
      width: width + bufferSize * 2,
      height: height + bufferSize,
      fonts: [
        {
          name: 'Inter',
          data: interSemiBoldFontData,
          weight: 700,
          style: 'normal',
        },
        {
          name: 'Inter',
          data: interBlackFontData,
          weight: 900,
          style: 'normal',
        },
      ],
    },
  );
}

function getRepoList(repos: string) {
  return repos
    .split(',')
    .filter((rpo) => !!rpo)
    .map((repo) => {
      const [repoName] = repo.split('/');

      return {
        repoName,
      };
    });
}

const getAvatarByUsername = (username: string | null, size = 460) =>
  `https://www.github.com/${username ?? 'github'}.png?size=${size}`;

async function fetchContributorPRs(username: string) {
  const query = new URLSearchParams();

  query.set('topic', '*');
  query.set('limit', '100');
  query.set('range', '30');

  const baseEndpoint = `users/${username}/prs`;
  const endpointString = `${baseEndpoint}?${query.toString()}`;
  const url = `${process.env.NEXT_PUBLIC_API_URL}/${endpointString}`;

  const res = await fetch(url, {
    headers: {
      accept: 'application/json',
    },
  });

  return res.json();
}
