export function getTrackPath(code: string): string {
  return `/track/${encodeURIComponent(code)}`;
}

export function getPublicTrackUrl(code: string, origin?: string): string {
  const baseUrl =
    origin?.replace(/\/$/, "") ?? process.env.NEXT_PUBLIC_URL?.replace(/\/$/, "");
  const path = getTrackPath(code);

  return baseUrl ? `${baseUrl}${path}` : path;
}
