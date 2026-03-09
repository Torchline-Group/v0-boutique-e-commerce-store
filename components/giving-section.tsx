import Image from "next/image"
import { Heart, ArrowRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

export function GivingSection() {
  return (
    <section id="giving" className="py-20 lg:py-28 bg-gradient-to-br from-primary via-fuchsia to-primary">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Heart className="h-5 w-5 text-rose-light" />
              <p className="text-primary-foreground/80 text-xs tracking-[0.3em] uppercase font-semibold">
                Our Partner in Change
              </p>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-primary-foreground leading-tight text-balance">
              10% of Every Purchase Supports Equality Now
            </h2>
            <div className="mt-6 flex flex-col gap-4 text-primary-foreground/85 leading-relaxed">
              <p>
                We&apos;re proud partners with <strong>Equality Now</strong>, an organization
                dedicated to achieving legal equality for women and girls worldwide. Every purchase
                you make directly supports their fight to end violence, discrimination, trafficking,
                and harmful practices like child marriage.
              </p>
              <p>
                Since 1992, Equality Now has reformed over 130 discriminatory laws and positively
                impacted millions of lives globally. With your support, we&apos;re helping create
                a world where every woman and girl can live free from exploitation and fear.
              </p>
              <p className="text-primary-foreground text-sm">
                <strong>Our Commitment:</strong> 10% of profits from every order goes directly to
                Equality Now&apos;s mission to end sexual exploitation, combat trafficking, eliminate
                harmful practices, and drive systemic legal change.
              </p>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-soft-white text-charcoal hover:bg-blush px-8 py-6 text-sm tracking-widest uppercase font-medium"
              >
                <a href="https://www.equalitynow.org" target="_blank" rel="noopener noreferrer">
                  Learn More About Equality Now
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
            <Image
              src="/images/giving-back.jpg"
              alt="Community coming together to support charitable causes"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-primary/10" />
            
            {/* Equality Now badge */}
            <div className="absolute bottom-6 left-6 bg-soft-white/95 backdrop-blur-sm rounded-lg p-4 max-w-xs shadow-lg">
              <p className="text-charcoal text-xs tracking-[0.2em] uppercase font-bold mb-2">
                Proud Partner
              </p>
              <p className="text-charcoal font-serif text-lg font-semibold">
                Equality Now
              </p>
              <p className="text-charcoal/70 text-xs mt-1">
                Legal Equality for Women & Girls Worldwide
              </p>
            </div>
          </div>
        </div>

        {/* Impact stats */}
        <div className="mt-16 lg:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-primary-foreground/20 pt-12">
          <div className="text-center">
            <p className="font-serif text-4xl lg:text-5xl text-primary-foreground">
              130+
            </p>
            <p className="mt-2 text-primary-foreground/70 text-sm tracking-wider uppercase">
              Discriminatory Laws Reformed
            </p>
          </div>
          <div className="text-center">
            <p className="font-serif text-4xl lg:text-5xl text-primary-foreground">
              1992
            </p>
            <p className="mt-2 text-primary-foreground/70 text-sm tracking-wider uppercase">
              Driving Change Since
            </p>
          </div>
          <div className="text-center">
            <p className="font-serif text-4xl lg:text-5xl text-primary-foreground">
              Millions
            </p>
            <p className="mt-2 text-primary-foreground/70 text-sm tracking-wider uppercase">
              Lives Positively Impacted
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
