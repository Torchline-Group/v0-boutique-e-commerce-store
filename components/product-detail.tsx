"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useMemo } from "react"
import { Heart, Minus, Plus, ShoppingBag, Star, Truck, Shield, RotateCcw, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { ProductCard } from "@/components/product-card"
import type { Product } from "@/lib/products"

interface ProductDetailProps {
  product: Product
  relatedProducts: Product[]
}

// Generate consistent random values based on product id
function seededRandom(seed: string) {
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return Math.abs(hash)
}

const sizes = ["XS", "S", "M", "L", "XL"]
const colors = [
  { name: "Rose", value: "#d64f78" },
  { name: "Blush", value: "#f8e8e0" },
  { name: "Cream", value: "#faf7f2" },
  { name: "Navy", value: "#1a1f36" },
]

export function ProductDetail({ product, relatedProducts }: ProductDetailProps) {
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState(colors[0])
  const [isLiked, setIsLiked] = useState(false)
  const [activeTab, setActiveTab] = useState<"description" | "details" | "shipping">("description")

  // Generate consistent promotional data based on product id
  const promoData = useMemo(() => {
    const seed = seededRandom(product.id)
    
    // Discount between 10% and 30%
    const discountPercent = 10 + (seed % 21)
    const originalPrice = product.displayPrice / (1 - discountPercent / 100)
    
    // Star rating between 4.0 and 5.0
    const rating = 4 + ((seed % 11) / 10)
    
    // Review count between 1 and 35
    const reviewCount = 1 + (seed % 35)
    
    return {
      discountPercent,
      originalPrice: originalPrice.toFixed(2),
      rating: rating.toFixed(1),
      reviewCount,
      fullStars: Math.floor(rating),
      hasHalfStar: rating % 1 >= 0.5,
    }
  }, [product.id, product.displayPrice])

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
  }

  const incrementQuantity = () => setQuantity((prev) => Math.min(prev + 1, 10))
  const decrementQuantity = () => setQuantity((prev) => Math.max(prev - 1, 1))

  return (
    <div className="mx-auto max-w-7xl px-4 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/shop" className="hover:text-primary transition-colors">
          Shop
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href={`/shop?collection=${product.collection}`} className="hover:text-primary transition-colors">
          {product.collection}
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Product Image */}
        <div className="relative">
          <div className="aspect-[3/4] relative rounded-2xl overflow-hidden bg-secondary">
            {product.image && product.image.trim() ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-muted-foreground">No image available</span>
              </div>
            )}
            
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.tag && (
                <span className="bg-primary text-primary-foreground text-xs tracking-widest uppercase font-bold px-4 py-2 rounded-sm">
                  {product.tag}
                </span>
              )}
              <span className="bg-red-500 text-white text-xs tracking-widest uppercase font-bold px-3 py-1.5 rounded-sm">
                {promoData.discountPercent}% OFF
              </span>
            </div>

            {/* Wishlist button */}
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm p-3 rounded-full hover:bg-card transition-colors"
            >
              <Heart
                className={`h-5 w-5 ${isLiked ? "fill-primary text-primary" : "text-foreground"}`}
              />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          {/* Title and rating */}
          <div className="mb-6">
            <p className="text-primary text-xs tracking-[0.2em] uppercase font-semibold mb-2">
              {product.collection}
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl text-foreground mb-4">
              {product.name}
            </h1>
            
            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < promoData.fullStars
                        ? "fill-amber-400 text-amber-400"
                        : i === promoData.fullStars && promoData.hasHalfStar
                        ? "fill-amber-400/50 text-amber-400"
                        : "fill-muted text-muted"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {promoData.rating} ({promoData.reviewCount} reviews)
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-8">
            <span className="text-3xl font-bold text-emerald-600">
              ${product.displayPrice.toFixed(2)}
            </span>
            <span className="text-xl line-through text-red-400/80">
              ${promoData.originalPrice}
            </span>
            <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded">
              Save ${(parseFloat(promoData.originalPrice) - product.displayPrice).toFixed(2)}
            </span>
          </div>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed mb-8">
            {product.description}
          </p>

          {/* Color Selection */}
          <div className="mb-6">
            <p className="text-sm font-medium text-foreground mb-3">
              Color: <span className="font-normal text-muted-foreground">{selectedColor.name}</span>
            </p>
            <div className="flex gap-3">
              {colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={`w-10 h-10 rounded-full border-2 transition-all ${
                    selectedColor.name === color.name
                      ? "border-primary ring-2 ring-primary/30"
                      : "border-border hover:border-primary/50"
                  }`}
                  style={{ backgroundColor: color.value }}
                  aria-label={color.name}
                />
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-foreground">
                Size: <span className="font-normal text-muted-foreground">{selectedSize || "Select size"}</span>
              </p>
              <button className="text-sm text-primary hover:underline">Size Guide</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-[48px] h-12 px-4 rounded-md border transition-all font-medium ${
                    selectedSize === size
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-foreground border-border hover:border-primary"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="flex gap-4 mb-8">
            {/* Quantity selector */}
            <div className="flex items-center border border-border rounded-md">
              <button
                onClick={decrementQuantity}
                className="p-4 hover:bg-secondary transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="px-6 py-3 text-lg font-medium min-w-[3rem] text-center">
                {quantity}
              </span>
              <button
                onClick={incrementQuantity}
                className="p-4 hover:bg-secondary transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            {/* Add to cart button */}
            <Button
              onClick={handleAddToCart}
              size="lg"
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-sm uppercase tracking-wider font-medium gap-2"
            >
              <ShoppingBag className="h-4 w-4" />
              Add to Cart
            </Button>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-4 py-6 border-y border-border">
            <div className="flex flex-col items-center text-center gap-2">
              <Truck className="h-5 w-5 text-primary" />
              <span className="text-xs text-muted-foreground">Free Shipping</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <RotateCcw className="h-5 w-5 text-primary" />
              <span className="text-xs text-muted-foreground">Easy Returns</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-xs text-muted-foreground">Secure Checkout</span>
            </div>
          </div>

          {/* Product tabs */}
          <div className="mt-8">
            <div className="flex border-b border-border">
              {(["description", "details", "shipping"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${
                    activeTab === tab
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            
            <div className="py-6">
              {activeTab === "description" && (
                <div className="space-y-4 text-muted-foreground">
                  <p>{product.description}</p>
                  <p>
                    Each piece from Dayanna{"'"}s Boutique is hand-selected by Jazmin for quality, 
                    sustainability, and timeless style. We believe fashion should make you feel 
                    confident while doing good in the world.
                  </p>
                  <p>
                    <strong className="text-foreground">10% of every purchase supports Equality Now</strong> in 
                    their mission to end violence and discrimination against women and girls worldwide.
                  </p>
                </div>
              )}
              
              {activeTab === "details" && (
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    High-quality fabric blend for lasting comfort
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    Ethically sourced and sustainably made
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    Machine washable - cold water recommended
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    True to size fit
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    Imported from select boutique suppliers
                  </li>
                </ul>
              )}
              
              {activeTab === "shipping" && (
                <div className="space-y-4 text-muted-foreground">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Free Standard Shipping</h4>
                    <p>7-10 business days delivery on all orders over $50</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Express Shipping</h4>
                    <p>$8.99 for 2-4 business days delivery</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Returns</h4>
                    <p>
                      We accept returns within 30 days of purchase. Items must be unworn with 
                      original tags attached. Please contact us to initiate a return.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-20 pt-12 border-t border-border">
          <h2 className="font-serif text-2xl sm:text-3xl text-foreground text-center mb-12">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
