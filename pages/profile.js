import styles from '../styles/Profile.module.css'
import { useAuth } from '../contexts/authContext'
import { MdModeEdit } from 'react-icons/md'
import Image from 'next/image'
import {
  fetchUserData,
  getTrackdetailsOrder,
  updateUserName,
  userDataEdit,
} from '../helpers/firebase'
import { useEffect, useState } from 'react'
import { months } from '../data/data'
import FriendCard from '../components/friendCard'
import SkeletonProfile from '../components/skeleton/skeletoonProfile'

export default function Profile() {
  const { user } = useAuth()
  const [day, setDay] = useState('')
  const [month, setMonth] = useState('1')
  const [name, setName] = useState('')
  const [isDob, setIsDob] = useState(false)
  const [isName, setIsName] = useState(false)
  const [dobWait, setDobWait] = useState(false)
  const [nameWait, setNameWait] = useState(false)
  const [date, setDate] = useState('')
  const [frndList, setFrndList] = useState([])
  const [filterList, setFilterList] = useState([])
  const [searchString, setSearchString] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const day30 = ['1', '3', '5', '8', '10']

  const handleDate = async (e) => {
    e.preventDefault()
    setDobWait(true)
    try {
      const payload = { day, month }
      await userDataEdit(user?.uid, payload)
      fetchData()
      setDobWait(false)
      setIsDob(false)
      setDay('')
    } catch (error) {
      console.log(error)
      setDobWait(false)
    }
  }

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const result = await fetchUserData(user?.uid)
      if (result?.day) {
        const string = result.day + ' ' + months[parseInt(result.month)]
        setDate(string)
      }
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }

  const handleNameEdit = async (e) => {
    e.preventDefault()
    setNameWait(true)
    try {
      await updateUserName(user?.uid, name)
      setNameWait(false)
      setName('')
      setIsName(false)
    } catch (error) {
      console.log(error)
      setNameWait(false)
    }
  }

  const fetchFriends = async () => {
    setIsLoading(true)
    try {
      const res = await getTrackdetailsOrder(user?.uid, 'privacy')
      if (res.length) {
        setFrndList(res)
      }
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }

  const handleSearch = (e) => {
    setSearchString(e.target.value)
    setFilterList(
      frndList.filter((item) =>
        item.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    )
  }

  useEffect(() => {
    fetchData()
    fetchFriends()
  }, [])

  return (
    <div className='wrapper'>
      <div className={styles.profile}>
        <h1 className={styles.heading}>My Profile</h1>

        {isLoading ? (
          <SkeletonProfile />
        ) : (
          <>
            <div className={styles.photoWrapper}>
              <Image
                className={styles.avatarImg}
                src={user?.photoURL}
                width='200px'
                height='200px'
                layout='responsive'
                alt='My Avatar Image'
              />
            </div>
            <p className={styles.name}>
              {user?.displayName}{' '}
              <MdModeEdit
                onClick={() => setIsName((prev) => !prev)}
                className={styles.edit}
              />
            </p>
            {isName && (
              <form onSubmit={handleNameEdit} className={styles.editDob}>
                <input
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={user?.displayName}
                  className={styles.selectDay}
                />
                <button
                  disabled={nameWait}
                  className={styles.doneBtn}
                  type='submit'
                >
                  {nameWait ? 'wait' : 'done'}
                </button>
              </form>
            )}
            {date ? (
              <p className={styles.dob}>
                <span className={styles.dobSpan}>DOB :</span> {date}{' '}
                <MdModeEdit
                  onClick={() => setIsDob((prev) => !prev)}
                  className={styles.edit}
                />
              </p>
            ) : (
              <button
                onClick={() => setIsDob((prev) => !prev)}
                className={styles.addDobBtn}
              >
                Add Your Date Of Birth
              </button>
            )}

            {isDob && (
              <form onSubmit={handleDate} className={styles.editDob}>
                <select
                  className={styles.selectDay}
                  onChange={(e) => setMonth(e.target.value)}
                  name='month'
                  required
                >
                  <option value=''>Select Month</option>
                  {months.map((item, i) => (
                    <option key={i} value={i}>
                      {item}
                    </option>
                  ))}
                </select>
                <select
                  required
                  className={styles.selectDay}
                  name='day'
                  onChange={(e) => setDay(e.target.value)}
                  value={day}
                >
                  <option value=''>Day</option>
                  {[
                    ...Array(
                      day30.includes(month) ? (month === '1' ? 29 : 30) : 31
                    ),
                  ].map((item, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
                <button
                  disabled={dobWait}
                  className={styles.doneBtn}
                  type='submit'
                >
                  {dobWait ? 'wait' : 'done'}
                </button>
              </form>
            )}
            {frndList.length > 0 && (
              <>
                <input
                  type='text'
                  placeholder='Search Here '
                  className={styles.searchbox}
                  onChange={handleSearch}
                  value={searchString}
                />

                <div className={styles.friendListWrapper}>
                  {searchString
                    ? filterList.map((item, i) => (
                        <FriendCard
                          key={item?.slug}
                          name={item.name}
                          day={item.day}
                          month={item.month}
                          privacy={item?.privacy}
                          slug={item?.slug}
                          uid={user?.uid}
                          fetchFriends={fetchFriends}
                        />
                      ))
                    : frndList.map((item, i) => (
                        <FriendCard
                          key={item?.slug}
                          name={item?.name}
                          day={item?.day}
                          month={item?.month}
                          privacy={item?.privacy}
                          slug={item?.slug}
                          uid={user?.uid}
                          fetchFriends={fetchFriends}
                        />
                      ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}

// export async function getServerSideProps(context) {
//   const uid = context.query.uid
//   let results = []
//   try {
//     const res = await getTrackdetailsOrder(uid, 'privacy')
//     if (res.length) {
//       results = res
//     }
//   } catch (error) {
//     console.log(error)
//   }
//   return {
//     props: { results },
//   }
// }
