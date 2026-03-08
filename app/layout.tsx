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
  title: 'Dayanna\'s Boutique | Stylish Women\'s Fashion with Soul',
  description: 'Discover curated eco-friendly fashion at Dayanna\'s Boutique. Founded in San Diego with Mexican roots, we bring you quality women\'s clothing with a personal touch. 10% of profits support charitable causes.',
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
    <html lang="en" className={`${dmSans.variable} ${playfair.variable}`}>
      <head>
        <link rel="stylesheet" href="https://cdn.snipcart.com/themes/v3.4.0/default/snipcart.css" />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
        <script
          async
          src="https://cdn.snipcart.com/themes/v3.4.0/default/snipcart.js"
        ></script>
        <div
          id="snipcart"
          data-api-key={process.env.NEXT_PUBLIC_SNIPCART_API_KEY}
          hidden
        ></div>
      </body>
    </html>
  )
}
