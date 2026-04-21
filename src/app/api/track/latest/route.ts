import { NextResponse } from "next/server";

import { getPrisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const batches = await getPrisma().batch.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 8,
      include: {
        product: true,
        _count: {
          select: { events: true },
        },
      },
    });

    const items = batches.map((batch) => ({
      id: batch.id,
      uniqueCode: batch.uniqueCode,
      createdAt: batch.createdAt.toISOString(),
      product: {
        id: batch.product.id,
        name: batch.product.name,
        origin: batch.product.origin,
        category: batch.product.category,
      },
      eventCount: batch._count.events,
    }));

    return NextResponse.json({ items }, { status: 200 });
  } catch (error) {
    console.error("GET /api/track/latest failed", error);

    return NextResponse.json({ items: [] }, { status: 200 });
  }
}
