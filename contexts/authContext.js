import { onAuthStateChanged, signOut } from 'firebase/auth'
import { createContext, useState, useContext, useEffect } from 'react'
import { auth, firebaseApp } from '../lib/firebase'

const AuthContext = createContext(null)

export const useAuth = () => useContext(AuthContext)

export const AuthContextProvider = ({ children }) => {
  let defaultValue = null
  if (typeof window !== 'undefined') {
    defaultValue = JSON.parse(localStorage.getItem('authUser'))
  }
  const [user, setUser] = useState(defaultValue)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // if (!user) {
        localStorage.setItem('authUser', JSON.stringify(authUser))
        setUser(authUser)
        // }
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

  const handleSignOut = async () => {
    await signOut(auth)
  }

  return (
    <AuthContext.Provider value={{ user, handleSignOut }}>
      {isLoading ? null : children}
    </AuthContext.Provider>
  )
}
