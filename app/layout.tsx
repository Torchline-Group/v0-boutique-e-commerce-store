import type { Metadata, Viewport } from 'next'
import { DM_Sans, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: "Dayanna's Boutique | About Us - Fashion With Soul",
  description:
    "Learn about Dayanna's Boutique — curated eco-friendly fashion from Tijuana, Mexico. Discover our story, mission, and 10% charity commitment. Shop at shop.dayannaboutique.com",
  keywords: [
    "women's fashion",
    "eco-friendly clothing",
    "boutique",
    "sustainable fashion",
    "about us",
    "Dayanna's Boutique",
  ],
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#d64f78',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${dmSans.variable} ${playfair.variable}`}>
      <head />
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
