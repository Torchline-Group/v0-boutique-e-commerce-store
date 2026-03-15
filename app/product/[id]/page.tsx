import { redirect } from "next/navigation"

const SHOPIFY_STORE_URL = "https://shop.dayannaboutique.com"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params
  // Redirect to Shopify store - products will be found there
  redirect(`${SHOPIFY_STORE_URL}/products/${encodeURIComponent(id)}`)
}
