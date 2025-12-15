import type { AppProps } from 'next/app'
import { Toaster } from '@/components/ui/sonner'
import '../styles/global.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Toaster position="top-center" />
    </>
  )
}

export default MyApp
