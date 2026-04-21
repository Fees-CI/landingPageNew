import { shortHash } from "./qr";

export function getBlockchainHash(code: string): string {
  return shortHash(code);
}

export function getConfidenceScore(eventsCount: number): number {
  return Math.min(eventsCount * 20, 100);
}

export const STEP_ICONS: Record<string, string> = {
  Production: "🌱",
  Transport: "🚚",
  Transformation: "🏭",
  Distribution: "📦",
  Invendu: "♻️",
};

export const STEP_OPTIONS = [
  "Production",
  "Transport",
  "Transformation",
  "Distribution",
  "Invendu",
] as const;

export const CATEGORY_OPTIONS = [
  "Cacao",
  "Café",
  "Textile",
  "Cosmétique",
  "Autre",
] as const;
