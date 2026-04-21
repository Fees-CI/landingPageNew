import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import TraceTimeline from "@/components/TraceTimeline";
import TrustBadge from "@/components/TrustBadge";
import UnsoldSection from "@/components/UnsoldSection";
import { getBlockchainHash, getConfidenceScore } from "@/lib/mock-data";
import { getTrackingBatchByCode } from "@/lib/tracking";

type TrackPageProps = {
  params: Promise<{
    code: string;
  }>;
};

export const dynamic = "force-dynamic";

function formatOrigin(origin?: string | null) {
  if (!origin) {
    return "Origine non renseignee";
  }

  return origin.toLowerCase().includes("ivoire") ? `🇨🇮 ${origin}` : origin;
}

export async function generateMetadata({
  params,
}: TrackPageProps): Promise<Metadata> {
  const { code } = await params;
  const batch = await getTrackingBatchByCode(code);

  return {
    title: batch ? `Traçabilité ${batch.product.name}` : "Traçabilité",
  };
}

export default async function TrackPage({ params }: TrackPageProps) {
  const { code } = await params;
  const batch = await getTrackingBatchByCode(code);

  if (!batch) {
    notFound();
  }

  const confidenceScore = getConfidenceScore(batch.events.length);
  const blockchainHash = getBlockchainHash(batch.uniqueCode);
  const unsoldEvent = [...batch.events]
    .reverse()
    .find((event) => event.step === "Invendu");

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#0A2540]">
      <section className="bg-[#0A2540] px-4 pb-10 pt-6 text-white sm:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-3">
            <Image
              alt="Naturalink"
              className="h-10 w-auto brightness-0 invert"
              height={40}
              priority
              src="/logo.png"
              width={160}
            />
          </div>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#7EECD0]">
                Traçabilité publique
              </p>
              <h1 className="text-3xl font-semibold sm:text-4xl">
                {batch.product.name}
              </h1>
              <div className="inline-flex rounded-full bg-[#00E5A0]/15 px-4 py-2 text-sm font-medium text-[#00E5A0]">
                {formatOrigin(batch.product.origin)}
              </div>
            </div>
            <div className="rounded-2xl border border-white/12 bg-white/8 px-4 py-3 text-sm text-[#D8E3EF] backdrop-blur-sm">
              Code lot: {batch.uniqueCode}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto flex max-w-4xl flex-col gap-6 px-4 py-6 sm:px-6">
        <TrustBadge />

        <section className="grid gap-4 lg:grid-cols-2">
          <article className="rounded-[24px] bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#64748B]">
              Score de confiance
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-[#0A2540]">
              🛡️ {confidenceScore}%
            </h2>
            <div className="mt-4 h-3 overflow-hidden rounded-full bg-[#E2E8F0]">
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,#00E5A0_0%,#0A2540_100%)]"
                style={{ width: `${confidenceScore}%` }}
              />
            </div>
            <p className="mt-3 text-sm text-[#64748B]">
              Score calcule selon le nombre d&apos;etapes enregistrees dans la
              chaine.
            </p>
          </article>

          <article className="rounded-[24px] border border-[#DBEAFE] bg-[#EFF6FF] p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#64748B]">
              Blockchain
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-[#0A2540]">
              🔐 Ancre blockchain
            </h2>
            <p className="mt-4 rounded-2xl bg-white/70 px-4 py-3 font-mono text-sm text-[#1D4ED8]">
              {blockchainHash}
            </p>
            <p className="mt-3 text-sm text-[#475569]">
              Verification immuable — Powered by Naturalink
            </p>
          </article>
        </section>

        <TraceTimeline events={batch.events} />

        {unsoldEvent ? <UnsoldSection event={unsoldEvent} /> : null}

        <footer className="rounded-[24px] bg-white px-6 py-8 text-center shadow-sm">
          <p className="text-sm text-[#64748B]">
            Propulse par Naturalink — naturalink.ink
          </p>
          <div className="mt-5 flex justify-center">
            <Link className="naturalink-button-primary" href="/scan">
              Scanner un autre produit
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
