"use client"

import Image from "next/image"
import { Heart, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const products = [
  {
    id: "dayanna-gold-dress",
    name: "Gold Satin Ruffle Midi Dress",
    price: 89,
    image: "/images/product-1.jpg",
    tag: "Bestseller",
    description: "Elegant gold satin ruffle midi dress with adjustable straps",
  },
  {
    id: "dayanna-pink-tie-dye",
    name: "Pink Tie-Dye Lounge Set",
    price: 65,
    image: "/images/product-2.jpg",
    tag: "New Arrival",
    description: "Comfortable tie-dye crop top and matching set",
  },
  {
    id: "dayanna-pastel-rainbow",
    name: "Pastel Rainbow Crop & Legging Set",
    price: 72,
    image: "/images/product-3.jpg",
    tag: "Jazmin's Pick",
    description: "Vibrant pastel rainbow two-piece set",
  },
  {
    id: "dayanna-textured-pink-mint",
    name: "Textured Pink & Mint Two-Piece Set",
    price: 78,
    image: "/images/product-4.jpg",
    tag: "Limited Edition",
    description: "Textured fabric two-piece set in pink and mint",
  },
  {
    id: "dayanna-velvet-tracksuit",
    name: "Crushed Velvet Tracksuit",
    price: 85,
    image: "/images/product-5.jpg",
    tag: null,
    description: "Luxurious crushed velvet tracksuit set",
  },
  {
    id: "dayanna-rainbow-textured",
    name: "Rainbow Textured Crop & Legging Set",
    price: 75,
    image: "/images/product-6.jpg",
    tag: "New Arrival",
    description: "Rainbow textured crop top and legging set",
  },
]

function ProductCard({ product }: { product: (typeof products)[0] }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  return (
    <div
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-blush">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {product.tag && (
          <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-[10px] tracking-widest uppercase font-bold px-3 py-1.5 rounded-sm">
            {product.tag}
          </span>
        )}

        {/* Hover overlay actions */}
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
            data-item-url={typeof window !== "undefined" ? window.location.pathname : "/"}
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
          ${product.price}
        </p>
      </div>
    </div>
  )
}

export function FeaturedProducts() {
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
            timeless style. All models are real. No AI. Fashion that tells a story.
          </p>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View all CTA */}
        <div className="mt-16 text-center">
          <Button
            variant="outline"
            size="lg"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-10 py-6 text-sm tracking-widest uppercase font-medium transition-all duration-300"
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  )
}
