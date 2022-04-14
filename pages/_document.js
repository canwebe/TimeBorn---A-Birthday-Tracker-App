import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta name='theme-color' content='#90d098' />
          <meta
            name='description'
            content='It is a birthday tracker app with added features like birthday wishes,notify events,searching friends and many more.'
          />
          <meta name='twitter:card' content='summary' />
          <meta name='twitter:url' content='https://timeborn.vercel.app' />
          <meta name='twitter:title' content='Timeborn - A Birthday Tracker' />
          <meta
            name='twitter:description'
            content='It is a birthday tracker app with added features like birthday wishes,notify events,searching friends and many more.'
          />
          <meta
            name='twitter:image'
            content='https://timeborn.vercel.app/logo192.png'
          />
          <meta name='twitter:creator' content='@Iamrrk__' />
          <meta property='og:type' content='website' />
          <meta
            property='og:title'
            content='TimeBorn - A Birthday Tracker App'
          />
          <meta
            property='og:description'
            content='It is a birthday tracker app with added features like birthday wishes,notify events,searching friends and many more.'
          />
          <meta property='og:site_name' content='TimeBorn' />
          <meta property='og:url' content='https://timeborn.vercel.app' />
          <meta
            property='og:image'
            content='https://timeborn.vercel.app/logo512.png'
          />
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin />
          <link
            href='https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap'
            rel='stylesheet'
          />

          <link rel='apple-touch-icon' href='/logo192.png' />
          <link rel='manifest' href='/manifest.json' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
