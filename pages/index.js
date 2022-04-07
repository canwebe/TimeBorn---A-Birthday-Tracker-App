import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import withAuth from '../components/protectedRoute'
import styles from '../styles/Home.module.css'

const Home = () => {
  const router = useRouter()
  return (
    <div>
      {console.count('Home')}
      <h1>Home</h1>
      <Link href='/login'>
        <a>Login</a>
      </Link>
      <button onClick={() => router.push('/login')}>on click</button>

      <footer className={styles.footer}>
        <p>CanWeBe!</p>
      </footer>
    </div>
  )
}

export default Home
