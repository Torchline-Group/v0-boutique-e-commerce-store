import { Navigation } from "@/components/navigation"
import { SiteFooter } from "@/components/site-footer"
import { ProductCard } from "@/components/product-card"
import { getProductsFromShopify } from "@/lib/products"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Shop All Collections | Dayanna's Boutique",
  description:
    "Browse all collections at Dayanna's Boutique — Dresses, Lounge Sets, Two-Piece Sets, Tracksuits and more. Real models, no AI, curated from Tijuana, Mexico.",
}

export default async function ShopPage() {
  const products = await getProductsFromShopify()
  const collections = [...new Set(products.map((p) => p.collection))]

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        {/* Page header */}
        <div className="bg-secondary pt-36 pb-16 text-center">
          <p className="text-primary text-xs tracking-[0.3em] uppercase font-semibold mb-3">
            Dayanna{"'"}s Boutique
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl text-foreground text-balance">
            All Collections
          </h1>
          <p className="mt-4 text-muted-foreground text-sm max-w-md mx-auto leading-relaxed">
            Every piece hand-selected by Jazmin. Real models, no AI.
            Free shipping available on qualifying orders.
          </p>
        </div>

        {/* Collections */}
        <div className="mx-auto max-w-7xl px-4 lg:px-8 py-20 space-y-24">
          {collections.length > 0 ? (
            collections.map((collection) => {
              const collectionProducts = products.filter(
                (p) => p.collection === collection
              )
              return (
                <section key={collection} id={collection.toLowerCase().replace(/\s+/g, "-")}>
                  {/* Collection header */}
                  <div className="flex items-center gap-6 mb-10">
                    <div className="flex-1 h-px bg-border" />
                    <h2 className="font-serif text-2xl sm:text-3xl text-foreground whitespace-nowrap">
                      {collection}
                    </h2>
                    <div className="flex-1 h-px bg-border" />
                  </div>

                  {/* Product grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {collectionProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>

                  {/* Coming soon placeholder when only one product in collection */}
                  {collectionProducts.length < 2 && (
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="aspect-[3/4] rounded-lg bg-secondary border border-dashed border-border flex flex-col items-center justify-center gap-3 text-muted-foreground"
                        >
                          <span className="text-3xl font-serif text-border">+</span>
                          <span className="text-xs tracking-widest uppercase">Coming Soon</span>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              )
            })
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p>Loading products...</p>
            </div>
          )}
        </div>

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
