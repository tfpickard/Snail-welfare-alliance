import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Snail Welfare Alliance — The color of emperors. The cost of everything.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Brand-coloured social card. Reliable at runtime; no external font fetch. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#F5F0E8",
          color: "#1A1209",
          padding: "72px 80px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#5C0A3A",
            fontFamily: "sans-serif",
          }}
        >
          Snail Welfare Alliance
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, lineHeight: 1.05 }}>
            The color of emperors.
          </div>
          <div style={{ fontSize: 76, lineHeight: 1.05, color: "#5C0A3A" }}>
            The cost of everything.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 30,
            color: "#1A1209",
            opacity: 0.8,
            fontFamily: "sans-serif",
          }}
        >
          10,000 sea snails per gram — synthetic since 1904.
        </div>
      </div>
    ),
    size,
  );
}
