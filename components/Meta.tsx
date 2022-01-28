import Head from 'next/head'
import Script from 'next/script'

export default function Container() {
  const meta = {
    title: "La Palabra - A daily word game based on Bad Bunny's lyrics",
    description:
      'Guess the word in 6 tries while listening to the song it appears in. New challenge available each day.',
    type: 'website',
    url: 'https://palabra.luciovilla.com/',
    image: 'https://palabra.luciovilla.com/site.png'
  }

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <link rel="canonical" href={meta.url} />
        <meta property="og:url" content={meta.url} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={meta.image} />
      </Head>
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
    </>
  )
}
