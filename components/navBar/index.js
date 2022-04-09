import { MdClear, MdOutlineMenu } from 'react-icons/md'
import { useState } from 'react'
import Image from 'next/image'
import styles from './navBar.module.css'
import cls from 'classnames'
import { useAuth } from '../../contexts/authContext'
import Link from 'next/link'
import { useRouter } from 'next/router'
import NavLink from '../navLink'

export default function NavBar() {
  const { user, handleSignOut } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleClick = async () => {
    console.log('click')
    setIsLoading(true)
    await handleSignOut()
    setIsLoading(false)
    // setIsOpen(false)
  }
  return (
    <>
      <nav className={styles.navWrapper}>
        {console.log(user)}
        <div className={cls('wrapper', styles.nav)}>
          <MdOutlineMenu
            className={styles.menu}
            onClick={() => setIsOpen(true)}
          />

          <div className={styles.avatarImg}>
            {user && (
              <Image
                alt='avatar image'
                width='20px'
                height='20px'
                layout='responsive'
                className={styles.img}
                src={user?.photoURL}
              />
            )}
          </div>
        </div>
      </nav>
      {isOpen && (
        <div className={styles.sideBar}>
          <div className={styles.topLogoWrapper}>
            <h1 className={styles.mainLogo}>TimeBorn</h1>
            <MdClear className={styles.menu} onClick={() => setIsOpen(false)} />
          </div>
          <div className={styles.menuList}>
            <NavLink setIsOpen={setIsOpen} href='/'>
              Home
            </NavLink>
            <NavLink setIsOpen={setIsOpen} href='/search'>
              Search
            </NavLink>
            <NavLink setIsOpen={setIsOpen} href='/calender'>
              Calender
            </NavLink>
            <NavLink setIsOpen={setIsOpen} href='/profile'>
              MyProfile
            </NavLink>
          </div>
          <button
            onClick={handleClick}
            disabled={isLoading}
            className={styles.logOut}
          >
            {isLoading ? 'Loading' : 'Sign Out'}
          </button>
        </div>
      )}
    </>
  )
}
