import type { TrackingBatch } from "@/lib/tracking";

type UnsoldSectionProps = {
  event: TrackingBatch["events"][number];
};

function getUnsoldStatus(note?: string | null) {
  if (!note) {
    return "En cours de traitement";
  }

  return /redistrib|trait|don|livr/i.test(note)
    ? "Redistribue"
    : "En cours de traitement";
}

export default function UnsoldSection({ event }: UnsoldSectionProps) {
  const status = getUnsoldStatus(event.note);

  return (
    <section className="rounded-[24px] border border-[#BBF7D0] bg-[#F0FFF4] p-6 shadow-sm">
      <div className="border-l-4 border-[#22C55E] pl-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#16A34A]">
              Reduction des pertes
            </p>
            <h2 className="text-2xl font-semibold text-[#0A2540]">
              ♻️ Redirection
            </h2>
            <p className="text-sm text-[#475569]">
              Naturalink accompagne les producteurs dans la reduction du gaspillage.
            </p>
          </div>
          <span className="rounded-full bg-[#DCFCE7] px-4 py-2 text-sm font-semibold text-[#166534]">
            {status}
          </span>
        </div>

        <div className="mt-5 grid gap-3 text-sm text-[#0A2540] sm:grid-cols-3">
          <div className="rounded-2xl bg-white/80 p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-[#64748B]">
              Acteur
            </p>
            <p className="mt-2 font-medium">{event.actor || "A renseigner"}</p>
          </div>
          <div className="rounded-2xl bg-white/80 p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-[#64748B]">
              Lieu
            </p>
            <p className="mt-2 font-medium">{event.location || "Non communique"}</p>
          </div>
          <div className="rounded-2xl bg-white/80 p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-[#64748B]">
              Note
            </p>
            <p className="mt-2 font-medium">{event.note || "Suivi en cours."}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
