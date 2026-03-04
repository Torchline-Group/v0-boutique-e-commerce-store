"use client"

import { useState, useEffect } from "react"
import { Menu, ShoppingBag, Search, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet"

const navLinks = [
  { label: "Shop", href: "#shop" },
  { label: "Collections", href: "#collections" },
  { label: "Our Story", href: "#story" },
  { label: "Giving Back", href: "#giving" },
  { label: "Contact", href: "#contact" },
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
        isScrolled
          ? "bg-card/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
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
              <SheetDescription className="sr-only">
                Navigation menu
              </SheetDescription>
              <nav className="mt-8 flex flex-col gap-6">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-lg font-sans text-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
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
                className={`text-sm font-medium tracking-wide uppercase transition-colors ${
                  isScrolled
                    ? "text-foreground hover:text-primary"
                    : "text-soft-white/90 hover:text-soft-white"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Logo */}
          <a href="#" className="flex flex-col items-center">
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
                className={`text-sm font-medium tracking-wide uppercase transition-colors ${
                  isScrolled
                    ? "text-foreground hover:text-primary"
                    : "text-soft-white/90 hover:text-soft-white"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className={`hidden sm:flex ${isScrolled ? "text-foreground hover:bg-secondary" : "text-soft-white/90 hover:bg-soft-white/10"}`}
            >
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`hidden sm:flex ${isScrolled ? "text-foreground hover:bg-secondary" : "text-soft-white/90 hover:bg-soft-white/10"}`}
            >
              <Heart className="h-4 w-4" />
              <span className="sr-only">Wishlist</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`relative ${isScrolled ? "text-foreground hover:bg-secondary" : "text-soft-white/90 hover:bg-soft-white/10"}`}
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-bold">
                0
              </span>
              <span className="sr-only">Cart</span>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}
