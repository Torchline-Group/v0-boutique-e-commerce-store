import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { getProductsFromShopify } from "@/lib/products"
import Link from "next/link"

export async function FeaturedProducts() {
  const products = await getProductsFromShopify()
  const featuredProducts = products.slice(0, 6) // Show first 6 products

  return (
    <section id="shop" className="py-20 lg:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-primary text-xs tracking-[0.3em] uppercase font-semibold mb-3">
            Curated for You
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground text-balance">
            Shop Our Favorites
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Each piece is hand-selected by Jazmin for quality, sustainability, and
            timeless style. All models are real. No AI. <strong>10% of every purchase supports Equality Now</strong> in their mission to end violence and discrimination against women and girls worldwide.
          </p>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {featuredProducts.length > 0 ? (
            featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-20 px-6">
              <div className="bg-secondary rounded-lg p-10 max-w-md mx-auto">
                <p className="text-sm text-muted-foreground mb-4">
                  Shopify integration is being set up. To display products:
                </p>
                <ol className="text-xs text-muted-foreground text-left space-y-2 mb-6">
                  <li>1. Go to your Shopify Admin</li>
                  <li>2. Navigate to Settings → Apps and sales channels → Develop apps</li>
                  <li>3. Create an app and configure Storefront API with "Read products" scope</li>
                  <li>4. Copy the Storefront access token</li>
                  <li>5. Add it to your environment variables as SHOPIFY_STOREFRONT_ACCESS_TOKEN</li>
                </ol>
                <p className="text-xs text-muted-foreground">
                  Once configured, your products will appear here automatically.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* View all CTA */}
        <div className="mt-16 text-center">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-10 py-6 text-sm tracking-widest uppercase font-medium transition-all duration-300"
          >
            <Link href="/shop">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
