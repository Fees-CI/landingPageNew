import { NextResponse } from "next/server";

import { getPrisma } from "@/lib/prisma";
import { getSeedFromCode } from "@/lib/qr";
import { getPublicTrackUrl } from "@/lib/track-url";

type CreateBatchPayload = {
  productId?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CreateBatchPayload;
    const productId = body.productId?.trim();

    if (!productId) {
      return NextResponse.json(
        { error: "Le produit sélectionné est requis." },
        { status: 400 },
      );
    }

    const prisma = getPrisma();

    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Produit introuvable." },
        { status: 404 },
      );
    }

    const uniqueCode = crypto.randomUUID();
    const colorSeed = getSeedFromCode(uniqueCode);
    const trackUrl = getPublicTrackUrl(uniqueCode);

    const batch = await prisma.batch.create({
      data: {
        productId,
        uniqueCode,
        colorSeed,
        qrCode: trackUrl,
      },
      include: {
        product: true,
        events: {
          orderBy: {
            timestamp: "asc",
          },
        },
      },
    });

    return NextResponse.json({ batch, trackUrl }, { status: 201 });
  } catch (error) {
    console.error("POST /api/batch failed", error);

    return NextResponse.json(
      { error: "Impossible de générer le batch." },
      { status: 400 },
    );
  }
}
