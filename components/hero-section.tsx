import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero.jpg"
          alt="Stylish woman in terracotta linen dress on a sunlit terrace"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-warm-brown/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8 w-full py-32 lg:py-0">
        <div className="max-w-2xl">
          <p className="text-sand text-sm tracking-[0.3em] uppercase mb-4 font-medium">
            San Diego &middot; Mexico &middot; Worldwide
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl text-cream leading-tight text-balance">
            Fashion With
            <br />
            <span className="italic">Soul</span>
          </h1>
          <p className="mt-6 text-cream/90 text-lg lg:text-xl leading-relaxed max-w-lg">
            Curated eco-friendly fashion sourced from the world&apos;s finest brands. 
            Because style should feel as good as it looks.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-terracotta-light px-8 py-6 text-sm tracking-widest uppercase font-medium"
            >
              Shop New Arrivals
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-cream/40 text-cream hover:bg-cream/10 hover:text-cream px-8 py-6 text-sm tracking-widest uppercase font-medium bg-transparent"
            >
              Our Story
            </Button>
          </div>
        </div>
      </div>

      {/* Scrolling banner */}
      <div className="absolute bottom-0 left-0 right-0 bg-primary/90 backdrop-blur-sm py-3 overflow-hidden">
        <div className="animate-marquee flex items-center gap-8 whitespace-nowrap">
          {Array.from({ length: 3 }).map((_, i) => (
            <span key={i} className="flex items-center gap-8 text-primary-foreground text-xs tracking-[0.2em] uppercase font-medium">
              <span>Eco-Friendly Fashion</span>
              <span className="text-coral">&bull;</span>
              <span>10% to Charity</span>
              <span className="text-coral">&bull;</span>
              <span>Free Worldwide Shipping</span>
              <span className="text-coral">&bull;</span>
              <span>Quality Over Quantity</span>
              <span className="text-coral">&bull;</span>
              <span>Personal Customer Care</span>
              <span className="text-coral">&bull;</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
