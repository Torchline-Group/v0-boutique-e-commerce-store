import Image from "next/image"
import { Heart, ArrowRight } from "lucide-react"
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
                Giving Back
              </p>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-primary-foreground leading-tight text-balance">
              10% of Every Purchase Helps Someone in Need
            </h2>
            <div className="mt-6 flex flex-col gap-4 text-primary-foreground/85 leading-relaxed">
              <p>
                We believe fashion can be a force for good. That&apos;s why 10% of our
                profits go directly to charitable causes -- and you help us choose where.
              </p>
              <p>
                Each month, we rotate causes based on your suggestions, spreading support
                as widely as possible. From local shelters to international aid, every
                purchase you make creates ripples of positive change.
              </p>
              <p>
                This isn&apos;t just a business -- it&apos;s a community. And together,
                we&apos;re proving that doing good and looking good go hand in hand.
              </p>
            </div>
            <Button
              size="lg"
              className="mt-8 bg-soft-white text-charcoal hover:bg-blush px-8 py-6 text-sm tracking-widest uppercase font-medium"
            >
              Suggest a Cause
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
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
          </div>
        </div>

        {/* Impact stats */}
        <div className="mt-16 lg:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-primary-foreground/20 pt-12">
          <div className="text-center">
            <p className="font-serif text-4xl lg:text-5xl text-primary-foreground">
              12+
            </p>
            <p className="mt-2 text-primary-foreground/70 text-sm tracking-wider uppercase">
              Causes Supported
            </p>
          </div>
          <div className="text-center">
            <p className="font-serif text-4xl lg:text-5xl text-primary-foreground">
              2,400+
            </p>
            <p className="mt-2 text-primary-foreground/70 text-sm tracking-wider uppercase">
              Happy Customers
            </p>
          </div>
          <div className="text-center">
            <p className="font-serif text-4xl lg:text-5xl text-primary-foreground">
              30+
            </p>
            <p className="mt-2 text-primary-foreground/70 text-sm tracking-wider uppercase">
              Countries Reached
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
