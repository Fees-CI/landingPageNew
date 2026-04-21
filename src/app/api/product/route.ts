import { NextResponse } from "next/server";

import { getPrisma } from "@/lib/prisma";

type CreateProductPayload = {
  name?: string;
  origin?: string;
  category?: string | null;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CreateProductPayload;
    const name = body.name?.trim();
    const origin = body.origin?.trim() || "Côte d'Ivoire";
    const category = body.category?.trim() || null;

    if (!name) {
      return NextResponse.json(
        { error: "Le nom du produit est requis." },
        { status: 400 },
      );
    }

    const product = await getPrisma().product.create({
      data: {
        name,
        origin,
        category,
      },
    });

    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    console.error("POST /api/product failed", error);

    return NextResponse.json(
      { error: "Impossible de créer le produit." },
      { status: 400 },
    );
  }
}
