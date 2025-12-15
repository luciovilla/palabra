import { Toaster } from '@/components/ui/sonner'
import '../styles/global.css'
import type { Metadata } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
  title: "La Palabra - A daily word game based on Bad Bunny's lyrics",
  description:
    'Guess the word in 6 tries while listening to the song it appears in. New challenge available each day.',
  openGraph: {
    title: "La Palabra - A daily word game based on Bad Bunny's lyrics",
    description:
      'Guess the word in 6 tries while listening to the song it appears in. New challenge available each day.',
    url: 'https://palabra.luciovilla.com/',
    type: 'website',
    images: [
      {
        url: 'https://palabra.luciovilla.com/site.png'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    images: ['https://palabra.luciovilla.com/site.png']
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster position="top-center" />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-QGB30Q1CH1"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-QGB30Q1CH1');
          `}
        </Script>
      </body>
    </html>
  )
}
