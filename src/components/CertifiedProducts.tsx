import Link from "next/link";

import StyledQR from "./StyledQR";
import { getPrisma } from "@/lib/prisma";

async function getLatestBatches() {
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

    return batches.map((batch) => ({
      id: batch.id,
      uniqueCode: batch.uniqueCode,
      productName: batch.product.name,
      category: batch.product.category,
      origin: batch.product.origin,
      eventCount: batch._count.events,
    }));
  } catch (error) {
    console.error("Failed to load latest batches", error);
    return [];
  }
}

export default async function CertifiedProducts() {
  const items = await getLatestBatches();

  if (!items.length) {
    return null;
  }

  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-14">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-[32px] font-bold leading-tight text-[#034016]">
            Produits certifiés
          </h2>
          <p className="mt-2 text-base text-green-900/70">
            Tracés et vérifiables en temps réel
          </p>
        </div>

        <div className="no-scrollbar -mx-4 flex flex-nowrap gap-4 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/track/${item.uniqueCode}`}
              className="group flex w-[200px] shrink-0 flex-col rounded-2xl border border-[#E6F4EA] bg-white p-4 shadow-sm transition-colors hover:border-[#03842B]"
            >
              <div className="mx-auto">
                <StyledQR
                  code={item.uniqueCode}
                  size={160}
                  className="p-0! shadow-none!"
                />
              </div>

              <p className="mt-3 line-clamp-2 text-[15px] font-semibold text-[#034016]">
                {item.productName}
              </p>

              {item.category ? (
                <span className="mt-2 inline-flex w-fit items-center rounded-full bg-[#ECFFF2] px-2.5 py-0.5 text-[12px] font-medium text-[#03842B]">
                  {item.category}
                </span>
              ) : null}

              <p className="mt-2 text-[12px] text-green-900/60">
                🇨🇮 {item.origin}
              </p>

              <p className="mt-1 text-[12px] font-semibold text-[#03842B]">
                {item.eventCount} étape{item.eventCount > 1 ? "s" : ""} · Vérifié
                ✓
              </p>

              <span className="mt-3 inline-flex items-center text-[13px] font-medium text-[#034016] group-hover:underline">
                Voir →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
