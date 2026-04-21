"use client";

import React from "react";
import Image from "next/image";
import { RxArrowTopRight } from "react-icons/rx";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { useTranslation } from "@/i18n/I18nProvider";

export default function Footer() {
  const { t } = useTranslation();
  const f = t.footer;

  const navItems = [
    f.navHome,
    f.navProducts,
    f.navTech,
    f.navBlog,
    f.navAbout,
  ];

  const legalItems = [
    f.legalMentions,
    f.legalGdpr,
    f.legalCgu,
    f.legalCookies,
    f.legalSecurity,
  ];

  return (
    <footer className="px-4 sm:px-6 md:px-10 lg:px-14 pb-8 pt-12 md:pt-20 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Big CTA Card */}
        <div className="relative overflow-hidden rounded-3xl lg:rounded-[40px] bg-gradient-to-br from-[#03842B] via-[#046b25] to-[#034016] p-8 md:p-12 lg:p-16 mb-10 md:mb-16">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, #B4FF39 0%, transparent 40%), radial-gradient(circle at 90% 80%, #84CC16 0%, transparent 50%)",
            }}
          />
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <p className="text-[#B4FF39] text-xs md:text-sm font-bold tracking-[0.25em] uppercase mb-3">
                {f.ctaKicker}
              </p>
              <h2
                className="text-white font-extrabold leading-[1.05]"
                style={{ fontSize: "clamp(32px, 6vw, 72px)" }}
              >
                {f.ctaTitle1} <br />
                {f.ctaTitle2} <br />
                <span className="text-[#B4FF39]">{f.ctaTitle3}</span>
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 lg:shrink-0">
              <a
                href="#"
                className="inline-flex items-center justify-between gap-3 bg-white text-[#03842B] font-bold pl-6 pr-2 py-2 rounded-full min-h-14 hover:bg-[#ECFFF2] transition-colors"
              >
                <span>{f.ctaRequest}</span>
                <span className="w-11 h-11 bg-[#03842B] rounded-full flex items-center justify-center">
                  <RxArrowTopRight className="w-5 h-5 text-white" />
                </span>
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white border border-white/20 font-bold px-6 py-2 rounded-full min-h-14 backdrop-blur-sm hover:bg-white/15 transition-colors"
              >
                {f.ctaContact}
              </a>
            </div>
          </div>
        </div>

        {/* 4 columns */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-6 pb-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4">
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/logo/image.png"
                width={32}
                height={32}
                className="rounded-xl"
                alt="Naturalink"
              />
              <p className="font-bold text-lg text-green-700 capitalize">
                Naturalink
              </p>
            </div>
            <p className="text-sm text-[#2C2C2C]/70 leading-relaxed mb-6 max-w-xs">
              {f.brandDesc}
            </p>
            <div className="flex items-center gap-2">
              {[FaFacebookF, RiTwitterXFill, FaInstagram, FaLinkedinIn].map(
                (Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 rounded-full bg-[#ECFFF2] text-[#03842B] flex items-center justify-center hover:bg-[#03842B] hover:text-white transition-colors"
                  >
                    <Icon size={16} />
                  </a>
                )
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-2">
            <h4 className="text-[#2C2C2C] font-bold mb-4 text-sm tracking-wider uppercase">
              {f.colNav}
            </h4>
            <ul className="space-y-3 text-sm text-[#2C2C2C]/70">
              {navItems.map((l) => (
                <li key={l}>
                  <a href="#" className="hover:text-[#03842B] transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="md:col-span-2">
            <h4 className="text-[#2C2C2C] font-bold mb-4 text-sm tracking-wider uppercase">
              {f.colLegal}
            </h4>
            <ul className="space-y-3 text-sm text-[#2C2C2C]/70">
              {legalItems.map((l) => (
                <li key={l}>
                  <a href="#" className="hover:text-[#03842B] transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 md:col-span-4">
            <h4 className="text-[#2C2C2C] font-bold mb-4 text-sm tracking-wider uppercase">
              {f.colNewsletter}
            </h4>
            <p className="text-sm text-[#2C2C2C]/70 mb-4">{f.newsletterText}</p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder={f.newsletterPlaceholder}
                className="flex-1 min-h-12 px-4 rounded-full bg-[#ECFFF2] border border-green-100 text-sm focus:outline-none focus:border-[#03842B]"
              />
              <button
                type="submit"
                className="min-h-12 px-5 rounded-full bg-[#03842B] text-white font-bold text-sm hover:bg-[#034016] transition-colors inline-flex items-center justify-center gap-2"
              >
                {f.newsletterSubmit}
                <RxArrowTopRight size={18} />
              </button>
            </form>
            <p className="text-xs text-[#2C2C2C]/50 mt-3">{f.newsletterNoSpam}</p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#2C2C2C]/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[#2C2C2C]/60">
          <p>{f.copyright}</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF7900]" />
            <span>{f.member}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
