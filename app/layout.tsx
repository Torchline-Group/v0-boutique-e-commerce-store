import type { Metadata, Viewport } from 'next'
import { DM_Sans, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CartProvider } from '@/lib/cart-context'
import { CartDrawer } from '@/components/cart-drawer'
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
  title: 'Dayanna\'s Boutique | Stylish Women\'s Fashion with Soul',
  description: 'Discover curated eco-friendly fashion at Dayanna\'s Boutique in Tijuana, Mexico. We bring you quality women\'s clothing with a personal touch. 10% of every purchase supports Equality Now in ending violence and discrimination against women and girls worldwide.',
  keywords: ['women\'s fashion', 'eco-friendly clothing', 'boutique', 'sustainable fashion', 'San Diego', 'online boutique'],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
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
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
<Analytics />
      </body>
    </html>
  )
}
