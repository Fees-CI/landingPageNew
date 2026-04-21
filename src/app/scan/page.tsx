import type { Metadata } from "next";

import QRScanner from "@/components/QRScanner";

export const metadata: Metadata = {
  title: "Scanner",
};

export default function ScanPage() {
  return <QRScanner />;
}
