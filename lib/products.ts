import { getProducts } from "@/lib/shopify"
import type { ShopifyProduct } from "@/lib/shopify/types"

export type Product = {
  id: string
  name: string
  price: number
  displayPrice: number
  image: string
  tag: string | null
  description: string
  collection: string
}

// Transform Shopify products to our Product type
export function transformShopifyProduct(product: ShopifyProduct): Product {
  const image = product.featuredImage?.url || ""
  const priceValue = parseFloat(product.priceRange?.minVariantPrice?.amount || "0")

  return {
    id: product.id,
    name: product.title,
    price: priceValue * 100, // Convert to cents for Snipcart
    displayPrice: priceValue,
    image,
    tag: null,
    description: product.description || product.title,
    collection: product.productType || "Uncategorized",
  }
}

// Fetch products from Shopify
export async function getProductsFromShopify(): Promise<Product[]> {
  try {
    const shopifyProducts = await getProducts({ first: 100 })
    return shopifyProducts.map(transformShopifyProduct)
  } catch (error) {
    console.error("Error fetching Shopify products:", error)
    return []
  }
}

export { type ShopifyProduct }
