import Image from "next/image"
import { ArrowRight } from "lucide-react"

const collections = [
  {
    title: "Coastal Breeze",
    subtitle: "Summer Collection",
    description: "Light fabrics and warm tones inspired by the San Diego coastline.",
    image: "/images/collection-summer.jpg",
  },
  {
    title: "Golden Hour",
    subtitle: "Evening Collection",
    description: "Elegant pieces for nights that deserve something special.",
    image: "/images/collection-evening.jpg",
  },
]

export function CollectionsSection() {
  return (
    <section id="collections" className="py-20 lg:py-28 bg-secondary">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-primary text-xs tracking-[0.3em] uppercase font-semibold mb-3">
            Explore
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground text-balance">
            Our Collections
          </h2>
        </div>

        {/* Collection cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {collections.map((collection) => (
            <a
              key={collection.title}
              href="#"
              className="group relative overflow-hidden rounded-lg aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5]"
            >
              <Image
                src={collection.image}
                alt={collection.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-warm-brown/30 group-hover:bg-warm-brown/40 transition-colors duration-300" />

              <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-12">
                <p className="text-cream/80 text-xs tracking-[0.3em] uppercase font-medium mb-2">
                  {collection.subtitle}
                </p>
                <h3 className="font-serif text-3xl lg:text-4xl text-cream mb-3">
                  {collection.title}
                </h3>
                <p className="text-cream/80 text-sm leading-relaxed max-w-sm mb-6">
                  {collection.description}
                </p>
                <span className="inline-flex items-center gap-2 text-cream text-sm tracking-wider uppercase font-medium group-hover:gap-4 transition-all duration-300">
                  Explore Collection
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
