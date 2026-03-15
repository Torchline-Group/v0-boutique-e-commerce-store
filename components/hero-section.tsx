import Image from "next/image"
import { ArrowRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

const SHOPIFY_URL = "https://shop.dayannaboutique.com"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero.jpg"
          alt="Stylish woman in a blush satin dress on a modern rooftop at golden hour"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-charcoal/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8 w-full py-32 lg:py-0">
        <div className="max-w-2xl">
          <p className="text-rose-light text-sm tracking-[0.3em] uppercase mb-4 font-medium">
            San Diego &middot; Mexico &middot; Worldwide
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl text-soft-white leading-tight text-balance">
            Fashion With
            <br />
            <span className="italic text-rose-light">Soul</span>
          </h1>
          <p className="mt-6 text-soft-white/90 text-lg lg:text-xl leading-relaxed max-w-lg">
            Curated eco-friendly fashion sourced from the world&apos;s finest brands.
            Because style should feel as good as it looks.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-rose-light px-8 py-6 text-sm tracking-widest uppercase font-medium"
            >
              <a href={SHOPIFY_URL} target="_blank" rel="noopener noreferrer">
                Shop New Arrivals
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-soft-white/40 text-soft-white hover:bg-soft-white/10 hover:text-soft-white px-8 py-6 text-sm tracking-widest uppercase font-medium bg-transparent"
            >
              <a href="#story">
                Our Story
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scrolling banner */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-primary via-fuchsia to-primary py-3 overflow-hidden">
        <div className="animate-marquee flex items-center gap-8 whitespace-nowrap">
          {Array.from({ length: 3 }).map((_, i) => (
            <span key={i} className="flex items-center gap-8 text-primary-foreground text-xs tracking-[0.2em] uppercase font-medium">
              <span>Eco-Friendly Fashion</span>
              <span className="opacity-60">&bull;</span>
              <span>10% to Charity</span>
              <span className="opacity-60">&bull;</span>
              <span>Free Worldwide Shipping</span>
              <span className="opacity-60">&bull;</span>
              <span>Quality Over Quantity</span>
              <span className="opacity-60">&bull;</span>
              <span>Personal Customer Care</span>
              <span className="opacity-60">&bull;</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
