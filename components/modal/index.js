import { MdOutlineClose } from 'react-icons/md'
import styles from './modal.module.css'
import { useEffect } from 'react'
import { motion } from 'framer-motion'

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: {
    opacity: 0,
    transition: {
      when: 'afterChildren',
    },
  },
}

const modalVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', stiffness: 120, damping: 13, delay: 0.2 },
  },
  exit: {
    scale: 0,
    opacity: 0,
    // transition: {
    //   ease: 'easeInOut',
    //   duration: 0.2,
    // },
  },
}

export default function Modal({ setIsModal, children }) {
  useEffect(() => {
    document.querySelector('body').style.overflow = 'hidden'

    return () => (document.querySelector('body').style.overflow = 'auto')
  }, [])

  return (
    <motion.div
      variants={backdropVariants}
      initial='hidden'
      animate='visible'
      exit='exit'
      className={styles.backDrop}
    >
      <motion.div variants={modalVariants} className={styles.modal}>
        <MdOutlineClose
          onClick={() => setIsModal(false)}
          className={styles.cross}
        />
        {children}
      </motion.div>
    </motion.div>
  )
}
