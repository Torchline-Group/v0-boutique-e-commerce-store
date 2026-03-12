import { Navigation } from "@/components/navigation"
import { SiteFooter } from "@/components/site-footer"
import { getProductsFromShopify } from "@/lib/products"
import { ProductDetail } from "@/components/product-detail"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const products = await getProductsFromShopify()
  const product = products.find((p) => p.id === decodeURIComponent(id))

  if (!product) {
    return {
      title: "Product Not Found | Dayanna's Boutique",
    }
  }

  return {
    title: `${product.name} | Dayanna's Boutique`,
    description: product.description,
  }
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params
  const products = await getProductsFromShopify()
  const product = products.find((p) => p.id === decodeURIComponent(id))

  if (!product) {
    notFound()
  }

  // Get related products from the same collection
  const relatedProducts = products
    .filter((p) => p.collection === product.collection && p.id !== product.id)
    .slice(0, 4)

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background pt-20">
        <ProductDetail product={product} relatedProducts={relatedProducts} />
      </main>
      <SiteFooter />
    </>
  )
}
