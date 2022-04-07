import { signInWithPopup, signOut } from 'firebase/auth'
import { auth, googleProvider } from '../lib/firebase'
import Link from 'next/link'
import { useContext } from 'react'
import AuthContext from '../contexts/authContext'
import useAuthListner from '../hooks/useAuthListner'

export default function Login() {
  const handleSignin = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        console.log(result.user)
      })
      .catch((err) => {
        console.log('Something went wrong', err)
      })
  }

  return (
    <>
      {console.count('Login')}
      <h1>Login Page</h1>
      <button onClick={handleSignin}>Sign in with Google</button>
      <button onClick={() => signOut(auth)}>Sign Out</button>
      <Link href='/'>
        <a>Home</a>
      </Link>
    </>
  )
}
