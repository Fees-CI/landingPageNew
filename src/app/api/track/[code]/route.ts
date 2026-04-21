import { NextResponse } from "next/server";

import { getTrackingBatchByCode } from "@/lib/tracking";

type RouteContext = {
  params: Promise<{
    code: string;
  }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { code } = await context.params;

  if (!code?.trim()) {
    return NextResponse.json({ error: "Code manquant." }, { status: 400 });
  }

  const batch = await getTrackingBatchByCode(code);

  if (!batch) {
    return NextResponse.json({ error: "Batch introuvable." }, { status: 404 });
  }

  return NextResponse.json({ batch }, { status: 200 });
}
