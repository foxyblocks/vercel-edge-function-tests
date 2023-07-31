import { ImageResponse } from "@vercel/og";

export const runtime = 'edge';

export async function GET() {
  const title = "Created with Netlify edge functions";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
          fontSize: 32,
        }}
      >
        <div>{title}</div>
      </div>
    ),
    {
      width: 1035,
      height: 1194,
    }
  );
}