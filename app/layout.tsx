import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'
import weddingConfig from '@/config/config'

/* ================================================
   Google Fonts
   ================================================ */
const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
})

/* ================================================
   Metadata & SEO
   ================================================ */
export const metadata: Metadata = {
  metadataBase: new URL(weddingConfig.seo.url),
  title: weddingConfig.seo.title,
  description: weddingConfig.seo.description,
  keywords: [
    'nuntă',
    'invitație nuntă',
    weddingConfig.couple.bride,
    weddingConfig.couple.groom,
    weddingConfig.wedding.displayDate,
    weddingConfig.wedding.location,
  ],
  authors: [{ name: `${weddingConfig.couple.bride} & ${weddingConfig.couple.groom}` }],
  openGraph: {
    type: 'website',
    url: weddingConfig.seo.url,
    title: weddingConfig.seo.title,
    description: weddingConfig.seo.description,
    images: [
      {
        url: weddingConfig.seo.ogImage,
        width: 1200,
        height: 630,
        alt: `Nunta ${weddingConfig.couple.bride} & ${weddingConfig.couple.groom}`,
      },
    ],
    locale: 'ro_RO',
    siteName: `Nunta ${weddingConfig.couple.bride} & ${weddingConfig.couple.groom}`,
  },
  twitter: {
    card: 'summary_large_image',
    title: weddingConfig.seo.title,
    description: weddingConfig.seo.description,
    images: [weddingConfig.seo.ogImage],
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#C9A07A',
}

/* ================================================
   Structured Data (JSON-LD)
   ================================================ */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: `Nunta ${weddingConfig.couple.bride} & ${weddingConfig.couple.groom}`,
  startDate: weddingConfig.wedding.date,
  location: {
    '@type': 'Place',
    name: weddingConfig.ceremony.name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: weddingConfig.ceremony.address,
      addressLocality: weddingConfig.wedding.location,
      addressCountry: 'RO',
    },
  },
  description: weddingConfig.seo.description,
  image: weddingConfig.seo.ogImage,
  organizer: {
    '@type': 'Person',
    name: `${weddingConfig.couple.bride} & ${weddingConfig.couple.groom}`,
  },
}

/* ================================================
   Root Layout
   ================================================ */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ro"
      className={`${cormorant.variable} ${inter.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-cream text-[#3D2E1A]">
        {children}
      </body>
    </html>
  )
}
