"use client";

import React from "react";
import { LuScanLine } from "react-icons/lu";
import { TbChartDonutFilled } from "react-icons/tb";
import { GoVerified } from "react-icons/go";
import { useTranslation } from "@/i18n/I18nProvider";

export default function HowItWorks() {
  const { t } = useTranslation();
  const h = t.howItWorks;

  const steps = [
    {
      n: "01",
      title: h.step1Title,
      desc: h.step1Desc,
      icon: LuScanLine,
      bg: "bg-[#ECFFF2]",
      text: "text-[#034016]",
      accent: "bg-[#03842B]",
    },
    {
      n: "02",
      title: h.step2Title,
      desc: h.step2Desc,
      icon: TbChartDonutFilled,
      bg: "bg-gradient-to-br from-[#03842B] to-[#034016]",
      text: "text-white",
      accent: "bg-[#B4FF39]",
    },
    {
      n: "03",
      title: h.step3Title,
      desc: h.step3Desc,
      icon: GoVerified,
      bg: "bg-[#ECFFF2]",
      text: "text-[#034016]",
      accent: "bg-[#03842B]",
    },
  ];

  return (
    <section className="px-4 sm:px-6 md:px-10 lg:px-14 py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-8 md:mb-14">
          <p className="text-[#03842B] text-xs md:text-sm font-bold tracking-[0.25em] uppercase mb-3">
            {h.kicker}
          </p>
          <h2
            className="font-extrabold text-[#2C2C2C] leading-tight"
            style={{ fontSize: "clamp(28px, 5vw, 48px)" }}
          >
            {h.title1} <span className="text-[#03842B]">{h.title2}</span>
          </h2>
        </div>

        {/* Grid of 3 perfect squares (1:1) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.n}
                className={`relative rounded-3xl lg:rounded-[32px] p-6 md:p-8 aspect-square flex flex-col justify-between overflow-hidden ${step.bg} ${step.text} transition-transform duration-300 hover:-translate-y-1.5`}
              >
                {/* decorative circle */}
                <div
                  className={`absolute -top-10 -right-10 w-40 h-40 rounded-full ${step.accent} opacity-10`}
                />

                <div className="flex items-start justify-between relative z-10">
                  <span className="text-xs font-bold tracking-widest opacity-60">
                    {h.step} {step.n}
                  </span>
                  <div
                    className={`w-12 h-12 rounded-full ${step.accent} flex items-center justify-center`}
                  >
                    <Icon
                      className={
                        step.accent === "bg-[#B4FF39]"
                          ? "text-[#034016]"
                          : "text-white"
                      }
                      size={22}
                    />
                  </div>
                </div>

                <div className="relative z-10">
                  <h3
                    className="font-extrabold leading-none mb-3"
                    style={{ fontSize: "clamp(28px, 4vw, 44px)" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm md:text-base opacity-80 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {/* progression line between cards (desktop) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-[2px] bg-[#03842B]/20 z-20" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
