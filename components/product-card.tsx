"use client"

import Image from "next/image"
import { Heart, ShoppingBag, Star, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useMemo } from "react"
import type { Product } from "@/lib/products"

interface ProductCardProps {
  product: Product
  priority?: boolean
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

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  // Generate consistent promotional data based on product id
  const promoData = useMemo(() => {
    const seed = seededRandom(product.id)
    
    // Discount between 10% and 30%
    const discountPercent = 10 + (seed % 21) // 10-30
    const originalPrice = product.displayPrice / (1 - discountPercent / 100)
    
    // Star rating between 4.0 and 5.0
    const rating = 4 + ((seed % 11) / 10) // 4.0-5.0
    
    // Review count between 1 and 35
    const reviewCount = 1 + (seed % 35)
    
    // Badges - some products get special badges
    const badgeOptions = ["Top Seller", "Best Deal", "Hot", "Limited", null, null, null]
    const badge = badgeOptions[seed % badgeOptions.length]
    
    return {
      discountPercent,
      originalPrice: originalPrice.toFixed(2),
      rating: rating.toFixed(1),
      reviewCount,
      badge,
      fullStars: Math.floor(rating),
      hasHalfStar: rating % 1 >= 0.5,
    }
  }, [product.id, product.displayPrice])

  return (
    <div
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-blush">
        {product.image && product.image.trim() ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority={priority}
            loading={priority ? "eager" : "lazy"}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-secondary">
            <span className="text-muted-foreground text-sm">No image</span>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.tag && (
            <span className="bg-primary text-primary-foreground text-[10px] tracking-widest uppercase font-bold px-3 py-1.5 rounded-sm">
              {product.tag}
            </span>
          )}
          {promoData.badge && (
            <span className="bg-emerald-600 text-white text-[10px] tracking-widest uppercase font-bold px-3 py-1.5 rounded-sm">
              {promoData.badge}
            </span>
          )}
          <span className="bg-red-500 text-white text-[10px] tracking-widest uppercase font-bold px-2 py-1 rounded-sm">
            {promoData.discountPercent}% OFF
          </span>
        </div>

        <div
          className={`absolute inset-x-0 bottom-0 p-4 flex items-end justify-between transition-all duration-300 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <button
            className="snipcart-add-item bg-card/95 text-foreground hover:bg-card backdrop-blur-sm text-xs tracking-wider uppercase font-medium flex-1 mr-2 px-4 py-2 rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
            data-item-id={product.id}
            data-item-price={product.displayPrice.toFixed(2)}
            data-item-description={product.description}
            data-item-image={product.image || "/images/placeholder.jpg"}
            data-item-name={product.name}
            data-item-url="/shop"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            Add to Bag
          </button>
          <Button
            size="icon"
            variant="ghost"
            className="bg-card/95 backdrop-blur-sm hover:bg-card text-foreground h-9 w-9"
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart
              className={`h-4 w-4 transition-colors ${
                isLiked ? "fill-primary text-primary" : ""
              }`}
            />
            <span className="sr-only">Add to wishlist</span>
          </Button>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <h3 className="text-sm font-medium text-foreground line-clamp-1">{product.name}</h3>
        
        {/* Star Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${
                  i < promoData.fullStars
                    ? "fill-amber-400 text-amber-400"
                    : i === promoData.fullStars && promoData.hasHalfStar
                    ? "fill-amber-400/50 text-amber-400"
                    : "fill-muted text-muted"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            {promoData.rating} ({promoData.reviewCount})
          </span>
        </div>

        {/* Pricing */}
        <div className="flex items-center gap-2">
          <span className="text-sm line-through text-red-400/80">
            ${promoData.originalPrice}
          </span>
          <span className="text-base font-bold text-emerald-600">
            ${product.displayPrice.toFixed(2)}
          </span>
        </div>

        {/* Shipping */}
        <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
          <Truck className="h-3 w-3" />
          <span>Free 7-day shipping | $8.99 for 2-4 days</span>
        </div>
      </div>
    </div>
  )
}
