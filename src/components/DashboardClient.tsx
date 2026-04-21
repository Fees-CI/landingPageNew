"use client";

import Link from "next/link";
import { type FormEvent, useRef, useState } from "react";

import { CATEGORY_OPTIONS, STEP_OPTIONS } from "@/lib/mock-data";
import { getPublicTrackUrl } from "@/lib/track-url";

import LoadingSpinner from "./LoadingSpinner";
import StickerPDF from "./StickerPDF";
import StyledQR, { type StyledQRHandle } from "./StyledQR";

type ProductOption = {
  id: string;
  name: string;
  origin: string;
  category: string | null;
  createdAt: string;
};

type BatchOption = {
  id: string;
  productId: string;
  productName: string;
  uniqueCode: string;
  colorSeed: string | null;
  createdAt: string;
  trackUrl: string;
};

type DashboardClientProps = {
  initialProducts: ProductOption[];
  initialBatches: BatchOption[];
  initialError?: string | null;
};

type ApiError = {
  error?: string;
};

function getBatchLabel(batch: BatchOption) {
  return `${batch.productName} · ${batch.uniqueCode.slice(0, 8)}...`;
}

function resolveTrackUrl(batch: BatchOption) {
  const origin = typeof window === "undefined" ? undefined : window.location.origin;
  const fallback = getPublicTrackUrl(batch.uniqueCode, origin);
  const candidate = batch.trackUrl || fallback;

  if (candidate.startsWith("/") && origin) {
    return `${origin}${candidate}`;
  }

  return candidate;
}

async function getErrorMessage(response: Response) {
  const payload = (await response.json().catch(() => null)) as ApiError | null;
  return payload?.error || "Une erreur est survenue.";
}

export default function DashboardClient({
  initialProducts,
  initialBatches,
  initialError,
}: DashboardClientProps) {
  const qrRef = useRef<StyledQRHandle | null>(null);
  const [products, setProducts] = useState(initialProducts);
  const [batches, setBatches] = useState(initialBatches);
  const [feedback, setFeedback] = useState<string | null>(initialError ?? null);
  const [copied, setCopied] = useState(false);
  const [isCreatingProduct, setIsCreatingProduct] = useState(false);
  const [isCreatingBatch, setIsCreatingBatch] = useState(false);
  const [isCreatingTrace, setIsCreatingTrace] = useState(false);
  const [productForm, setProductForm] = useState<{
    name: string;
    origin: string;
    category: string;
  }>({
    name: "",
    origin: "Côte d'Ivoire",
    category: CATEGORY_OPTIONS[0],
  });
  const [batchProductId, setBatchProductId] = useState(
    initialProducts[0]?.id ?? "",
  );
  const [traceForm, setTraceForm] = useState<{
    batchId: string;
    step: string;
    actor: string;
    location: string;
    note: string;
  }>({
    batchId: initialBatches[0]?.id ?? "",
    step: STEP_OPTIONS[0],
    actor: "",
    location: "",
    note: "",
  });
  const [latestBatch, setLatestBatch] = useState<BatchOption | null>(
    initialBatches[0] ?? null,
  );

  async function handleCreateProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsCreatingProduct(true);
    setFeedback(null);

    try {
      const response = await fetch("/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productForm),
      });

      if (!response.ok) {
        throw new Error(await getErrorMessage(response));
      }

      const payload = (await response.json()) as { product: ProductOption };
      const nextProducts = [payload.product, ...products];
      setProducts(nextProducts);
      setBatchProductId(payload.product.id);
      setProductForm({
        name: "",
        origin: payload.product.origin,
        category: payload.product.category || CATEGORY_OPTIONS[0],
      });
      setFeedback("Produit cree avec succes.");
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Creation impossible.");
    } finally {
      setIsCreatingProduct(false);
    }
  }

  async function handleCreateBatch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsCreatingBatch(true);
    setFeedback(null);

    try {
      const response = await fetch("/api/batch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: batchProductId }),
      });

      if (!response.ok) {
        throw new Error(await getErrorMessage(response));
      }

      const payload = (await response.json()) as {
        batch: {
          id: string;
          productId: string;
          uniqueCode: string;
          colorSeed: string | null;
          createdAt: string;
          product: {
            name: string;
          };
        };
        trackUrl: string;
      };

      const nextBatch: BatchOption = {
        id: payload.batch.id,
        productId: payload.batch.productId,
        productName: payload.batch.product.name,
        uniqueCode: payload.batch.uniqueCode,
        colorSeed: payload.batch.colorSeed,
        createdAt: payload.batch.createdAt,
        trackUrl: payload.trackUrl,
      };

      setBatches((current) => [nextBatch, ...current]);
      setLatestBatch(nextBatch);
      setTraceForm((current) => ({
        ...current,
        batchId: nextBatch.id,
      }));
      setFeedback("Batch cree et QR pret au telechargement.");
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Generation impossible.");
    } finally {
      setIsCreatingBatch(false);
    }
  }

  async function handleCreateTrace(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsCreatingTrace(true);
    setFeedback(null);

    try {
      const response = await fetch("/api/trace", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(traceForm),
      });

      if (!response.ok) {
        throw new Error(await getErrorMessage(response));
      }

      setTraceForm((current) => ({
        ...current,
        actor: "",
        location: "",
        note: "",
      }));
      setFeedback("Etape de tracabilite enregistree.");
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Enregistrement impossible.");
    } finally {
      setIsCreatingTrace(false);
    }
  }

  async function handleCopyTrackUrl() {
    if (!latestBatch) {
      return;
    }

    const url = resolveTrackUrl(latestBatch);

    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <section className="rounded-[32px] bg-[linear-gradient(135deg,#0A2540_0%,#113a64_100%)] px-6 py-8 text-white shadow-[0_30px_80px_rgba(10,37,64,0.24)] sm:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#7EECD0]">
              Dashboard MVP
            </p>
            <h1 className="text-3xl font-semibold sm:text-4xl">
              Creer des produits, generer des lots et publier la tracabilite.
            </h1>
            <p className="text-sm text-[#C7D2E1] sm:text-base">
              Le backoffice centralise la creation des identites produit et des QR
              Naturalink pour vos demos ou vos premiers pilotes.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link className="naturalink-button-primary" href="/scan">
              Ouvrir le scanner
            </Link>
            {latestBatch ? (
              <Link
                className="naturalink-button-secondary border-white/30 text-white hover:bg-white/10"
                href={`/track/${latestBatch.uniqueCode}`}
              >
                Voir le dernier lot
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      {feedback ? (
        <div className="rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] px-4 py-3 text-sm text-[#1D4ED8]">
          {feedback}
        </div>
      ) : null}

      <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-8">
          <section className="naturalink-card">
            <div className="mb-6 space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#64748B]">
                Etape 1
              </p>
              <h2 className="text-2xl font-semibold text-[#0A2540]">
                Creer un produit
              </h2>
            </div>

            <form className="grid gap-4 md:grid-cols-2" onSubmit={handleCreateProduct}>
              <label className="space-y-2 md:col-span-2">
                <span className="text-sm font-medium text-[#0A2540]">Nom</span>
                <input
                  required
                  className="naturalink-input"
                  onChange={(event) =>
                    setProductForm((current) => ({
                      ...current,
                      name: event.target.value,
                    }))
                  }
                  placeholder="Ex: Cacao premium San Pedro"
                  value={productForm.name}
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-[#0A2540]">Origine</span>
                <input
                  className="naturalink-input"
                  onChange={(event) =>
                    setProductForm((current) => ({
                      ...current,
                      origin: event.target.value,
                    }))
                  }
                  value={productForm.origin}
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-[#0A2540]">Categorie</span>
                <select
                  className="naturalink-input"
                  onChange={(event) =>
                    setProductForm((current) => ({
                      ...current,
                      category: event.target.value,
                    }))
                  }
                  value={productForm.category}
                >
                  {CATEGORY_OPTIONS.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </label>

              <div className="md:col-span-2">
                <button
                  className="naturalink-button-primary w-full justify-center sm:w-auto"
                  disabled={isCreatingProduct}
                  type="submit"
                >
                  {isCreatingProduct ? (
                    <LoadingSpinner label="Creation..." />
                  ) : (
                    "Creer le produit"
                  )}
                </button>
              </div>
            </form>
          </section>

          <section className="naturalink-card">
            <div className="mb-6 space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#64748B]">
                Etape 2
              </p>
              <h2 className="text-2xl font-semibold text-[#0A2540]">
                Generer un batch
              </h2>
            </div>

            <form className="space-y-4" onSubmit={handleCreateBatch}>
              <label className="space-y-2">
                <span className="text-sm font-medium text-[#0A2540]">
                  Produit a lier
                </span>
                <select
                  className="naturalink-input"
                  onChange={(event) => setBatchProductId(event.target.value)}
                  value={batchProductId}
                >
                  <option value="">Selectionner un produit</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </label>

              <button
                className="naturalink-button-primary w-full justify-center sm:w-auto"
                disabled={isCreatingBatch || !batchProductId}
                type="submit"
              >
                {isCreatingBatch ? (
                  <LoadingSpinner label="Generation..." />
                ) : (
                  "Generer le QR Code"
                )}
              </button>
            </form>

            {latestBatch ? (
              <div className="mt-8 rounded-[28px] bg-[#F8FAFC] p-5">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
                  <StyledQR className="mx-auto shrink-0" code={latestBatch.uniqueCode} ref={qrRef} />
                  <div className="w-full space-y-4">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#64748B]">
                        Lot actif
                      </p>
                      <h3 className="mt-2 text-2xl font-semibold text-[#0A2540]">
                        {latestBatch.productName}
                      </h3>
                      <p className="mt-2 break-all text-sm text-[#475569]">
                        Code: {latestBatch.uniqueCode}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-[#E2E8F0] bg-white p-4 text-sm text-[#334155]">
                      <p className="font-medium text-[#0A2540]">URL publique</p>
                      <p className="mt-2 break-all">
                        {resolveTrackUrl(latestBatch)}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <button
                        className="naturalink-button-primary"
                        onClick={() => qrRef.current?.download()}
                        type="button"
                      >
                        ↓ Image PNG
                      </button>
                      <StickerPDF
                        code={latestBatch.uniqueCode}
                        productName={latestBatch.productName}
                        origin={
                          products.find((p) => p.id === latestBatch.productId)
                            ?.origin
                        }
                      />
                      <button
                        className="naturalink-button-secondary"
                        onClick={handleCopyTrackUrl}
                        type="button"
                      >
                        {copied ? "Lien copie" : "Copier l'URL"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </section>

          <section className="naturalink-card">
            <div className="mb-6 space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#64748B]">
                Etape 3
              </p>
              <h2 className="text-2xl font-semibold text-[#0A2540]">
                Ajouter une etape de tracabilite
              </h2>
            </div>

            <form className="grid gap-4 md:grid-cols-2" onSubmit={handleCreateTrace}>
              <label className="space-y-2 md:col-span-2">
                <span className="text-sm font-medium text-[#0A2540]">Batch</span>
                <select
                  className="naturalink-input"
                  onChange={(event) =>
                    setTraceForm((current) => ({
                      ...current,
                      batchId: event.target.value,
                    }))
                  }
                  value={traceForm.batchId}
                >
                  <option value="">Selectionner un batch</option>
                  {batches.map((batch) => (
                    <option key={batch.id} value={batch.id}>
                      {getBatchLabel(batch)}
                    </option>
                  ))}
                </select>
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-[#0A2540]">Etape</span>
                <select
                  className="naturalink-input"
                  onChange={(event) =>
                    setTraceForm((current) => ({
                      ...current,
                      step: event.target.value,
                    }))
                  }
                  value={traceForm.step}
                >
                  {STEP_OPTIONS.map((step) => (
                    <option key={step} value={step}>
                      {step}
                    </option>
                  ))}
                </select>
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-[#0A2540]">Acteur</span>
                <input
                  className="naturalink-input"
                  onChange={(event) =>
                    setTraceForm((current) => ({
                      ...current,
                      actor: event.target.value,
                    }))
                  }
                  placeholder="Cooperative, logisticien, transformateur..."
                  value={traceForm.actor}
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-[#0A2540]">Localisation</span>
                <input
                  className="naturalink-input"
                  onChange={(event) =>
                    setTraceForm((current) => ({
                      ...current,
                      location: event.target.value,
                    }))
                  }
                  placeholder="Abidjan, San Pedro, Yamoussoukro..."
                  value={traceForm.location}
                />
              </label>

              <label className="space-y-2 md:col-span-2">
                <span className="text-sm font-medium text-[#0A2540]">Note</span>
                <textarea
                  className="naturalink-input min-h-28 resize-y"
                  onChange={(event) =>
                    setTraceForm((current) => ({
                      ...current,
                      note: event.target.value,
                    }))
                  }
                  placeholder="Description libre de l'etape..."
                  value={traceForm.note}
                />
              </label>

              <div className="md:col-span-2">
                <button
                  className="naturalink-button-primary w-full justify-center sm:w-auto"
                  disabled={isCreatingTrace || !traceForm.batchId}
                  type="submit"
                >
                  {isCreatingTrace ? (
                    <LoadingSpinner label="Enregistrement..." />
                  ) : (
                    "Enregistrer l'etape"
                  )}
                </button>
              </div>
            </form>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="naturalink-card">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#64748B]">
              Produits
            </p>
            <div className="mt-4 space-y-3">
              {products.length ? (
                products.slice(0, 6).map((product) => (
                  <div
                    key={product.id}
                    className="rounded-2xl border border-[#E2E8F0] px-4 py-3"
                  >
                    <p className="font-medium text-[#0A2540]">{product.name}</p>
                    <p className="mt-1 text-sm text-[#64748B]">
                      {product.category || "Sans categorie"} · {product.origin}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-[#64748B]">
                  Aucun produit enregistre pour le moment.
                </p>
              )}
            </div>
          </section>

          <section className="naturalink-card">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#64748B]">
              Lots recents
            </p>
            <div className="mt-4 space-y-3">
              {batches.length ? (
                batches.slice(0, 6).map((batch) => (
                  <Link
                    key={batch.id}
                    className="block rounded-2xl border border-[#E2E8F0] px-4 py-3 transition-colors hover:border-[#00E5A0] hover:bg-[#F8FFFC]"
                    href={`/track/${batch.uniqueCode}`}
                  >
                    <p className="font-medium text-[#0A2540]">{batch.productName}</p>
                    <p className="mt-1 text-sm text-[#64748B]">{batch.uniqueCode}</p>
                  </Link>
                ))
              ) : (
                <p className="text-sm text-[#64748B]">
                  Aucun batch genere pour le moment.
                </p>
              )}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
