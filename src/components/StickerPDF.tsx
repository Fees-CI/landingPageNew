"use client";

import { useRef, useState } from "react";

import StyledQR from "./StyledQR";
import { getPublicTrackUrl } from "@/lib/track-url";

type StickerPDFProps = {
  code: string;
  productName: string;
  origin?: string | null;
  className?: string;
};

export default function StickerPDF({
  code,
  productName,
  origin,
  className,
}: StickerPDFProps) {
  const previewRef = useRef<HTMLDivElement | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const trackUrl =
    typeof window === "undefined"
      ? getPublicTrackUrl(code)
      : getPublicTrackUrl(code, window.location.origin);

  const displayUrl = trackUrl.replace(/^https?:\/\//, "");

  async function handleDownload() {
    if (!previewRef.current || isGenerating) {
      return;
    }

    setIsGenerating(true);

    try {
      const [{ default: html2canvas }, { default: JsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);

      const canvas = await html2canvas(previewRef.current, {
        scale: 3,
        backgroundColor: "#ffffff",
      });

      const pdf = new JsPDF({
        unit: "mm",
        format: [62, 85],
        orientation: "portrait",
      });

      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, 62, 85);
      pdf.save(`naturalink-sticker-${code}.pdf`);
    } catch (error) {
      console.error("Sticker PDF generation failed", error);
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <>
      <button
        className={`naturalink-button-secondary ${className ?? ""}`.trim()}
        disabled={isGenerating}
        onClick={handleDownload}
        type="button"
      >
        {isGenerating ? "Génération..." : "↓ Sticker PDF"}
      </button>

      <div
        aria-hidden
        ref={previewRef}
        style={{
          position: "absolute",
          left: "-9999px",
          top: 0,
          width: "240px",
          padding: "16px",
          background: "#ffffff",
          fontFamily: "Inter, Arial, Helvetica, sans-serif",
          textAlign: "center",
          color: "#0A2540",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Naturalink"
          crossOrigin="anonymous"
          src="/logo.png"
          style={{ height: "20px", width: "auto", margin: "0 auto", display: "block" }}
        />

        <div style={{ margin: "10px auto 0", width: 160 }}>
          <StyledQR className="p-0! shadow-none!" code={code} size={160} />
        </div>

        <p
          style={{
            fontSize: "10pt",
            fontWeight: 700,
            margin: "8px 0 0",
            color: "#0A2540",
          }}
        >
          {productName}
        </p>

        <p style={{ fontSize: "8pt", margin: "4px 0 0", color: "#64748B" }}>
          🇨🇮 {origin || "Côte d'Ivoire"}
        </p>

        <p style={{ fontSize: "7pt", margin: "4px 0 0", color: "#94A3B8" }}>
          {displayUrl}
        </p>

        <hr
          style={{
            border: "none",
            borderTop: "1px solid #E2E8F0",
            margin: "10px 0",
          }}
        />

        <p
          style={{
            fontSize: "7pt",
            margin: 0,
            color: "#00E5A0",
            fontWeight: 600,
          }}
        >
          Certifié Naturalink ✓
        </p>
      </div>
    </>
  );
}
