import '../styles/globals.css'
import { useRouter } from 'next/router'
import { AuthContextProvider } from '../contexts/authContext'
import AuthWrapper from '../components/authWrapper'
import NavBar from '../components/navBar'
import Head from 'next/head'
import { useEffect } from 'react'
import { motion } from 'framer-motion'

const mainVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { ease: 'easeInOut' },
  },
}

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const noAuth = ['/login']
  useEffect(() => {
    if (!navigator.onLine) {
      document.documentElement.style.setProperty('--color-body', '#98ae9b')
      document.documentElement.style.setProperty(
        '--color-card-shadow',
        '#bbd9bf'
      )
    }
  }, [])
  return (
    <>
      <Head>
        <title>TimeBorn - A Birthday Tracker App</title>
        <meta name='viewport' content='width=device-width,initial-scale=1' />
      </Head>
      <AuthContextProvider>
        {noAuth.includes(router.pathname) ? (
          <Component {...pageProps} />
        ) : (
          <>
            <NavBar />
            <motion.main
              key={router.route}
              variants={mainVariant}
              initial='hidden'
              animate='visible'
            >
              <AuthWrapper>
                <Component {...pageProps} />
              </AuthWrapper>
            </motion.main>
          </>
        )}
      </AuthContextProvider>
    </>
  )
}

export default MyApp
