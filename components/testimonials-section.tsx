"use client"

import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const testimonials = [
  {
    name: "Maria R.",
    location: "Los Angeles, CA",
    text: "I've never felt so valued as a customer. Shawna sent me a handwritten thank you note with my order. The dress quality is incredible and knowing 10% went to a good cause made it even sweeter.",
    rating: 5,
  },
  {
    name: "Jessica T.",
    location: "Mexico City, MX",
    text: "Alma Sol isn't just a store -- it's a movement. The clothes are stunning, sustainable, and every interaction feels personal. Shawna truly cares about her customers and the planet.",
    rating: 5,
  },
  {
    name: "Sarah K.",
    location: "Austin, TX",
    text: "The linen collection is absolutely gorgeous. Fast shipping, beautiful packaging, and I love that I'm supporting a small business with a big heart. Already planning my next order!",
    rating: 5,
  },
  {
    name: "Amanda L.",
    location: "San Diego, CA",
    text: "I used to shop at the physical store in San Diego and was so happy when they went online. Now I can share Alma Sol with friends everywhere. Same incredible quality and personal service.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1))
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1))

  return (
    <section className="py-20 lg:py-28 bg-secondary">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-primary text-xs tracking-[0.3em] uppercase font-semibold mb-3">
            Customer Love
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground text-balance">
            What Our Community Says
          </h2>
        </div>

        {/* Testimonial carousel */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-card rounded-xl p-8 lg:p-12 shadow-sm">
            {/* Stars */}
            <div className="flex items-center gap-1 mb-6">
              {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-gold text-gold"
                />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="font-serif text-lg lg:text-xl text-foreground leading-relaxed italic">
              {'"'}{testimonials[current].text}{'"'}
            </blockquote>

            {/* Author */}
            <div className="mt-8 flex items-center justify-between">
              <div>
                <p className="font-semibold text-foreground">
                  {testimonials[current].name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {testimonials[current].location}
                </p>
              </div>

              {/* Navigation */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prev}
                  className="h-10 w-10 border-border text-foreground hover:bg-secondary"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Previous testimonial</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={next}
                  className="h-10 w-10 border-border text-foreground hover:bg-secondary"
                >
                  <ChevronRight className="h-4 w-4" />
                  <span className="sr-only">Next testimonial</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current ? "w-8 bg-primary" : "w-2 bg-border"
                }`}
              >
                <span className="sr-only">Go to testimonial {i + 1}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
