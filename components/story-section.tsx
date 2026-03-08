import Image from "next/image"
import { MapPin, Globe, Heart, Leaf } from "lucide-react"

const values = [
  {
    icon: Leaf,
    title: "Eco-Friendly",
    description:
      "Every piece is sourced from suppliers who prioritize sustainable materials and ethical production.",
  },
  {
    icon: Heart,
    title: "Personal Touch",
    description:
      "We thank customers with handwritten letters and emails. We even meet one in person every month.",
  },
  {
    icon: Globe,
    title: "Global Sourcing",
    description:
      "From local artisans to world-renowned brands, we find the best quality at the best prices.",
  },
  {
    icon: MapPin,
    title: "Rooted in Tijuana",
    description:
      "Born and based in Tijuana, Mexico, now shipping worldwide -- our roots and values shape everything we do.",
  },
]

export function StorySection() {
  return (
    <section id="story" className="py-20 lg:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
              <Image
                src="/images/about-shawna.jpg"
                alt="Jazmin, founder of Dayanna's Boutique"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Decorative accent */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10 rounded-lg -z-10" />
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-fuchsia/10 rounded-lg -z-10" />
          </div>

          {/* Content */}
          <div>
            <p className="text-primary text-xs tracking-[0.3em] uppercase font-semibold mb-3">
              Our Story
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground leading-tight text-balance">
              Meet Jazmin
            </h2>
            <div className="mt-6 flex flex-col gap-4 text-muted-foreground leading-relaxed">
              <p>
                Born and raised in Tijuana, Mexico, Jazmin always had a keen eye for great style
                and a deep belief in giving customers a personal experience. She started by building
                a loyal following in her home city, pouring her heart into every interaction.
              </p>
              <p>
                When the cost of rent became overwhelming, Jazmin and her business partner
                made a bold decision -- move online. What seemed impossible became the
                greatest opportunity: now sourcing from the entire world, offering better
                prices, and reaching customers everywhere.
              </p>
              <p className="text-foreground font-medium italic">
                {'"'}Our talents and ideas aren&apos;t wrong. We should always follow our
                dreams and do what makes us happy. Sometimes we just need to make a change
                or keep going -- even when it seems impossible.{'"'}
              </p>
            </div>
          </div>
        </div>

        {/* Values grid */}
        <div className="mt-20 lg:mt-28 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value) => (
            <div key={value.title} className="text-center group">
              <div className="mx-auto w-14 h-14 rounded-full bg-secondary flex items-center justify-center mb-5 group-hover:bg-primary/10 transition-colors duration-300">
                <value.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-serif text-lg text-foreground mb-2">
                {value.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
