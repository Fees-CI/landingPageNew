import type { Prisma } from "@prisma/client";

import { getPrisma } from "./prisma";

export type TrackingBatch = Prisma.BatchGetPayload<{
  include: {
    product: true;
    events: {
      orderBy: {
        timestamp: "asc";
      };
    };
  };
}>;

export async function getTrackingBatchByCode(
  code: string,
): Promise<TrackingBatch | null> {
  return getPrisma().batch.findUnique({
    where: {
      uniqueCode: code,
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
}
