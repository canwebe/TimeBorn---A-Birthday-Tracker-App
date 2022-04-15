import '../styles/globals.css'
import { useRouter } from 'next/router'
import { AuthContextProvider } from '../contexts/authContext'
import AuthWrapper from '../components/authWrapper'
import NavBar from '../components/navBar'
import Head from 'next/head'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const noAuth = ['/login']
  useEffect(() => {
    if (!navigator.onLine) {
      document.documentElement.style.setProperty(' --color-body', '#98ae9b')
      document.documentElement.style.setProperty(
        ' --color-card-shadow',
        '#bbd9bf'
      )
    }
  }, [])
  return (
    <>
      <Head>
        <title>TimeBorn - A Birthday Tracker App</title>
      </Head>
      <AuthContextProvider>
        {noAuth.includes(router.pathname) ? (
          <Component {...pageProps} />
        ) : (
          <>
            <NavBar />
            <main>
              <AuthWrapper>
                <Component {...pageProps} />
              </AuthWrapper>
            </main>
          </>
        )}
      </AuthContextProvider>
    </>
  )
}

export default MyApp
