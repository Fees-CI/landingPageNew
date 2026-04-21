import type { Metadata } from "next";

import DashboardClient from "@/components/DashboardClient";
import { getPrisma } from "@/lib/prisma";
import { getPublicTrackUrl } from "@/lib/track-url";

export const metadata: Metadata = {
  title: "Dashboard",
};

export const dynamic = "force-dynamic";

async function getDashboardData() {
  try {
    const prisma = getPrisma();
    const [products, batches] = await Promise.all([
      prisma.product.findMany({
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.batch.findMany({
        orderBy: {
          createdAt: "desc",
        },
        include: {
          product: true,
        },
      }),
    ]);

    return {
      initialProducts: products.map((product) => ({
        id: product.id,
        name: product.name,
        origin: product.origin,
        category: product.category,
        createdAt: product.createdAt.toISOString(),
      })),
      initialBatches: batches.map((batch) => ({
        id: batch.id,
        productId: batch.productId,
        productName: batch.product.name,
        uniqueCode: batch.uniqueCode,
        colorSeed: batch.colorSeed,
        createdAt: batch.createdAt.toISOString(),
        trackUrl: batch.qrCode || getPublicTrackUrl(batch.uniqueCode),
      })),
      initialError: null,
    };
  } catch (error) {
    console.error("Failed to load dashboard data", error);

    return {
      initialProducts: [],
      initialBatches: [],
      initialError:
        "Les formulaires sont prets, mais la connexion base de donnees semble indisponible pour le moment.",
    };
  }
}

export default async function DashboardPage() {
  const data = await getDashboardData();

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <DashboardClient {...data} />
    </main>
  );
}
