import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import AuthContext, { useAuth } from '../../contexts/authContext'

const AuthWrapper = ({ children }) => {
  const { user } = useAuth()
  const router = useRouter()
  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [router, user])

  return <>{user ? children : null}</>
}

export default AuthWrapper
