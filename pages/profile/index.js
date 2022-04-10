import styles from '../../styles/Profile.module.css'
import { useAuth } from '../../contexts/authContext'
import { MdModeEdit } from 'react-icons/md'
import Image from 'next/image'
import {
  fetchUserDob,
  getTrackdetails,
  updateUserName,
  userDateEdit,
} from '../../helpers/firebase'
import { useEffect, useState } from 'react'
import { months } from '../../data/data'
import FriendCard from '../../components/friendCard'

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

  const day30 = ['1', '3', '5', '8', '10']

  const handleDate = async (e) => {
    e.preventDefault()
    setDobWait(true)
    try {
      await userDateEdit(user?.uid, day, month)
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
    try {
      const result = await fetchUserDob(user?.uid)
      if (result?.day) {
        const string = result.day + ' ' + months[parseInt(result.month)]
        setDate(string)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleNameEdit = async (e) => {
    e.preventDefault()
    setNameWait(true)
    try {
      await updateUserName(name)
      setNameWait(false)
      setName('')
      setIsName(false)
    } catch (error) {
      console.log(error)
      setNameWait(false)
    }
  }

  const fetchFriends = async () => {
    try {
      const res = await getTrackdetails(user?.uid)
      if (res.length) {
        setFrndList(res)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
    fetchFriends()
  }, [])

  return (
    <div className='wrapper'>
      <div className={styles.profile}>
        <h1 className={styles.heading}>My Profile</h1>
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

        <p className={styles.dob}>
          <span className={styles.dobSpan}>DOB :</span> {date}{' '}
          <MdModeEdit
            onClick={() => setIsDob((prev) => !prev)}
            className={styles.edit}
          />
        </p>
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
            <button disabled={dobWait} className={styles.doneBtn} type='submit'>
              {dobWait ? 'wait' : 'done'}
            </button>
          </form>
        )}
        {frndList.length > 0 && (
          <div className={styles.friendListWrapper}>
            {frndList.map((item, i) => (
              <FriendCard
                key={i}
                name={item.name}
                day={item.day}
                month={item.month}
                privacy={item?.privacy}
                slug={item?.slug}
                uid={user?.uid}
                fetchFriends={fetchFriends}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
