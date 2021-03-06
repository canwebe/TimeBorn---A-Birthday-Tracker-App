import styles from '../../styles/User.module.css'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import {
  fetchUserData,
  getTrackdetails,
  saveTrackerToOwn,
} from '../../helpers/firebase'
import { months } from '../../data/data'
import UserFriendCard from '../../components/userFriendCard'
import { useAuth } from '../../contexts/authContext'
import { useRouter } from 'next/router'
import BackBtn from '../../components/backBtn'
import SkeletonProfile from '../../components/skeleton/skeletoonProfile'

export default function UserProfile() {
  const [userData, setUserData] = useState(null)
  const [friendLists, setFriendLists] = useState([])
  const router = useRouter()
  const userUid = router.query.uid

  const { user } = useAuth()
  const [date, setDate] = useState('')
  const [isLoading, setIsLoading] = useState('Add to Track List')

  const handleSave = async () => {
    setIsLoading('Loading')
    try {
      const slug = userData.name + userData.day + userData.month
      await saveTrackerToOwn(
        user?.uid,
        slug,
        userData.day,
        userData.month,
        userData.name
      )
      setIsLoading('Saved to Track List')
    } catch (error) {
      console.log(error)
      setIsLoading('Add him to Track')
    }
  }

  const fetchData = async () => {
    try {
      const res1 = await fetchUserData(userUid)
      const res2 = await getTrackdetails(userUid, true)
      setUserData(res1)
      setFriendLists(res2)
      if (res1?.day) {
        setDate(res1.day + ' ' + months[parseInt(res1.month)])
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (user?.uid === userUid) {
      router.replace('/profile')
    }
  }, [userUid])

  useEffect(() => {
    fetchData()
  }, [userUid])

  return (
    <div className='wrapper'>
      <div className={styles.user}>
        {userData ? (
          <>
            <div className={styles.photoWrapper}>
              <Image
                className={styles.avatarImg}
                src={userData?.photoURL}
                width='200px'
                height='200px'
                layout='responsive'
                alt='My Avatar Image'
              />
            </div>
            <p className={styles.name}>{userData.name}</p>
            {date ? (
              <>
                <p className={styles.dob}>
                  <span className={styles.dobSpan}>DOB :</span> {date}{' '}
                </p>
                <button
                  onClick={handleSave}
                  disabled={isLoading !== 'Add to Track List'}
                  className={styles.addToMineBtnBig}
                >
                  {isLoading}
                </button>
              </>
            ) : (
              <p className={styles.nodob}>No Bithdate Given</p>
            )}
            <div className={styles.friendListWrapper}>
              {friendLists.length > 0 ? (
                friendLists.map((item) => (
                  <UserFriendCard
                    key={item.slug}
                    name={item.name}
                    slug={item.slug}
                    day={item.day}
                    month={item.month}
                    uid={user?.uid}
                  />
                ))
              ) : (
                <p className={styles.noData}>No Public Data Found</p>
              )}
            </div>
          </>
        ) : (
          <SkeletonProfile user />
        )}
      </div>

      <BackBtn />
    </div>
  )
}
