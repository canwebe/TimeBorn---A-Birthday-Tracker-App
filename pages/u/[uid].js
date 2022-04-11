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

export default function UserProfile({ userData, friendLists, userUid }) {
  // const [userData, setUserData] = useState(userDetails)
  const router = useRouter()
  const { user } = useAuth()
  const [date, setDate] = useState('')
  const [isLoading, setIsLoading] = useState('Add to Track List')

  const handleSave = async () => {
    setIsLoading('Loading')
    try {
      const slug = userData.name + userData.day + userData.month
      await saveTrackerToOwn(
        userUid,
        slug,
        userData.day,
        userData.month,
        userData.name
      )
      setIsLoading('Saved to Track List')
    } catch (error) {
      console.log(error)
      setIsLoading('Add to Track List')
    }
  }

  useEffect(() => {
    if (userData?.day) {
      setDate(userData.day + ' ' + months[parseInt(userData.month)])
    }
  }, [userData])

  useEffect(() => {
    if (user?.uid === userUid) {
      router.replace(`/profile/${userUid}`)
    }
  }, [userUid])

  return (
    <div className='wrapper'>
      {console.log(userData, friendLists)}
      {userData && (
        <div className={styles.user}>
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
        </div>
      )}
      <BackBtn />
    </div>
  )
}

export async function getServerSideProps({ query: { uid } }) {
  let userData = null
  let friendLists = []
  try {
    userData = await fetchUserData(uid)
    friendLists = await getTrackdetails(uid, true)
  } catch (error) {
    console.log(error)
  }

  return {
    props: {
      userData,
      friendLists,
      userUid: uid,
    },
  }
}
