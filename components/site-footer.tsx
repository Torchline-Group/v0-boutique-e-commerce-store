import { Heart, Instagram, Facebook, Mail } from "lucide-react"

const shopLinks = [
  { label: "New Arrivals", href: "#" },
  { label: "Bestsellers", href: "#" },
  { label: "Collections", href: "#" },
  { label: "Sale", href: "#" },
]

const aboutLinks = [
  { label: "Our Story", href: "#story" },
  { label: "Giving Back", href: "#giving" },
  { label: "Sustainability", href: "#" },
  { label: "Press", href: "#" },
]

const helpLinks = [
  { label: "Shipping & Returns", href: "#" },
  { label: "Size Guide", href: "#" },
  { label: "FAQ", href: "#" },
  { label: "Contact Us", href: "#contact" },
]

export function SiteFooter() {
  return (
    <footer id="contact" className="bg-warm-brown py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-4">
              <span className="font-serif text-2xl tracking-wider text-cream">
                Alma Sol
              </span>
              <span className="block text-[10px] tracking-[0.3em] uppercase text-cream/60 font-medium">
                Boutique
              </span>
            </div>
            <p className="text-cream/70 text-sm leading-relaxed max-w-xs">
              Fashion with soul. Eco-friendly, personally curated, and made to make
              you feel as good as you look.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a
                href="#"
                className="text-cream/60 hover:text-coral transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-cream/60 hover:text-coral transition-colors"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-cream/60 hover:text-coral transition-colors"
                aria-label="Email us"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-cream text-xs tracking-[0.2em] uppercase font-semibold mb-4">
              Shop
            </h3>
            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-cream/60 text-sm hover:text-cream transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-cream text-xs tracking-[0.2em] uppercase font-semibold mb-4">
              About
            </h3>
            <ul className="space-y-3">
              {aboutLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-cream/60 text-sm hover:text-cream transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-cream text-xs tracking-[0.2em] uppercase font-semibold mb-4">
              Help
            </h3>
            <ul className="space-y-3">
              {helpLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-cream/60 text-sm hover:text-cream transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-cream/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-cream/40 text-xs">
            &copy; {new Date().getFullYear()} Alma Sol Boutique. All rights reserved.
          </p>
          <p className="text-cream/40 text-xs flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-coral fill-coral" /> from San Diego &amp; Mexico
          </p>
        </div>
      </div>
    </footer>
  )
}
