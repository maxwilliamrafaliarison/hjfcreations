import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/data/site";

export const alt = `${site.name} — ${site.metier}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Image de partage (Facebook / WhatsApp) générée au build : logo + slogan sur fond crème. */
export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public", "logo.jpg"));
  const logoSrc = `data:image/jpeg;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 64,
          background: "#faf5ec",
          padding: 60,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc}
          alt=""
          width={420}
          height={420}
          style={{ borderRadius: 9999, boxShadow: "0 20px 60px rgba(36,28,23,0.18)" }}
        />
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 560 }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 800,
              color: "#241c17",
              lineHeight: 1.05,
              textTransform: "uppercase",
              letterSpacing: -1,
            }}
          >
            HJF Créations
          </div>
          <div style={{ marginTop: 22, fontSize: 34, color: "#c1694f", fontWeight: 700 }}>
            Créé avec passion, offert avec amour
          </div>
          <div style={{ marginTop: 18, fontSize: 27, color: "#6b5d51" }}>
            Mugs, t-shirts & cadeaux personnalisés par sublimation — Antananarivo
          </div>
        </div>
      </div>
    ),
    size,
  );
}
