import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Sans_Arabic, Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-arabic',
})

export const metadata: Metadata = {
  title: 'Dr Issam Mahjoub | Chirurgien-Dentiste à Msaken, Sousse — Tunisie',
  description:
    'Cabinet dentaire du Dr Issam Mahjoub à Msaken, Sousse — Tunisie. Implants dentaires, orthodontie, blanchiment, prothèses et urgences. Prenez rendez-vous sur WhatsApp.',
  keywords: ['dentiste Msaken', 'dentiste Sousse', 'Dr Issam Mahjoub', 'cabinet dentaire Msaken', 'implant dentaire Tunisie', 'blanchiment dentaire Sousse', 'dental implants Tunisia'],
  icons: {
    icon: '/favicon.png',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Dr Issam Mahjoub | Dentist in Msaken, Sousse',
    description:
      'Premium dental care in the heart of Msaken, Sousse. Book your appointment with Dr Issam Mahjoub today.',
    type: 'website',
    locale: 'fr_FR',
  },
}

export const viewport: Viewport = {
  themeColor: '#4FC3F7',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`bg-background ${inter.variable} ${playfair.variable} ${plexArabic.variable}`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
