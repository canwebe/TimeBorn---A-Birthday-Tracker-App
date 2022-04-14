import '../styles/globals.css'
import { useRouter } from 'next/router'
import { AuthContextProvider } from '../contexts/authContext'
import AuthWrapper from '../components/authWrapper'
import NavBar from '../components/navBar'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const noAuth = ['/login']
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
