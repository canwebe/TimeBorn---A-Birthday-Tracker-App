import { MdClear, MdOutlineMenu } from 'react-icons/md'
import { useState } from 'react'
import Image from 'next/image'
import styles from './navBar.module.css'
import cls from 'classnames'
import { useAuth } from '../../contexts/authContext'
import Link from 'next/link'
import { useRouter } from 'next/router'
import NavLink from '../navLink'
import { AnimatePresence, motion } from 'framer-motion'

//Variants
const sidebarVariants = {
  hidden: {
    x: -100,
  },
  visible: {
    x: 0,
    transition: {
      type: 'spring',
      bounce: 0.25,
    },
  },
  exit: {
    x: '-70vw',
    opacity: 0,
  },
}

export default function NavBar() {
  const { user, handleSignOut } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleClick = async () => {
    setIsLoading(true)
    await handleSignOut()
    setIsLoading(false)
    router.push('/login')
    setIsOpen(false)
  }
  return (
    <>
      <nav className={styles.navWrapper}>
        <div className={cls('wrapper', styles.nav)}>
          <MdOutlineMenu
            className={styles.menu}
            onClick={() => setIsOpen(true)}
          />
          <Link href='/profile'>
            <a className={styles.avatarImg}>
              {user && (
                <Image
                  alt='avatar image'
                  width='20px'
                  height='20px'
                  layout='responsive'
                  className={styles.img}
                  src={user?.photoURL}
                  priority
                />
              )}
            </a>
          </Link>
        </div>
      </nav>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={sidebarVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
            className={styles.sideBar}
          >
            <div className={styles.topLogoWrapper}>
              <h1 className={styles.mainLogo}>TimeBorn</h1>
              <MdClear
                className={styles.menu}
                onClick={() => setIsOpen(false)}
              />
            </div>
            <div className={styles.menuList}>
              <NavLink setIsOpen={setIsOpen} href='/'>
                Home
              </NavLink>
              <NavLink setIsOpen={setIsOpen} href='/search'>
                Search
              </NavLink>

              <NavLink setIsOpen={setIsOpen} href='/profile'>
                Profile
              </NavLink>
            </div>
            <button
              onClick={handleClick}
              disabled={isLoading}
              className={styles.logOut}
            >
              {isLoading ? 'Loading' : 'Sign Out'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
