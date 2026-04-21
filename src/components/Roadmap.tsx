import React from "react";
import { FiZap, FiTarget, FiGlobe } from "react-icons/fi";

const milestones = [
  {
    date: "Q1 2026",
    title: "Incubation Orange",
    desc: "Entrée dans le programme Digi Green, structuration produit & gouvernance.",
    icon: FiZap,
    status: "current" as const,
  },
  {
    date: "Q3 2026",
    title: "Lancement Pilote",
    desc: "Déploiement terrain auprès de 1 500 agriculteurs partenaires.",
    icon: FiTarget,
    status: "next" as const,
  },
  {
    date: "2027",
    title: "Expansion Afrique de l'Ouest",
    desc: "5 pays cibles, intégration des coopératives régionales.",
    icon: FiGlobe,
    status: "future" as const,
  },
];

export default function Roadmap() {
  return (
    <section className="px-4 sm:px-6 md:px-10 lg:px-14 py-12 md:py-20 bg-[#FAFCF7]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <p className="text-[#03842B] text-xs md:text-sm font-bold tracking-[0.25em] uppercase mb-3">
            Roadmap
          </p>
          <h2
            className="font-extrabold text-[#2C2C2C] leading-tight"
            style={{ fontSize: "clamp(28px, 5vw, 48px)" }}
          >
            Une vision <span className="text-[#03842B]">à long terme.</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Desktop horizontal line */}
          <div className="hidden md:block absolute top-10 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-[#03842B] via-[#03842B]/50 to-[#03842B]/10" />

          {/* Mobile vertical line */}
          <div className="md:hidden absolute top-0 bottom-0 left-6 w-[2px] bg-gradient-to-b from-[#03842B] via-[#03842B]/50 to-[#03842B]/10" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {milestones.map((m, i) => {
              const Icon = m.icon;
              const isCurrent = m.status === "current";
              return (
                <div
                  key={m.title}
                  className="relative flex md:flex-col gap-4 md:gap-0 md:items-center pl-16 md:pl-0"
                >
                  {/* Node */}
                  <div
                    className={`absolute md:static left-0 md:mx-auto md:mb-6 w-12 h-12 md:w-20 md:h-20 rounded-full flex items-center justify-center z-10 ${
                      isCurrent
                        ? "bg-gradient-to-br from-[#03842B] to-[#034016] ring-4 ring-[#B4FF39]/30"
                        : "bg-white border-2 border-[#03842B]/20"
                    }`}
                  >
                    <Icon
                      size={24}
                      className={isCurrent ? "text-white" : "text-[#03842B]"}
                    />
                    {isCurrent && (
                      <span className="absolute inset-0 rounded-full bg-[#03842B]/30 animate-ping" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="md:text-center">
                    <span
                      className={`inline-block text-[11px] font-bold tracking-widest uppercase mb-2 px-3 py-1 rounded-full ${
                        isCurrent
                          ? "bg-[#03842B] text-white"
                          : "bg-[#ECFFF2] text-[#03842B]"
                      }`}
                    >
                      {m.date}
                    </span>
                    <h3 className="text-lg md:text-xl font-extrabold text-[#2C2C2C] mb-1">
                      {m.title}
                    </h3>
                    <p className="text-sm text-[#2C2C2C]/70 max-w-xs md:mx-auto">
                      {m.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
