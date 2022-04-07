import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, firebaseApp } from '../lib/firebase'

export default function useAuthListner() {
  let defaultValue = null
  if (typeof window !== 'undefined') {
    defaultValue = JSON.parse(localStorage.getItem('authUser'))
  }

  const [user, setUser] = useState(defaultValue)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        if (!user) {
          localStorage.setItem('authUser', JSON.stringify(authUser))
          setUser(authUser)
        }
        console.log('Sign in')
      } else {
        console.log('Log out')
        setUser(null)
        localStorage.removeItem('authUser')
      }
      setIsLoading(false)
    })
    return () => unsubscribe()
  }, [firebaseApp])

  return { user, isLoading }
}
