import '../styles/globals.css'
import { useRouter } from 'next/router'
import AuthContext, { AuthContextProvider } from '../contexts/authContext'
import useAuthListner from '../hooks/useAuthListner'
import ProtectedRoute from '../components/protectedRoute'
import AuthWrapper from '../components/protectedRoute/authWrapper'

function MyApp({ Component, pageProps }) {
  // const { user, isLoading } = useAuthListner()
  const router = useRouter()
  const noAuth = ['/login']
  return (
    <AuthContextProvider>
      {noAuth.includes(router.pathname) ? (
        <Component {...pageProps} />
      ) : (
        <AuthWrapper>
          <Component {...pageProps} />
        </AuthWrapper>
      )}
    </AuthContextProvider>
  )
}

export default MyApp
