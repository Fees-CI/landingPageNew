"use client";

import React from "react";
import { RxArrowTopRight } from "react-icons/rx";
import { FiAlertTriangle } from "react-icons/fi";
import { GoVerified } from "react-icons/go";
import { useTranslation } from "@/i18n/I18nProvider";

export default function ProblemSolution() {
  const { t } = useTranslation();
  const ps = t.problemSolution;

  const tags = [ps.tagOpacity, ps.tagFraud, ps.tagLosses, ps.tagDistrust];

  return (
    <section className="px-4 sm:px-6 md:px-10 lg:px-14 py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section heading */}
        <div className="text-center mb-8 md:mb-14">
          <p className="text-[#03842B] text-xs md:text-sm font-bold tracking-[0.25em] uppercase mb-3">
            {ps.kicker}
          </p>
          <h2
            className="font-extrabold text-[#2C2C2C] leading-tight"
            style={{ fontSize: "clamp(28px, 5vw, 48px)" }}
          >
            {ps.title1} <br className="hidden md:block" />
            <span className="text-[#03842B]">{ps.title2}</span>
          </h2>
        </div>

        {/* Bento duality */}
        <div className="relative grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          {/* Problem Card */}
          <div className="md:col-span-5 relative overflow-hidden rounded-3xl lg:rounded-[32px] bg-[#1a1a1a] p-6 md:p-8 lg:p-10 min-h-[320px] md:min-h-[460px] transition-transform duration-300 hover:-translate-y-1">
            {/* Texture */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 30%, #ff4e50 0%, transparent 40%), radial-gradient(circle at 80% 80%, #8b0000 0%, transparent 50%)",
              }}
            />
            <div className="relative z-10 h-full flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-500/20 border border-red-400/30 flex items-center justify-center">
                  <FiAlertTriangle className="text-red-400" size={20} />
                </div>
                <span className="text-red-400 text-xs font-bold tracking-widest uppercase">
                  {ps.problemTag}
                </span>
              </div>
              <h3
                className="text-white font-extrabold mb-4 leading-tight"
                style={{ fontSize: "clamp(22px, 3vw, 34px)" }}
              >
                {ps.problemTitle1} <br />
                {ps.problemTitle2}
              </h3>
              <p className="text-white/60 text-sm md:text-base leading-relaxed mb-6">
                {ps.problemDesc}
              </p>
              <div className="mt-auto flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Solution Card */}
          <div className="md:col-span-7 relative overflow-hidden rounded-3xl lg:rounded-[32px] bg-gradient-to-br from-[#03842B] via-[#046b25] to-[#034016] p-6 md:p-8 lg:p-10 min-h-[320px] md:min-h-[460px] -mt-6 md:mt-0 transition-transform duration-300 hover:-translate-y-1 shadow-xl shadow-green-900/20">
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 70% 30%, #84CC16 0%, transparent 40%), radial-gradient(circle at 20% 80%, #B4FF39 0%, transparent 50%)",
              }}
            />
            <div className="relative z-10 h-full flex flex-col md:flex-row gap-6 md:gap-8 items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-full bg-white/15 border border-white/25 flex items-center justify-center">
                    <GoVerified className="text-white" size={20} />
                  </div>
                  <span className="text-[#B4FF39] text-xs font-bold tracking-widest uppercase">
                    {ps.solutionTag}
                  </span>
                </div>
                <h3
                  className="text-white font-extrabold mb-4 leading-tight"
                  style={{ fontSize: "clamp(22px, 3vw, 34px)" }}
                >
                  {ps.solutionTitle1} <br />
                  {ps.solutionTitle2} <br />
                  {ps.solutionTitle3}
                </h3>
                <p className="text-white/80 text-sm md:text-base leading-relaxed mb-6">
                  {ps.solutionDesc}
                </p>
                <button className="inline-flex items-center gap-3 bg-white text-[#03842B] font-bold px-5 py-3 rounded-full min-h-12 hover:bg-[#ECFFF2] transition-colors">
                  <span>{ps.discover}</span>
                  <span className="w-9 h-9 bg-[#03842B] rounded-full flex items-center justify-center">
                    <RxArrowTopRight className="w-5 h-5 text-white" />
                  </span>
                </button>
              </div>
              <div className="hidden md:flex w-[180px] lg:w-[220px] aspect-square rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm items-center justify-center shrink-0 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#B4FF39]/30 to-transparent" />
                <div className="relative w-[80%] aspect-square rounded-xl bg-white flex items-center justify-center">
                  <div className="grid grid-cols-5 gap-1 w-[70%]">
                    {Array.from({ length: 25 }).map((_, i) => (
                      <div
                        key={i}
                        className={`aspect-square rounded-[2px] ${
                          [
                            0, 1, 2, 3, 4, 5, 9, 10, 14, 15, 19, 20, 21, 22, 23,
                            24, 12, 7, 17,
                          ].includes(i)
                            ? "bg-[#03842B]"
                            : "bg-transparent"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
