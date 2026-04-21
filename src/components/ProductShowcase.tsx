import Link from "next/link";

import StyledQR from "./StyledQR";

const DEMO_CODE = "naturalink-demo-0001";

const DEMO_TIMELINE = [
  { icon: "🌱", step: "Production", actor: "Coop. San Pedro", location: "San Pedro" },
  { icon: "🚚", step: "Transport", actor: "Logistica CI", location: "Abidjan" },
  { icon: "🏭", step: "Transformation", actor: "Atelier Yamoussoukro", location: "Yamoussoukro" },
  { icon: "📦", step: "Distribution", actor: "Retailer Partner", location: "Abidjan" },
];

export default function ProductShowcase() {
  return (
    <>
      {/* Section 1 — Le QR code Naturalink */}
      <section className="bg-white px-4 py-24 sm:px-6 lg:px-14">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 text-center">
          <div className="rounded-[32px] bg-[#F8FAFC] p-8">
            <StyledQR
              className="shadow-none! p-0!"
              code={DEMO_CODE}
              size={240}
            />
          </div>
          <div className="max-w-2xl space-y-3">
            <h2 className="text-[clamp(32px,5vw,48px)] font-bold leading-[1.1] text-[#0A2540]">
              Une identité unique pour chaque produit.
            </h2>
            <p className="text-lg text-[#64748B]">
              Généré en un clic. Scannable par tous.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2 — La chaîne de traçabilité */}
      <section className="bg-[#F8FAFC] px-4 py-24 sm:px-6 lg:px-14">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-4">
            <h2 className="text-[clamp(32px,5vw,48px)] font-bold leading-[1.1] text-[#0A2540]">
              De la ferme à l&apos;étagère.
            </h2>
            <p className="text-lg text-[#64748B]">
              Chaque étape enregistrée, visible par le consommateur final.
            </p>
          </div>

          <div className="relative rounded-[28px] bg-white p-6 shadow-[0_30px_80px_rgba(10,37,64,0.08)]">
            <div className="absolute bottom-6 left-10 top-6 w-px bg-[#E2E8F0]" />
            <ol className="relative space-y-5">
              {DEMO_TIMELINE.map((event) => (
                <li key={event.step} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F8FAFC] text-lg">
                    {event.icon}
                  </div>
                  <div className="pt-1">
                    <p className="text-sm font-semibold text-[#0A2540]">
                      {event.step}
                    </p>
                    <p className="text-xs text-[#64748B]">
                      {event.actor} · 🗺️ {event.location}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Section 3 — La redirection des invendus */}
      <section className="bg-[#0A2540] px-4 py-24 text-white sm:px-6 lg:px-14">
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <h2 className="text-[clamp(32px,5vw,48px)] font-bold leading-[1.1]">
            Les invendus ne disparaissent pas. Ils sont redirigés.
          </h2>
          <p className="text-lg text-white/70">
            Naturalink ferme la boucle de la chaîne de valeur.
          </p>
          <div className="pt-6">
            <Link
              className="inline-flex items-center gap-2 rounded-2xl bg-[#00E5A0] px-6 py-3 text-sm font-semibold text-[#0A2540] transition-transform hover:scale-[1.03]"
              href="/dashboard"
            >
              Tracer un produit →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
