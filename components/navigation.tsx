"use client"

import { useState, useEffect } from "react"
import { Menu, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet"

const SHOPIFY_URL = "https://shop.dayannaboutique.com"

const navLinks = [
  { label: "Shop", href: SHOPIFY_URL, external: true },
  { label: "Our Story", href: "/#story", external: false },
  { label: "Giving Back", href: "/#giving", external: false },
  { label: "Contact", href: "/#contact", external: false },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-card/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <nav className="flex items-center justify-between h-16 lg:h-20">

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`lg:hidden ${isScrolled ? "text-foreground" : "text-soft-white"} hover:bg-soft-white/10`}
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 bg-card border-border">
              <SheetTitle className="font-serif text-2xl tracking-wide text-foreground">
                Dayanna{"'"}s
              </SheetTitle>
              <SheetDescription className="sr-only">Navigation menu</SheetDescription>
              <nav className="mt-8 flex flex-col gap-6">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="text-lg font-sans text-foreground hover:text-primary transition-colors flex items-center gap-2"
                  >
                    {link.label}
                    {link.external && <ExternalLink className="h-4 w-4 opacity-50" />}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          {/* Desktop nav links - left */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.slice(0, 3).map((link) => (
              <a
                key={link.label}
                href={link.href}
                {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={`text-sm font-medium tracking-wide uppercase transition-colors flex items-center gap-1.5 ${
                  isScrolled ? "text-foreground hover:text-primary" : "text-soft-white/90 hover:text-soft-white"
                }`}
              >
                {link.label}
                {link.external && <ExternalLink className="h-3 w-3 opacity-60" />}
              </a>
            ))}
          </div>

          {/* Logo */}
          <a href="/" className="flex flex-col items-center">
            <span className={`font-serif text-2xl lg:text-3xl tracking-wider transition-colors ${
              isScrolled ? "text-foreground" : "text-soft-white"
            }`}>
              Dayanna{"'"}s
            </span>
            <span className={`text-[10px] tracking-[0.3em] uppercase font-medium transition-colors ${
              isScrolled ? "text-muted-foreground" : "text-soft-white/60"
            }`}>
              Boutique
            </span>
          </a>

          {/* Desktop nav links - right */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.slice(3).map((link) => (
              <a
                key={link.label}
                href={link.href}
                {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={`text-sm font-medium tracking-wide uppercase transition-colors ${
                  isScrolled ? "text-foreground hover:text-primary" : "text-soft-white/90 hover:text-soft-white"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Shop Now CTA */}
          <Button
            asChild
            size="sm"
            className={`${
              isScrolled
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-soft-white text-charcoal hover:bg-soft-white/90"
            } px-4 py-2 text-xs tracking-wider uppercase font-medium`}
          >
            <a href={SHOPIFY_URL} target="_blank" rel="noopener noreferrer">
              Shop Now
              <ExternalLink className="ml-1.5 h-3 w-3" />
            </a>
          </Button>

        </nav>
      </div>
    </header>
  )
}
