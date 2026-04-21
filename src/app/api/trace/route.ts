import { NextResponse } from "next/server";

import { getPrisma } from "@/lib/prisma";

type CreateTracePayload = {
  batchId?: string;
  step?: string;
  actor?: string;
  location?: string;
  note?: string;
  timestamp?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CreateTracePayload;
    const batchId = body.batchId?.trim();
    const step = body.step?.trim();

    if (!batchId || !step) {
      return NextResponse.json(
        { error: "Le batch et l'étape sont requis." },
        { status: 400 },
      );
    }

    const prisma = getPrisma();

    const batch = await prisma.batch.findUnique({
      where: {
        id: batchId,
      },
    });

    if (!batch) {
      return NextResponse.json(
        { error: "Batch introuvable." },
        { status: 404 },
      );
    }

    const event = await prisma.traceEvent.create({
      data: {
        batchId,
        step,
        actor: body.actor?.trim() || null,
        location: body.location?.trim() || null,
        note: body.note?.trim() || null,
        timestamp: body.timestamp ? new Date(body.timestamp) : new Date(),
      },
    });

    return NextResponse.json({ event }, { status: 201 });
  } catch (error) {
    console.error("POST /api/trace failed", error);

    return NextResponse.json(
      { error: "Impossible d'ajouter l'étape de traçabilité." },
      { status: 400 },
    );
  }
}
