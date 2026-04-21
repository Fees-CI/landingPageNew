"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "@/i18n/I18nProvider";

function useCountUp(target: number, duration = 1600, start = false) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);

  return value;
}

function Stat({
  value,
  suffix,
  label,
  trigger,
  highlight,
  locale,
}: {
  value: number;
  suffix: string;
  label: string;
  trigger: boolean;
  highlight?: boolean;
  locale: string;
}) {
  const n = useCountUp(value, 1600, trigger);
  return (
    <div
      className={`relative overflow-hidden rounded-3xl lg:rounded-[32px] p-5 md:p-8 min-h-[160px] md:min-h-[200px] flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1 ${
        highlight
          ? "bg-gradient-to-br from-[#03842B] to-[#034016] text-white"
          : "bg-[#ECFFF2] text-[#034016] border border-green-100"
      }`}
    >
      {highlight && (
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 80% 20%, #B4FF39 0%, transparent 50%)",
          }}
        />
      )}
      <div className="relative z-10">
        <p
          className={`font-extrabold leading-none bg-clip-text text-transparent ${
            highlight
              ? "bg-gradient-to-br from-white to-[#B4FF39]"
              : "bg-gradient-to-br from-[#034016] to-[#03842B]"
          }`}
          style={{ fontSize: "clamp(40px, 7vw, 76px)" }}
        >
          {n.toLocaleString(locale === "fr" ? "fr-FR" : "en-US")}
          {suffix}
        </p>
      </div>
      <p
        className={`relative z-10 text-sm md:text-base font-medium ${
          highlight ? "text-white/85" : "text-[#034016]/80"
        }`}
      >
        {label}
      </p>
    </div>
  );
}

export default function ImpactStats() {
  const { t, locale } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const stats = [
    { value: 1500, suffix: "+", label: t.impactStats.labelFarmers },
    { value: 10000, suffix: "+", label: t.impactStats.labelStickers },
    { value: 87, suffix: "%", label: t.impactStats.labelTraceability },
    { value: 12, suffix: "", label: t.impactStats.labelCountries },
  ];

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="px-4 sm:px-6 md:px-10 lg:px-14 py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 md:mb-12">
          <div>
            <p className="text-[#03842B] text-xs md:text-sm font-bold tracking-[0.25em] uppercase mb-3">
              {t.impactStats.kicker}
            </p>
            <h2
              className="font-extrabold text-[#2C2C2C] leading-tight"
              style={{ fontSize: "clamp(28px, 5vw, 48px)" }}
            >
              {t.impactStats.title1} <br className="md:hidden" />
              <span className="text-[#03842B]">{t.impactStats.title2}</span>
            </h2>
          </div>
          <p className="text-[#2C2C2C]/60 max-w-md text-sm md:text-base">
            {t.impactStats.desc}
          </p>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5"
        >
          {stats.map((s, i) => (
            <Stat
              key={s.label}
              value={s.value}
              suffix={s.suffix}
              label={s.label}
              trigger={visible}
              highlight={i === 1}
              locale={locale}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
