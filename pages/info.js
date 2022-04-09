import { useRouter } from 'next/router'
import styles from '../styles/Info.module.css'
import { MdDelete, MdChevronLeft } from 'react-icons/md'
import { useAuth } from '../contexts/authContext'
import { deleteTracker } from '../helpers/firebase'
import { useState } from 'react'
export default function Info() {
  const router = useRouter()
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const { name, day, month } = router.query
  const slug = name + day + month
  const dateString = new Date(
    new Date().getFullYear(),
    month,
    day
  ).toDateString()

  const handleDelete = async () => {
    setIsLoading(true)
    await deleteTracker(user?.uid, slug)
    router.back()
  }
  return (
    <div className='wrapper'>
      <div className={styles.infoPage}>
        <div className={styles.infoBox}>
          <p className={styles.name}>{name}</p>
          <p className={styles.birthday}>{dateString}</p>
        </div>
        <button
          disabled={isLoading}
          onClick={handleDelete}
          className={styles.deleteBtn}
        >
          {isLoading ? (
            'wait'
          ) : (
            <>
              <MdDelete />
              delete
            </>
          )}
        </button>
      </div>
      <div onClick={() => router.back()} className={styles.backBtn}>
        <MdChevronLeft /> Back
      </div>
    </div>
  )
}
