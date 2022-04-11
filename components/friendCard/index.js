import { useState } from 'react'
import { months } from '../../data/data'
import { updatePrivacy } from '../../helpers/firebase'
import styles from './friendCard.module.css'
import { MdVisibility, MdVisibilityOff, MdArrowDropDown } from 'react-icons/md'
export default function FriendCard({
  name,
  day,
  month,
  privacy,
  slug,
  uid,
  fetchFriends,
}) {
  const [view, setView] = useState(privacy)
  const [isLoading, setIsLoading] = useState(false)

  const handleUpdate = async () => {
    setIsLoading(true)
    try {
      await updatePrivacy(uid, slug, view)
      console.log('done hogeya')
      await fetchFriends()

      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }
  return (
    <div className={styles.friendCard}>
      {console.log('Privacy', privacy, view, name)}
      <p className={styles.friendName}>{name}</p>
      <div className={styles.bottomDiv}>
        <p className={styles.friendDate}>
          {day} {months[parseInt(month)]}
        </p>
        {privacy !== view && (
          <button
            disabled={isLoading}
            onClick={handleUpdate}
            className={styles.updateBtn}
          >
            {isLoading ? 'Wait' : 'Update'}
          </button>
        )}

        <div onClick={() => setView((prev) => !prev)} className={styles.view}>
          {view ? (
            <span className={styles.private}>
              <MdVisibilityOff />
              Private
              <MdArrowDropDown className={styles.downarrow} />
            </span>
          ) : (
            <span className={styles.public}>
              <MdVisibility />
              Public
              <MdArrowDropDown className={styles.downarrow} />
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
