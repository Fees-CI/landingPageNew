export function getColorFromCode(code: string): string {
  const hash = code
    .split("")
    .reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return `hsl(${hash % 360}, 70%, 40%)`;
}

export function getSeedFromCode(code: string): string {
  const hash = code
    .split("")
    .reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return String(hash % 360);
}

export function shortHash(code: string): string {
  const clean = code.replace(/[^a-zA-Z0-9]/g, "");
  if (clean.length < 10) return clean;
  return `${clean.slice(0, 6)}...${clean.slice(-4)}`;
}
