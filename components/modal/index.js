import { MdOutlineClose } from 'react-icons/md'
import cls from 'classnames'
import styles from './modal.module.css'
import { useEffect, useState } from 'react'
import { months } from './data'
import { useAuth } from '../../contexts/authContext'
import { trackBirthday } from '../../helpers/firebase'

export default function Modal({ setIsModal, children }) {
  useEffect(() => {
    document.querySelector('body').style.overflow = 'hidden'

    return () => (document.querySelector('body').style.overflow = 'auto')
  }, [])

  return (
    <div className={styles.backDrop}>
      <div className={styles.modal}>
        <MdOutlineClose
          onClick={() => setIsModal(false)}
          className={styles.cross}
        />
        {children}
      </div>
    </div>
  )
}
