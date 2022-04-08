import { useEffect } from 'react'
import { useAuth } from '../../contexts/authContext'
import { useRouter } from 'next/router'

export default function AuthWrapper({ children }) {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [router, user])

  return user ? children : null
}
