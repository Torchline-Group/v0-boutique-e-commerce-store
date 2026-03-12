import { Navigation } from "@/components/navigation"
import { SiteFooter } from "@/components/site-footer"
import { getProductsFromShopify, getCollections } from "@/lib/products"
import { ShopContent } from "@/components/shop-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Shop All Collections | Dayanna's Boutique",
  description:
    "Browse all collections at Dayanna's Boutique — Dresses, Co-Ords, Loungewear, Athleisure and more. Real models, no AI, curated from Tijuana, Mexico.",
}

export default async function ShopPage() {
  const products = await getProductsFromShopify()
  const collections = getCollections(products)

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        {/* Page header */}
        <div className="bg-secondary pt-36 pb-12 text-center">
          <p className="text-primary text-xs tracking-[0.3em] uppercase font-semibold mb-3">
            Dayanna{"'"}s Boutique
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl text-foreground text-balance">
            Shop Collection
          </h1>
          <p className="mt-4 text-muted-foreground text-sm max-w-md mx-auto leading-relaxed">
            Every piece hand-selected by Jazmin. Real models, no AI.
            Free shipping available on qualifying orders.
          </p>
        </div>

        {/* Shop content with tabs */}
        <ShopContent products={products} collections={collections} />

        {/* Bottom banner */}
        <div className="bg-primary text-primary-foreground text-center py-12 px-4">
          <p className="font-serif text-2xl sm:text-3xl mb-2 text-balance">
            More styles arriving soon
          </p>
          <p className="text-primary-foreground/80 text-sm tracking-wide">
            Follow{" "}
            <a
              href="https://instagram.com/dayannas_boutiq_and_colective"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-primary-foreground transition-colors"
            >
              @dayannas_boutiq_and_colective
            </a>{" "}
            for the latest drops
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
