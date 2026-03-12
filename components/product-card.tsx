"use client"

import Image from "next/image"
import { Heart, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import type { Product } from "@/lib/products"

export function ProductCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  return (
    <div
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-blush">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-secondary">
            <span className="text-muted-foreground text-sm">No image</span>
          </div>
        )}

        {product.tag && (
          <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-[10px] tracking-widest uppercase font-bold px-3 py-1.5 rounded-sm">
            {product.tag}
          </span>
        )}

        <div
          className={`absolute inset-x-0 bottom-0 p-4 flex items-end justify-between transition-all duration-300 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <button
            className="snipcart-add-item bg-card/95 text-foreground hover:bg-card backdrop-blur-sm text-xs tracking-wider uppercase font-medium flex-1 mr-2 px-4 py-2 rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
            data-item-id={product.id}
            data-item-price={product.price}
            data-item-description={product.description}
            data-item-image={product.image}
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

      <div className="mt-4">
        <h3 className="text-sm font-medium text-foreground">{product.name}</h3>
        <p className="mt-1 text-sm text-primary font-semibold">
          ${product.displayPrice}
        </p>
      </div>
    </div>
  )
}
