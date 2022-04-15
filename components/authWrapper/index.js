import { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/authContext'
import { useRouter } from 'next/router'
import Loader from '../loader'

export default function AuthWrapper({ children }) {
  const { user } = useAuth()
  const router = useRouter()
  const [isLoading, setisLoading] = useState(true)

  useEffect(() => {
    if (user) {
      // setisLoading(true)
      setisLoading(false)
    } else {
      router.push('/login')
    }
  }, [router, user])

  useEffect(() => {
    const handleComplete = () => {
      setisLoading(false)
    }

    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  }, [])

  return isLoading ? <Loader /> : user ? children : null
}
