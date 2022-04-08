import Link from 'next/link'
import cls from 'classnames'
import { useRouter } from 'next/router'
import styles from './navLink.module.css'

export default function NavLink({ href, children }) {
  const router = useRouter()
  return (
    <Link href={href}>
      <a
        className={cls(
          styles.menu,
          router.pathname === href ? styles.active : ''
        )}
      >
        {children}
      </a>
    </Link>
  )
}
