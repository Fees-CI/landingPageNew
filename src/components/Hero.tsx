"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { RxArrowTopRight } from "react-icons/rx";
import { BsAward } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { useTranslation } from "@/i18n/I18nProvider";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useTranslation();

  const baseIconStyle =
    "w-11 h-11 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-105";
  const iconSize = 20;
  const iconColor = "black";

  const navLinks = [
    { key: "home", label: t.nav.home },
    { key: "products", label: t.nav.products },
    { key: "blog", label: t.nav.blog },
    { key: "about", label: t.nav.about },
  ];

  return (
    <section className="px-4 sm:px-6 md:px-10 lg:px-14 py-3 bg-white w-full lg:h-screen lg:overflow-hidden">
      {/* ========== HEADER ========== */}
      <header className="flex items-center justify-between py-3 lg:py-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image
            src="/logo/image.png"
            width={30}
            height={30}
            className="rounded-xl"
            alt="Brand Logo"
          />
          <p className="font-bold text-lg text-green-700 capitalize">
            Naturalink
          </p>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex px-5 py-3 bg-[#ECFFF2] rounded-[30px] items-center gap-8 xl:gap-12">
          {navLinks.map((link) => (
            <p
              key={link.key}
              className="text-green-950 hover:text-green-700 hover:cursor-pointer text-base font-normal leading-6 tracking-wide whitespace-nowrap"
            >
              {link.label}
            </p>
          ))}
        </div>

        {/* Desktop CTA + Language */}
        <div className="hidden lg:flex items-center gap-3">
          <LanguageSwitcher variant="compact" />
          <div className="px-5 py-3 bg-[#03842B] rounded-[50px] flex justify-center items-center">
            <p className="text-white text-base font-normal leading-6 tracking-wide">
              {t.nav.contact}
            </p>
          </div>
          <div className="w-12 h-12 bg-[#03842B] rounded-full flex justify-center items-center ml-1">
            <RxArrowTopRight size={24} className="text-white" />
          </div>
        </div>

        {/* Mobile: Language + Burger */}
        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher variant="compact" />
          <button
            aria-label={t.nav.openMenu}
            onClick={() => setMenuOpen(true)}
            className="w-11 h-11 rounded-full bg-[#ECFFF2] flex items-center justify-center text-green-950"
          >
            <HiMenuAlt3 size={24} />
          </button>
        </div>
      </header>

      {/* ========== MOBILE MENU OVERLAY ========== */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col p-6 lg:hidden">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-2">
              <Image
                src="/logo/image.png"
                width={30}
                height={30}
                className="rounded-xl"
                alt="Brand Logo"
              />
              <p className="font-bold text-lg text-green-700 capitalize">
                Naturalink
              </p>
            </div>
            <button
              aria-label={t.nav.closeMenu}
              onClick={() => setMenuOpen(false)}
              className="w-11 h-11 rounded-full bg-[#ECFFF2] flex items-center justify-center"
            >
              <HiX size={24} />
            </button>
          </div>

          <nav className="flex flex-col gap-6 flex-1">
            {navLinks.map((link) => (
              <a
                key={link.key}
                href="#"
                className="text-green-950 text-2xl font-medium"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="mb-6 flex justify-center">
            <LanguageSwitcher variant="full" />
          </div>

          <a
            href="#"
            className="mt-auto w-full min-h-14 bg-[#03842B] rounded-full flex justify-center items-center gap-3 px-6"
          >
            <span className="text-white text-lg font-medium">
              {t.nav.contact}
            </span>
            <span className="w-11 h-11 bg-white/15 rounded-full flex justify-center items-center">
              <RxArrowTopRight size={22} className="text-white" />
            </span>
          </a>
        </div>
      )}

      {/* ========== MAIN CONTENT ========== */}
      <div className="flex flex-col lg:grid lg:grid-cols-12 lg:grid-rows-12 lg:h-[calc(100vh-90px)] gap-3 sm:gap-4 lg:gap-0">
        {/* Hero Text — Order 2 on mobile, normal on desktop */}
        <div className="order-1 lg:order-0 lg:row-start-1 lg:row-span-3 lg:col-start-1 lg:col-span-12 flex flex-col gap-3 items-center justify-start text-[#2C2C2C] pt-4 lg:pt-8">
          <h1
            className="w-full lg:w-[85%] text-center font-extrabold leading-[1.1]"
            style={{ fontSize: "clamp(28px, 8vw, 60px)" }}
          >
            {t.hero.title}
          </h1>
          <p
            className="w-full sm:w-[80%] lg:w-[50%] text-center font-light"
            style={{ fontSize: "clamp(14px, 2.5vw, 18px)" }}
          >
            {t.hero.subtitle}
          </p>
        </div>

        {/* CTAs — Full width on mobile, centered row on desktop */}
        <div className="order-2 lg:order-0 lg:row-start-5 lg:col-start-4 lg:col-span-5 flex flex-col sm:flex-row gap-3 w-full lg:w-auto lg:justify-center lg:items-start lg:pt-5">
          <Link
            href="/dashboard"
            className="w-full sm:flex-1 lg:w-auto lg:flex-none min-h-14 px-6 bg-[#0A2540] rounded-2xl flex flex-col justify-center items-center gap-0.5 transition-transform hover:scale-[1.02]"
          >
            <span className="text-white text-base font-semibold leading-tight">
              {t.hero.ctaTrace}
            </span>
            <span className="text-white/60 text-[11px] font-normal leading-tight">
              {t.hero.ctaTraceSub}
            </span>
          </Link>
          <Link
            href="/scan"
            className="w-full sm:flex-1 lg:w-auto lg:flex-none min-h-14 px-6 bg-transparent border-2 border-[#0A2540] rounded-2xl flex flex-col justify-center items-center gap-0.5 transition-colors hover:bg-[#0A2540]/5"
          >
            <span className="text-[#0A2540] text-base font-semibold leading-tight">
              {t.hero.ctaVerify}
            </span>
            <span className="text-[#0A2540]/60 text-[11px] font-normal leading-tight">
              {t.hero.ctaVerifySub}
            </span>
          </Link>
        </div>

        {/* ===== Mobile-only stacked bento ===== */}
        <div className="order-3 lg:hidden flex flex-col gap-3">
          {/* 87% Block */}
          <div className="relative w-full min-h-80 rounded-3xl overflow-hidden">
            <Image
              src="/agri/background-green.png"
              alt="stat background"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 p-5 flex flex-col justify-between z-10">
              <div>
                <p
                  className="font-bold text-white leading-none"
                  style={{ fontSize: "clamp(56px, 18vw, 88px)" }}
                >
                  87%
                </p>
                <p className="text-[15px] text-white mt-2">
                  {t.hero.stat87Desc}
                </p>
              </div>
              <button className="w-fit backdrop-blur-sm bg-white/20 border border-white/20 rounded-full pl-5 pr-2 py-1.5 inline-flex items-center gap-3">
                <span className="text-white text-[15px] font-bold">
                  {t.hero.exploreMore}
                </span>
                <span className="w-11 h-11 bg-[#03842B] rounded-full flex items-center justify-center">
                  <RxArrowTopRight className="w-5 h-5 text-white" />
                </span>
              </button>
            </div>
          </div>

          {/* Farmer Image */}
          <div className="relative w-full min-h-[280px] rounded-3xl overflow-hidden">
            <Image
              src="/agri/farmer-product.jpg"
              alt="farmer"
              fill
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/75 to-transparent p-5">
              <p className="text-white text-[15px]">{t.hero.farmerCard}</p>
            </div>
          </div>

          {/* Two small badges stacked */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex justify-center items-center rounded-3xl bg-[#034016] p-4 gap-3 min-h-[72px]">
              <BsAward size={28} className="text-white shrink-0" />
              <p className="text-white text-sm">{t.hero.badgeFarmers}</p>
            </div>
            <div className="flex justify-center items-center rounded-3xl bg-[#034016] p-4 gap-3 min-h-[72px]">
              <GoVerified size={28} className="text-white shrink-0" />
              <p className="text-white text-sm">{t.hero.badgeStickers}</p>
            </div>
          </div>

          {/* Social Media */}
          <div className="relative w-full min-h-[220px] rounded-3xl overflow-hidden">
            <Image
              src="/agri/background-green.png"
              alt="social background"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 p-5 flex flex-col justify-between z-10">
              <p className="text-white text-lg font-bold max-w-[200px]">
                {t.hero.socialTitle}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={baseIconStyle}>
                    <FaFacebookF size={iconSize} color={iconColor} />
                  </div>
                  <div className={`${baseIconStyle} -ml-4`}>
                    <RiTwitterXFill size={iconSize} color={iconColor} />
                  </div>
                  <div className={`${baseIconStyle} -ml-4`}>
                    <FaInstagram size={iconSize} color={iconColor} />
                  </div>
                </div>
                <button className="w-12 h-12 bg-[#03842B] rounded-full flex justify-center items-center">
                  <RxArrowTopRight size={22} className="text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ===== Desktop Bento Grid (lg+) ===== */}
        <div className="hidden lg:block lg:row-start-6 lg:row-span-7 lg:col-start-1 lg:col-span-12">
          <div className="w-full h-full grid grid-cols-11 grid-rows-5">
            {/* Left column — 87% + Badge */}
            <div className="row-span-5 col-span-2 space-y-2">
              <div className="circle-1 circle w-full h-[78%] relative flex flex-col">
                <Image
                  src="/agri/background-green.png"
                  alt="brand-agri"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 p-4 flex flex-col justify-between z-10">
                  <div className="self-end text-left">
                    <p className="text-[64px] font-bold text-white leading-none">
                      87%
                    </p>
                    <p className="text-[15px] text-white mt-2">
                      {t.hero.stat87Desc}
                    </p>
                  </div>
                  <button className="w-fit backdrop-blur-sm bg-white/20 border border-white/20 rounded-full pl-5 pr-2.5 py-1.5 inline-flex items-center gap-4">
                    <span className="text-white text-[16px] font-bold">
                      {t.hero.exploreMore}
                    </span>
                    <div className="w-10 h-10 bg-[#03842B] rounded-full flex items-center justify-center">
                      <RxArrowTopRight className="w-5 h-5 text-white" />
                    </div>
                  </button>
                </div>
              </div>
              <div className="flex justify-center items-center rounded-[26px] w-full h-[20%] bg-[#034016] p-3.5 gap-2">
                <BsAward size={32} className="text-white shrink-0" />
                <p className="w-[80%] text-white">{t.hero.badgeFarmers}</p>
              </div>
            </div>

            {/* Right column — Donate + Badge */}
            <div className="col-start-10 row-span-5 col-span-2 space-y-2">
              <div className="self-end circle-3 circle w-full h-[78%] relative flex items-end justify-center p-2">
                <Image
                  src="/agri/sticker-inteligent.png"
                  alt="brand-agri"
                  fill
                  className="object-cover"
                />
                <button className="px-6 py-2 backdrop-blur-sm bg-white/12 text-white font-semibold rounded-full border border-white/12 inline-flex items-center space-x-12">
                  <span className="text-[18px] font-bold">{t.hero.donate}</span>
                  <div className="w-12 h-12 bg-[#03842B] rounded-full flex justify-center items-center">
                    <RxArrowTopRight size={24} className="text-white" />
                  </div>
                </button>
              </div>
              <div className="flex justify-center items-center rounded-[26px] w-full h-[20%] bg-[#034016] p-6 gap-2">
                <GoVerified size={32} className="text-white shrink-0" />
                <p className="w-[80%] text-white">{t.hero.badgeStickers}</p>
              </div>
            </div>

            {/* Center row — Farmer + Sticker + Social */}
            <div className="flex flex-row items-center justify-center gap-4 col-start-3 col-span-7 row-span-4">
              <div className="circle-1 circle w-[30%] h-full relative overflow-hidden">
                <Image
                  src="/agri/farmer-product.jpg"
                  alt="brand-agri"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 w-full bg-linear-to-t from-black/70 to-transparent p-4">
                  <p className="text-white text-[18px]">{t.hero.farmerCard}</p>
                </div>
              </div>
              <div className="self-end circle-2 relative w-[30%] h-[80%]">
                <Image
                  src="/agri/last_farm.png"
                  alt="brand-agri"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="circle-3 circle w-[30%] h-full relative flex items-center justify-center">
                <Image
                  src="/agri/background-green.png"
                  alt="brand-agri"
                  fill
                  className="object-cover"
                />
                <div className="p-4 self-end absolute">
                  <div className="mb-8 flex items-center justify-center p-4">
                    <p className="text-[22px] font-bold w-[180px] h-[73px] text-white">
                      {t.hero.socialTitle}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex justify-center items-center">
                      <div className={`${baseIconStyle} mr-2`}>
                        <FaFacebookF size={24} color={iconColor} />
                      </div>
                      <div className={`${baseIconStyle} -ml-6 mr-2`}>
                        <RiTwitterXFill size={24} color={iconColor} />
                      </div>
                      <div className={`${baseIconStyle} -ml-6`}>
                        <FaInstagram size={24} color={iconColor} />
                      </div>
                    </div>
                    <button className="w-14 h-14 bg-[#03842B] rounded-full flex justify-center items-center ml-2">
                      <RxArrowTopRight size={24} className="text-white" />
                    </button>
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
