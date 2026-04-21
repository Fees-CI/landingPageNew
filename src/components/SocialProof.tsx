import React from "react";
import Image from "next/image";

const partners = [
  { name: "Orange Digi Green", featured: true },
  { name: "AgriTech Africa" },
  { name: "GreenChain" },
  { name: "FarmVerify" },
  { name: "EcoTrust" },
];

export default function SocialProof() {
  return (
    <section className="px-4 sm:px-6 md:px-10 lg:px-14 py-10 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-sm md:text-base text-[#2C2C2C]/60 uppercase tracking-[0.2em] mb-6 md:mb-10">
          Ils nous font confiance
        </p>

        {/* Desktop: row of 3 with featured center */}
        <div className="hidden md:grid grid-cols-3 gap-4 lg:gap-6">
          {[partners[1], partners[0], partners[2]].map((p, i) => (
            <div
              key={p.name}
              className={`group relative rounded-3xl lg:rounded-[32px] p-6 lg:p-8 min-h-[140px] flex items-center justify-center transition-transform duration-300 hover:-translate-y-1 ${
                p.featured
                  ? "bg-gradient-to-br from-[#03842B] to-[#034016] text-white shadow-lg shadow-green-900/20"
                  : "bg-[#ECFFF2] text-green-950 border border-green-100"
              }`}
            >
              {p.featured && (
                <div className="absolute top-3 right-3 bg-[#FF7900] text-white text-[10px] font-bold tracking-wider px-2 py-1 rounded-full uppercase">
                  Partenaire
                </div>
              )}
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    p.featured ? "bg-white/15" : "bg-white"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full ${
                      p.featured ? "bg-[#FF7900]" : "bg-[#03842B]"
                    } ${p.featured ? "animate-pulse" : ""}`}
                  />
                </div>
                <p
                  className={`font-bold text-lg ${
                    p.featured ? "text-white" : ""
                  }`}
                >
                  {p.name}
                </p>
                {p.featured && (
                  <p className="text-xs text-white/70">
                    Member of Digi Green by Orange
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: horizontal scroll carousel */}
        <div className="md:hidden flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4">
          {partners.map((p) => (
            <div
              key={p.name}
              className={`snap-center shrink-0 w-[75%] rounded-3xl p-5 min-h-[120px] flex flex-col items-center justify-center gap-2 ${
                p.featured
                  ? "bg-gradient-to-br from-[#03842B] to-[#034016] text-white"
                  : "bg-[#ECFFF2] text-green-950 border border-green-100"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  p.featured ? "bg-white/15" : "bg-white"
                }`}
              >
                <div
                  className={`w-3 h-3 rounded-full ${
                    p.featured ? "bg-[#FF7900] animate-pulse" : "bg-[#03842B]"
                  }`}
                />
              </div>
              <p className="font-bold">{p.name}</p>
              {p.featured && (
                <p className="text-[11px] text-white/70 text-center">
                  Member of Digi Green by Orange
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
