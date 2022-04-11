import { useState } from 'react'
import { months } from '../../data/data'
import { saveTrackerToOwn } from '../../helpers/firebase'
import styles from './userFriendCard.module.css'

export default function UserFriendCard({ name, day, month, slug, uid }) {
  const [isLoading, setIsLoading] = useState('Save This')
  const handleSave = async () => {
    setIsLoading('wait')
    try {
      await saveTrackerToOwn(uid, slug, day, month, name)
      setIsLoading('done')
    } catch (error) {
      console.log(error)
      setIsLoading('Save This')
    }
  }
  return (
    <div className={styles.card}>
      <p className={styles.name}>{name}</p>
      <div className={styles.bottomDiv}>
        <p className={styles.date}>
          {day} {months[parseInt(month)]}
        </p>

        <button
          disabled={isLoading !== 'Save This'}
          onClick={handleSave}
          className={styles.saveBtn}
        >
          {isLoading}
        </button>
      </div>
    </div>
  )
}
