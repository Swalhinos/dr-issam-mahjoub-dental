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
  title: 'Centre Dentaire Al Qods | Dentist in Béni Mellal, Morocco',
  description:
    'Premium dental clinic in Béni Mellal led by Dr. Omari Abdelhakim, dental surgeon. Teeth whitening, implants, orthodontics, pediatric dentistry and more. Book your appointment today.',
  keywords: [
    'dentist Béni Mellal',
    'dental clinic Béni Mellal',
    'Dr Omari Abdelhakim',
    'cabinet dentaire Béni Mellal',
    'teeth whitening Béni Mellal',
    'dental implants Morocco',
  ],
  icons: {
    icon: '/images/logo.png',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Centre Dentaire Al Qods | Dentist in Béni Mellal',
    description:
      'Premium dental care in the heart of Béni Mellal. Book your appointment with Dr. Omari Abdelhakim today.',
    type: 'website',
    locale: 'en_US',
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
