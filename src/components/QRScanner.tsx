"use client";

import Image from "next/image";
import Link from "next/link";
import {
  startTransition,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
} from "react";

import LoadingSpinner from "./LoadingSpinner";

type ScannerState = "init" | "scanning" | "success" | "error";

function getDestination(decodedText: string) {
  if (/^https?:\/\//i.test(decodedText)) {
    return decodedText;
  }

  if (decodedText.startsWith("/")) {
    return `${window.location.origin}${decodedText}`;
  }

  return `${window.location.origin}/track/${encodeURIComponent(decodedText)}`;
}

export default function QRScanner() {
  const scannerRef = useRef<{
    stop: () => Promise<void>;
    clear: () => void;
  } | null>(null);
  const redirectedRef = useRef(false);
  const [status, setStatus] = useState<ScannerState>("init");
  const [flash, setFlash] = useState(false);
  const [retryKey, setRetryKey] = useState(0);

  const handleSuccess = useEffectEvent((decodedText: string) => {
    if (redirectedRef.current) {
      return;
    }

    redirectedRef.current = true;
    setFlash(true);
    startTransition(() => setStatus("success"));

    window.setTimeout(() => {
      window.location.href = getDestination(decodedText);
    }, 700);
  });

  const handleScannerError = useEffectEvent((message: string) => {
    if (/permission|denied|camera|notallowed|insecure|notfound/i.test(message)) {
      startTransition(() => setStatus("error"));
    }
  });

  useEffect(() => {
    let isMounted = true;

    async function setupScanner() {
      try {
        const { Html5Qrcode, Html5QrcodeSupportedFormats } = await import(
          "html5-qrcode"
        );

        if (!isMounted) {
          return;
        }

        const scanner = new Html5Qrcode("qr-reader", {
          verbose: false,
          formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
        });
        const config = {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        };

        scannerRef.current = scanner;

        try {
          await scanner.start(
            { facingMode: "environment" },
            config,
            handleSuccess,
            (message) => handleScannerError(message),
          );
        } catch (primaryError) {
          const cameras = await Html5Qrcode.getCameras();

          if (!cameras.length) {
            throw primaryError;
          }

          await scanner.start(
            cameras[0].id,
            config,
            handleSuccess,
            (message) => handleScannerError(message),
          );
        }

        startTransition(() => setStatus("scanning"));
      } catch (error) {
        console.error("Unable to initialize QR scanner", error);
        if (isMounted) {
          startTransition(() => setStatus("error"));
        }
      }
    }

    void setupScanner();

    return () => {
      isMounted = false;
      redirectedRef.current = false;
      const scanner = scannerRef.current;
      scannerRef.current = null;
      if (scanner) {
        void scanner
          .stop()
          .catch(() => undefined)
          .finally(() => scanner.clear());
      }
    };
  }, [handleScannerError, handleSuccess, retryKey]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#0A1628_0%,#0F2140_100%)] text-white">
      <div className={`page-flash ${flash ? "active" : ""}`} />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top,rgba(0,229,160,0.16),transparent_65%)]" />

      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-6 pb-10 pt-12">
        <header className="text-center">
          <div className="mx-auto flex justify-center">
            <Image
              alt="Naturalink"
              className="h-9 w-auto brightness-0 invert"
              height={36}
              priority
              src="/logo.png"
              width={140}
            />
          </div>
          <h1 className="mt-6 text-[22px] font-bold">Scanner un produit</h1>
          <p className="mt-2 text-sm text-[#94A3B8]">
            Pointez la camera vers le QR code Naturalink
          </p>
        </header>

        <div className="flex flex-1 flex-col justify-center">
          <div className="relative mx-auto mt-10 h-[280px] w-[280px] rounded-[32px] shadow-[0_0_60px_rgba(0,229,160,0.08)]">
            <div
              id="qr-reader"
              key={retryKey}
              className="h-full w-full overflow-hidden rounded-[32px] bg-[#050D17]"
            />
            <span className="pointer-events-none absolute left-0 top-0 h-7 w-7 rounded-tl-[8px] border-l-[3px] border-t-[3px] border-[#00E5A0]" />
            <span className="pointer-events-none absolute right-0 top-0 h-7 w-7 rounded-tr-[8px] border-r-[3px] border-t-[3px] border-[#00E5A0]" />
            <span className="pointer-events-none absolute bottom-0 left-0 h-7 w-7 rounded-bl-[8px] border-b-[3px] border-l-[3px] border-[#00E5A0]" />
            <span className="pointer-events-none absolute bottom-0 right-0 h-7 w-7 rounded-br-[8px] border-b-[3px] border-r-[3px] border-[#00E5A0]" />
            {status === "scanning" ? <div className="scan-line" /> : null}

            {status === "init" ? (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 rounded-[32px] bg-[#081220]/84 backdrop-blur-sm">
                <LoadingSpinner className="text-sm text-white" label="Activation camera..." />
              </div>
            ) : null}
          </div>

          <div className="mt-10 flex justify-center">
            {status === "scanning" ? (
              <div className="flex items-center gap-3 text-sm text-white">
                <span className="status-dot h-2.5 w-2.5 rounded-full bg-[#00E5A0]" />
                <span>Recherche en cours...</span>
              </div>
            ) : null}

            {status === "success" ? (
              <div className="flex items-center gap-3 text-sm font-medium text-[#00E5A0]">
                <span aria-hidden="true">✅</span>
                <span>Code detecte ! Redirection...</span>
              </div>
            ) : null}

            {status === "error" ? (
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="flex items-center gap-3 text-sm font-medium text-[#FBBF24]">
                  <span aria-hidden="true">⚠️</span>
                  <span>Autorisez l&apos;acces a la camera</span>
                </div>
                <button
                  className="naturalink-button-primary"
                  onClick={() => {
                    setFlash(false);
                    setStatus("init");
                    setRetryKey((current) => current + 1);
                  }}
                  type="button"
                >
                  Reessayer
                </button>
              </div>
            ) : null}
          </div>
        </div>

        <div className="pt-8 text-center">
          <Link className="text-sm text-white/40 transition-opacity hover:text-white/60" href="/">
            ← Retour a l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
