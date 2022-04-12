import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta name='theme-color' content='#6bcb77' />
          <meta
            name='description'
            content='It is a birthday tracker app with added features like birthday wishes,notify events,searching friends and many more.'
          />
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin />
          <link
            href='https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap'
            rel='stylesheet'
          />

          <link rel='apple-touch-icon' href='/logo192.png' />
          <link rel='manifest' href='/manifest.json' />
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
