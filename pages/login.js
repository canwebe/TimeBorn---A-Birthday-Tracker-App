import { signInWithPopup, signOut } from 'firebase/auth'
import { auth, googleProvider } from '../lib/firebase'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import { useAuth } from '../contexts/authContext'
import { useRouter } from 'next/router'
import styles from '../styles/Login.module.css'
import { FcGoogle } from 'react-icons/fc'

export default function Login() {
  const [isLoading, setIsLoading] = useState(false)

  const { user } = useAuth()
  const router = useRouter()

  const handleSignin = () => {
    setIsLoading(true)
    signInWithPopup(auth, googleProvider)
      .then(() => {
        setIsLoading(false)
        router.push('/')
      })
      .catch((err) => {
        setIsLoading(false)
        console.log('Something went wrong', err)
      })
  }

  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [user])

  return (
    <div className={styles.loginDiv}>
      <div className={styles.loginBox}>
        <p className={styles.welcomeText}>Welcome To</p>
        <p className={styles.timeBorn}>TimeBorn</p>
        <button onClick={handleSignin} className={styles.button}>
          {isLoading ? (
            'Loading..'
          ) : (
            <>
              <FcGoogle /> Sign In With Google{' '}
            </>
          )}
        </button>
      </div>
    </div>
  )
}
