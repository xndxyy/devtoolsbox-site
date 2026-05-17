import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://devtoolsbox.site'),
  title: {
    default: 'Creator Numbers – Creator Fee and Earnings Calculators',
    template: '%s | Creator Numbers',
  },
  description:
    'Free creator calculators for Etsy fees, Gumroad pricing, Ko-fi income, Patreon earnings, digital product profit, and freelance rate planning.',
  keywords: [
    'creator fee calculator',
    'etsy fee calculator',
    'gumroad fee calculator',
    'ko-fi fee calculator',
    'patreon earnings calculator',
    'freelance hourly calculator',
  ],
  openGraph: {
    title: 'Creator Numbers – Creator Fee and Earnings Calculators',
    description:
      'Free creator calculators for Etsy fees, Gumroad pricing, Ko-fi income, Patreon earnings, digital product profit, and freelance rate planning.',
    type: 'website',
    url: 'https://devtoolsbox.site',
    siteName: 'devtoolsbox',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Creator Numbers – Creator Fee and Earnings Calculators',
    description:
      'Free creator calculators for Etsy fees, Gumroad pricing, Ko-fi income, Patreon earnings, digital product profit, and freelance rate planning.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
