import { signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '../lib/firebase'
import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/authContext'
import { useRouter } from 'next/router'
import styles from '../styles/Login.module.css'
import { FcGoogle } from 'react-icons/fc'
import { checkNewUser, userDataEdit } from '../helpers/firebase'
import Image from 'next/image'
import { motion } from 'framer-motion'

const mainVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { ease: 'easeInOut' },
  },
}

export default function Login() {
  const [isLoading, setIsLoading] = useState(false)

  const { user } = useAuth()
  const router = useRouter()

  const handleSignin = async () => {
    setIsLoading(true)
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const uid = result.user.uid
      const isNew = await checkNewUser(uid)
      if (isNew) {
        const payload = {
          uid,
          photoURL: result.user?.photoURL,
          name: result.user?.displayName,
          nameLower: result.user?.displayName.toLowerCase(),
        }
        await userDataEdit(uid, payload)
      }
      setIsLoading(false)
      router.push('/')
    } catch (error) {
      console.log('Something went wrong in sign in', error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [user])

  return (
    <motion.div variants={mainVariant} initial='hidden' animate='visible'>
      <div className={styles.clipImg}>
        <Image
          src='/clipart.png'
          alt='bg image'
          width='300px'
          height='70px'
          layout='responsive'
        />
      </div>
      <div className={styles.loginDiv}>
        <div className={styles.loginBox}>
          <div className={styles.bgimg}>
            <Image
              src='/loginBg.svg'
              alt='bg image'
              width='300px'
              height='300px'
              layout='responsive'
            />
          </div>

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
    </motion.div>
  )
}
