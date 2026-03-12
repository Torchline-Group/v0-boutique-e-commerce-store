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

// Fallback products when Shopify isn't connected
const fallbackProducts: Product[] = [
  {
    id: "Dayanna - Dresses - Gold Satin Ruffle Midi Dress",
    name: "Gold Satin Ruffle Midi Dress",
    price: 0,
    displayPrice: 89,
    image: "/images/product-1.jpg",
    tag: "Bestseller",
    description: "Elegant gold satin ruffle midi dress with adjustable straps. Store price: $89",
    collection: "Dresses",
  },
  {
    id: "Dayanna - Lounge Sets - Pink Tie-Dye Lounge Set",
    name: "Pink Tie-Dye Lounge Set",
    price: 0,
    displayPrice: 65,
    image: "/images/product-2.jpg",
    tag: "New Arrival",
    description: "Comfortable tie-dye crop top and matching set. Store price: $65",
    collection: "Lounge Sets",
  },
  {
    id: "Dayanna - Two-Piece Sets - Pastel Rainbow Crop & Legging Set",
    name: "Pastel Rainbow Crop & Legging Set",
    price: 0,
    displayPrice: 72,
    image: "/images/product-3.jpg",
    tag: "Jazmin's Pick",
    description: "Vibrant pastel rainbow two-piece set. Store price: $72",
    collection: "Two-Piece Sets",
  },
  {
    id: "Dayanna - Two-Piece Sets - Textured Pink & Mint Two-Piece Set",
    name: "Textured Pink & Mint Two-Piece Set",
    price: 0,
    displayPrice: 78,
    image: "/images/product-4.jpg",
    tag: "Limited Edition",
    description: "Textured fabric two-piece set in pink and mint. Store price: $78",
    collection: "Two-Piece Sets",
  },
  {
    id: "Dayanna - Tracksuits - Crushed Velvet Tracksuit",
    name: "Crushed Velvet Tracksuit",
    price: 0,
    displayPrice: 85,
    image: "/images/product-5.jpg",
    tag: null,
    description: "Luxurious crushed velvet tracksuit set. Store price: $85",
    collection: "Tracksuits",
  },
  {
    id: "Dayanna - Two-Piece Sets - Rainbow Textured Crop & Legging Set",
    name: "Rainbow Textured Crop & Legging Set",
    price: 0,
    displayPrice: 75,
    image: "/images/product-6.jpg",
    tag: "New Arrival",
    description: "Rainbow textured crop top and legging set. Store price: $75",
    collection: "Two-Piece Sets",
  },
]

// Transform Shopify products to our Product type
export function transformShopifyProduct(product: ShopifyProduct): Product {
  // Get image from the images edges array
  const firstImage = product.images?.edges?.[0]?.node?.url || ""
  const priceValue = parseFloat(product.priceRange?.minVariantPrice?.amount || "0")

  return {
    id: product.id,
    name: product.title,
    price: priceValue * 100, // Convert to cents for Snipcart
    displayPrice: priceValue,
    image: firstImage,
    tag: null,
    description: product.description || product.title,
    collection: product.productType || "Uncategorized",
  }
}

// Fetch products from Shopify with fallback to static products
export async function getProductsFromShopify(): Promise<Product[]> {
  try {
    const shopifyProducts = await getProducts({ first: 100 })
    if (shopifyProducts.length > 0) {
      return shopifyProducts.map(transformShopifyProduct)
    }
    // Return fallback if no products returned
    return fallbackProducts
  } catch (error) {
    console.error("Error fetching Shopify products:", error)
    // Return fallback products so the site still works
    return fallbackProducts
  }
}

// Export static products for direct use
export const products = fallbackProducts
export const collections = [...new Set(fallbackProducts.map((p) => p.collection))]

export { type ShopifyProduct }
