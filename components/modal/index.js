import { MdOutlineClose } from 'react-icons/md'
import styles from './modal.module.css'
import { useEffect } from 'react'

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
