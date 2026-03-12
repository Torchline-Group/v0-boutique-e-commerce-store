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

// Map Shopify product types to nicer collection names
const collectionNameMap: Record<string, string> = {
  "": "New Arrivals",
  "Uncategorized": "New Arrivals",
  "Dresses": "Dresses",
  "Lounge Sets": "Loungewear",
  "Two-Piece Sets": "Co-Ords",
  "Tracksuits": "Athleisure",
  "Tops": "Tops",
  "Bottoms": "Bottoms",
  "Accessories": "Accessories",
}

// Collection display order
export const collectionOrder = ["New Arrivals", "Dresses", "Co-Ords", "Loungewear", "Athleisure", "Classic"]

// Fallback products when Shopify isn't connected - these go in "Classic" collection
const fallbackProducts: Product[] = [
  {
    id: "Dayanna - Classic - Gold Satin Ruffle Midi Dress",
    name: "Gold Satin Ruffle Midi Dress",
    price: 8900,
    displayPrice: 89,
    image: "/images/product-1.jpg",
    tag: "Bestseller",
    description: "Elegant gold satin ruffle midi dress with adjustable straps. Store price: $89",
    collection: "Classic",
  },
  {
    id: "Dayanna - Classic - Pink Tie-Dye Lounge Set",
    name: "Pink Tie-Dye Lounge Set",
    price: 6500,
    displayPrice: 65,
    image: "/images/product-2.jpg",
    tag: "New Arrival",
    description: "Comfortable tie-dye crop top and matching set. Store price: $65",
    collection: "Classic",
  },
  {
    id: "Dayanna - Classic - Pastel Rainbow Crop & Legging Set",
    name: "Pastel Rainbow Crop & Legging Set",
    price: 7200,
    displayPrice: 72,
    image: "/images/product-3.jpg",
    tag: "Jazmin's Pick",
    description: "Vibrant pastel rainbow two-piece set. Store price: $72",
    collection: "Classic",
  },
  {
    id: "Dayanna - Classic - Textured Pink & Mint Two-Piece Set",
    name: "Textured Pink & Mint Two-Piece Set",
    price: 7800,
    displayPrice: 78,
    image: "/images/product-4.jpg",
    tag: "Limited Edition",
    description: "Textured fabric two-piece set in pink and mint. Store price: $78",
    collection: "Classic",
  },
  {
    id: "Dayanna - Classic - Crushed Velvet Tracksuit",
    name: "Crushed Velvet Tracksuit",
    price: 8500,
    displayPrice: 85,
    image: "/images/product-5.jpg",
    tag: null,
    description: "Luxurious crushed velvet tracksuit set. Store price: $85",
    collection: "Classic",
  },
  {
    id: "Dayanna - Classic - Rainbow Textured Crop & Legging Set",
    name: "Rainbow Textured Crop & Legging Set",
    price: 7500,
    displayPrice: 75,
    image: "/images/product-6.jpg",
    tag: "New Arrival",
    description: "Rainbow textured crop top and legging set. Store price: $75",
    collection: "Classic",
  },
]

// Map a product type to a nicer collection name
function mapCollection(productType: string | undefined): string {
  const type = productType || ""
  return collectionNameMap[type] || type || "New Arrivals"
}

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
    collection: mapCollection(product.productType),
  }
}

// Fetch products from Shopify combined with classic fallback products
export async function getProductsFromShopify(): Promise<Product[]> {
  try {
    const shopifyProducts = await getProducts({ first: 100 })
    const transformedProducts = shopifyProducts.map(transformShopifyProduct)
    // Always include classic fallback products
    return [...transformedProducts, ...fallbackProducts]
  } catch (error) {
    console.error("Error fetching Shopify products:", error)
    // Return fallback products so the site still works
    return fallbackProducts
  }
}

// Get unique collections from products, sorted by display order
export function getCollections(products: Product[]): string[] {
  const uniqueCollections = [...new Set(products.map((p) => p.collection))]
  return uniqueCollections.sort((a, b) => {
    const aIndex = collectionOrder.indexOf(a)
    const bIndex = collectionOrder.indexOf(b)
    // Items not in order go to end
    const aOrder = aIndex === -1 ? 999 : aIndex
    const bOrder = bIndex === -1 ? 999 : bIndex
    return aOrder - bOrder
  })
}

// Export static products for direct use
export const products = fallbackProducts

export { type ShopifyProduct }
