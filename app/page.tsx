import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { FeaturedProducts } from "@/components/featured-products"
import { StorySection } from "@/components/story-section"
import { GivingSection } from "@/components/giving-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { SiteFooter } from "@/components/site-footer"

export default function Home() {
  return (
    <main>
      <Navigation />
      <HeroSection />
      <FeaturedProducts />
      <StorySection />
      <GivingSection />
      <TestimonialsSection />
      <NewsletterSection />
      <SiteFooter />
    </main>
  )
}
