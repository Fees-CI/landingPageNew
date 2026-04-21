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
          <div className="rounded-[32px] bg-[#ECFFF2] p-8">
            <StyledQR
              className="shadow-none! p-0!"
              code={DEMO_CODE}
              size={240}
            />
          </div>
          <div className="max-w-2xl space-y-3">
            <h2 className="text-[clamp(32px,5vw,48px)] font-bold leading-[1.1] text-[#034016]">
              Une identité unique pour chaque produit.
            </h2>
            <p className="text-lg text-green-900/70">
              Généré en un clic. Scannable par tous.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2 — La chaîne de traçabilité */}
      <section className="bg-[#F7FBF4] px-4 py-24 sm:px-6 lg:px-14">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-4">
            <h2 className="text-[clamp(32px,5vw,48px)] font-bold leading-[1.1] text-[#034016]">
              De la ferme à l&apos;étagère.
            </h2>
            <p className="text-lg text-green-900/70">
              Chaque étape enregistrée, visible par le consommateur final.
            </p>
          </div>

          <div className="relative rounded-[28px] bg-white p-6 shadow-[0_30px_80px_rgba(3,132,43,0.08)]">
            <div className="absolute bottom-6 left-10 top-6 w-px bg-[#D7EADC]" />
            <ol className="relative space-y-5">
              {DEMO_TIMELINE.map((event) => (
                <li key={event.step} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ECFFF2] text-lg">
                    {event.icon}
                  </div>
                  <div className="pt-1">
                    <p className="text-sm font-semibold text-[#034016]">
                      {event.step}
                    </p>
                    <p className="text-xs text-green-900/60">
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
      <section className="bg-[#034016] px-4 py-24 text-white sm:px-6 lg:px-14">
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <h2 className="text-[clamp(32px,5vw,48px)] font-bold leading-[1.1]">
            Les invendus ne disparaissent pas. Ils sont redirigés.
          </h2>
          <p className="text-lg text-white/70">
            Naturalink ferme la boucle de la chaîne de valeur.
          </p>
          <div className="pt-6">
            <Link
              className="inline-flex items-center gap-2 rounded-full bg-[#03842B] px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
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
