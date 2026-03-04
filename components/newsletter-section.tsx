"use client"

import { useState } from "react"
import { Send, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail("")
    }
  }

  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-primary text-xs tracking-[0.3em] uppercase font-semibold mb-3">
            Stay Connected
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground text-balance">
            Join the Dayanna{"'"}s Family
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Be the first to know about new arrivals, exclusive offers, and the
            causes we&apos;re supporting this month. Plus, get 15% off your first order.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-12 bg-card border-border text-foreground placeholder:text-muted-foreground focus:ring-primary focus:border-primary"
              required
            />
            <Button
              type="submit"
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-rose-light h-12 px-6 text-sm tracking-widest uppercase font-medium"
              disabled={submitted}
            >
              {submitted ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Subscribed
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Subscribe
                </>
              )}
            </Button>
          </form>

          {submitted && (
            <p className="mt-4 text-primary text-sm font-medium">
              Welcome to the family! Check your inbox for your 15% discount code.
            </p>
          )}

          <p className="mt-4 text-xs text-muted-foreground">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  )
}
