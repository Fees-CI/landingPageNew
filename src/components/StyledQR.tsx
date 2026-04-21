"use client";

import QRCodeStyling from "qr-code-styling";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";

import { getColorFromCode } from "@/lib/qr";
import { getPublicTrackUrl } from "@/lib/track-url";

export type StyledQRHandle = {
  download: () => Promise<void>;
};

type StyledQRProps = {
  code: string;
  className?: string;
  size?: number;
};

const StyledQR = forwardRef<StyledQRHandle, StyledQRProps>(function StyledQR(
  { code, className, size = 300 },
  ref,
) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const qrInstanceRef = useRef<QRCodeStyling | null>(null);

  const trackUrl =
    typeof window === "undefined"
      ? getPublicTrackUrl(code)
      : getPublicTrackUrl(code, window.location.origin);

  useImperativeHandle(
    ref,
    () => ({
      async download() {
        if (!qrInstanceRef.current) {
          return;
        }

        await qrInstanceRef.current.download({
          extension: "png",
          name: `naturalink-${code}`,
        });
      },
    }),
    [code],
  );

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    containerRef.current.innerHTML = "";

    const primaryColor = getColorFromCode(code);
    const qrInstance = new QRCodeStyling({
      width: size,
      height: size,
      data: trackUrl,
      image: "/logo.png",
      dotsOptions: {
        color: primaryColor,
        type: "rounded",
      },
      backgroundOptions: {
        color: "#ffffff",
      },
      cornersSquareOptions: {
        type: "extra-rounded",
        color: "#0A2540",
      },
      cornersDotOptions: {
        type: "dot",
        color: "#FF6B00",
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 6,
      },
    });

    qrInstance.append(containerRef.current);
    qrInstanceRef.current = qrInstance;

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
      qrInstanceRef.current = null;
    };
  }, [code, trackUrl, size]);

  return (
    <div
      className={`rounded-[28px] bg-white p-4 shadow-[0_25px_70px_rgba(10,37,64,0.16)] ${className ?? ""}`.trim()}
    >
      <div
        ref={containerRef}
        className="mx-auto flex items-center justify-center"
        style={{ minWidth: size, minHeight: size }}
      />
    </div>
  );
});

export default StyledQR;
