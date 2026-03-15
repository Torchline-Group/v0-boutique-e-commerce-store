import { Heart, Instagram, Mail, Facebook } from "lucide-react"

const SHOPIFY_URL = "https://shop.dayannaboutique.com"

const shopLinks = [
  { label: "New Arrivals", href: `${SHOPIFY_URL}/collections/new-arrivals` },
  { label: "Bestsellers", href: `${SHOPIFY_URL}/collections/best-sellers` },
  { label: "All Collections", href: `${SHOPIFY_URL}/collections` },
  { label: "Sale", href: `${SHOPIFY_URL}/collections/sale` },
]

const aboutLinks = [
  { label: "Our Story", href: "#story", external: false },
  { label: "Giving Back", href: "#giving", external: false },
  { label: "Shop Our Store", href: SHOPIFY_URL, external: true },
]

const helpLinks = [
  { label: "Shipping & Returns", href: `${SHOPIFY_URL}/pages/shipping-returns`, external: true },
  { label: "Size Guide", href: `${SHOPIFY_URL}/pages/size-guide`, external: true },
  { label: "FAQ", href: `${SHOPIFY_URL}/pages/faq`, external: true },
  { label: "Contact Us", href: "#contact", external: false },
]

export function SiteFooter() {
  return (
    <footer id="contact" className="bg-plum py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-4">
              <span className="font-serif text-2xl tracking-wider text-soft-white">
                Dayanna{"'"}s
              </span>
              <span className="block text-[10px] tracking-[0.3em] uppercase text-soft-white/50 font-medium">
                Boutique
              </span>
            </div>
            <p className="text-soft-white/60 text-sm leading-relaxed max-w-xs">
              Fashion with soul. Eco-friendly, personally curated, and made to make
              you feel as good as you look.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a
                href="https://instagram.com/dayannas_boutiq_and_colective"
                target="_blank"
                rel="noopener noreferrer"
                className="text-soft-white/50 hover:text-rose-light transition-colors"
                aria-label="Follow Dayanna's Boutique on Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/jazz_b_c"
                target="_blank"
                rel="noopener noreferrer"
                className="text-soft-white/50 hover:text-rose-light transition-colors"
                aria-label="Follow Jazmin on Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/dayannasboutique"
                target="_blank"
                rel="noopener noreferrer"
                className="text-soft-white/50 hover:text-rose-light transition-colors"
                aria-label="Follow Dayanna's Boutique on Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="mailto:info@dayannasboutique.com"
                className="text-soft-white/50 hover:text-rose-light transition-colors"
                aria-label="Email us"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-soft-white text-xs tracking-[0.2em] uppercase font-semibold mb-4">
              Shop
            </h3>
            <ul className="flex flex-col gap-3">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-soft-white/50 text-sm hover:text-soft-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-soft-white text-xs tracking-[0.2em] uppercase font-semibold mb-4">
              About
            </h3>
            <ul className="flex flex-col gap-3">
              {aboutLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="text-soft-white/50 text-sm hover:text-soft-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-soft-white text-xs tracking-[0.2em] uppercase font-semibold mb-4">
              Help
            </h3>
            <ul className="flex flex-col gap-3">
              {helpLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="text-soft-white/50 text-sm hover:text-soft-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-soft-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-soft-white/35 text-xs">
            &copy; {new Date().getFullYear()} Dayanna{"'"}s Boutique. All rights reserved.
          </p>
          <p className="text-soft-white/35 text-xs flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-rose-light fill-rose-light" /> from Tijuana, Mexico
          </p>
        </div>
      </div>
    </footer>
  )
}
