import { STEP_ICONS } from "@/lib/mock-data";
import type { TrackingBatch } from "@/lib/tracking";

type TraceTimelineProps = {
  events: TrackingBatch["events"];
};

function formatTimestamp(timestamp: Date) {
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(timestamp);
}

export default function TraceTimeline({ events }: TraceTimelineProps) {
  if (!events.length) {
    return (
      <section className="rounded-[24px] bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#64748B]">
          Timeline
        </p>
        <p className="mt-3 text-[#475569]">
          Aucune etape n&apos;a encore ete enregistree pour ce lot.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#64748B]">
          Timeline
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-[#0A2540]">
          Chaine de valeur
        </h2>
      </div>

      <div className="relative space-y-5 pl-8">
        <div className="absolute left-[15px] top-2 h-[calc(100%-16px)] w-px bg-[#E2E8F0]" />
        {events.map((event) => (
          <article key={event.id} className="relative rounded-[24px] bg-white p-5 shadow-sm">
            <div className="absolute -left-[33px] top-6 flex h-8 w-8 items-center justify-center rounded-full border-4 border-[#F8FAFC] bg-[#0A2540] text-base">
              <span aria-hidden="true">{STEP_ICONS[event.step] ?? "📍"}</span>
            </div>
            <div className="space-y-3">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-[#0A2540]">{event.step}</h3>
                  <p className="mt-1 text-sm text-[#475569]">
                    {event.actor || "Acteur non renseigne"}
                  </p>
                </div>
                <span className="rounded-full bg-[#F8FAFC] px-3 py-1 text-xs font-semibold text-[#64748B]">
                  {formatTimestamp(event.timestamp)}
                </span>
              </div>
              <p className="text-sm text-[#334155]">
                🗺️ {event.location || "Localisation non communiquee"}
              </p>
              <p className="text-sm italic text-[#64748B]">
                {event.note || "Aucune note complementaire."}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
