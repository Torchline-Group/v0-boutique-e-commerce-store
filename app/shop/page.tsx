import { redirect } from "next/navigation"

const SHOPIFY_STORE_URL = "https://shop.dayannaboutique.com"

export default function ShopPage() {
  redirect(SHOPIFY_STORE_URL)
}
