"use client"

import { useState } from "react"
import { ProductCard } from "@/components/product-card"
import type { Product } from "@/lib/products"

interface ShopContentProps {
  products: Product[]
  collections: string[]
}

export function ShopContent({ products, collections }: ShopContentProps) {
  const [activeTab, setActiveTab] = useState<string>("all")

  // Filter products based on active tab
  const filteredProducts = activeTab === "all" 
    ? products 
    : products.filter((p) => p.collection === activeTab)

  return (
    <div className="mx-auto max-w-7xl px-4 lg:px-8 py-12">
      {/* Collection tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-6 py-2.5 text-sm font-medium tracking-wide uppercase transition-all duration-200 rounded-full border ${
            activeTab === "all"
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-transparent text-foreground border-border hover:border-primary hover:text-primary"
          }`}
        >
          Shop All
        </button>
        {collections.map((collection) => (
          <button
            key={collection}
            onClick={() => setActiveTab(collection)}
            className={`px-6 py-2.5 text-sm font-medium tracking-wide uppercase transition-all duration-200 rounded-full border ${
              activeTab === collection
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-transparent text-foreground border-border hover:border-primary hover:text-primary"
            }`}
          >
            {collection}
          </button>
        ))}
      </div>

      {/* Product count */}
      <p className="text-center text-sm text-muted-foreground mb-8">
        Showing {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
        {activeTab !== "all" && ` in ${activeTab}`}
      </p>

      {/* Product grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              priority={index < 4}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-muted-foreground">No products found in this collection.</p>
        </div>
      )}
    </div>
  )
}
