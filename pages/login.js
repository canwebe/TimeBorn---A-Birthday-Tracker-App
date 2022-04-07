import { signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '../lib/firebase'
import Link from 'next/link'

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
      <h1>Login Page</h1>
      <button onClick={handleSignin}>Sign in with Google</button>
      <Link href='/'>
        <a>Home</a>
      </Link>
    </>
  )
}
