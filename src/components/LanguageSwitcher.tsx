"use client";

import React from "react";
import { useTranslation } from "@/i18n/I18nProvider";

type Props = {
  variant?: "compact" | "full";
  className?: string;
};

export default function LanguageSwitcher({
  variant = "compact",
  className = "",
}: Props) {
  const { locale, setLocale } = useTranslation();

  if (variant === "full") {
    return (
      <div
        className={`inline-flex items-center gap-1 p-1 rounded-full bg-[#ECFFF2] border border-green-100 ${className}`}
      >
        <button
          type="button"
          onClick={() => setLocale("fr")}
          aria-pressed={locale === "fr"}
          className={`min-h-9 px-4 rounded-full text-sm font-semibold transition-colors ${
            locale === "fr"
              ? "bg-[#03842B] text-white"
              : "text-[#034016] hover:bg-white"
          }`}
        >
          FR
        </button>
        <button
          type="button"
          onClick={() => setLocale("en")}
          aria-pressed={locale === "en"}
          className={`min-h-9 px-4 rounded-full text-sm font-semibold transition-colors ${
            locale === "en"
              ? "bg-[#03842B] text-white"
              : "text-[#034016] hover:bg-white"
          }`}
        >
          EN
        </button>
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-0.5 p-0.5 rounded-full bg-[#ECFFF2] border border-green-100 ${className}`}
    >
      <button
        type="button"
        onClick={() => setLocale("fr")}
        aria-pressed={locale === "fr"}
        className={`min-h-9 px-3 rounded-full text-xs font-bold transition-colors ${
          locale === "fr"
            ? "bg-[#03842B] text-white"
            : "text-[#034016] hover:bg-white"
        }`}
      >
        FR
      </button>
      <button
        type="button"
        onClick={() => setLocale("en")}
        aria-pressed={locale === "en"}
        className={`min-h-9 px-3 rounded-full text-xs font-bold transition-colors ${
          locale === "en"
            ? "bg-[#03842B] text-white"
            : "text-[#034016] hover:bg-white"
        }`}
      >
        EN
      </button>
    </div>
  );
}
