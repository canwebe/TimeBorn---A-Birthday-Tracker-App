import { signOut } from 'firebase/auth'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { MdOutlineAdd } from 'react-icons/md'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import Modal from '../components/modal'
import { example } from '../components/modal/data'
import CountCardMain from '../components/countCards/countCardMain'
import CountCardDay from '../components/countCards/countCardDay'
import CountCardMonth from '../components/countCards/countCardMonth'
import CountCardHour from '../components/countCards/countCardHour'

const Home = () => {
  const router = useRouter()
  const [isModal, setIsModal] = useState(false)
  const [data, setData] = useState([])
  const [orgData, setOrgData] = useState()
  const [isLoading, setIsLoading] = useState(false)

  //Times
  const sec = 1000
  const min = sec * 60
  const hour = min * 60
  const day = hour * 24
  const month = day * 30.4167

  const currentTime = new Date()
  const currentYear = new Date().getFullYear()

  const handelData = () => {
    setIsLoading(true)
    let isBirthday = false
    const newData = data.map((item) => {
      let targetDate = new Date(currentYear, item.month, item.date)
      let difference = targetDate - currentTime
      if (difference < -day) {
        targetDate = new Date(parseInt(currentYear) + 1, item.month, item.date)
        difference = targetDate - currentTime
      } else if (difference <= 0) {
        isBirthday = true
      }
      return {
        ...item,
        difference,
        isBirthday,
        targetDate,
      }
    })
    setIsLoading(false)
    const sorted = newData.sort((a, b) => a.difference - b.difference)
    setOrgData({
      below2: sorted.filter((item) => item.difference < 2 * day),
      main: sorted.filter((item) => item.difference >= 2 * day),
    })
    console.log('Done')
  }

  const renderCards = (difference, item) => {
    if (difference < hour) {
      return <CountCardHour person={item} key={item.name} />
    } else if (difference < day) {
      return <CountCardDay person={item} key={item.name} />
    } else if (difference < 2 * day) {
      return <CountCardMonth prior={true} person={item} key={item.name} />
    } else if (difference < month) {
      return <CountCardMonth prior={false} person={item} key={item.name} />
    } else {
      return <CountCardMain person={item} key={item.name} />
    }
  }

  // Side Effect
  useEffect(() => {
    setData(example)
    if (data) {
      handelData()
    }
  }, [data])

  return (
    <>
      {isLoading ? (
        <p>Loading..</p>
      ) : (
        <div className={styles.flexWrapper}>
          <div className={styles.priority}>
            <h1 className={styles.header}>Recents</h1>
            <div className={styles.priorityParts}>
              {orgData?.below2?.map((item, i) =>
                // <CountCardMain person={item} key={i} />
                renderCards(item.difference, item)
              )}
            </div>
          </div>
          <div className={styles.priority}>
            <h1 className={styles.header}>Upcommings</h1>
            <div className={styles.priorityParts}>
              {orgData?.main?.map((item, i) =>
                // <CountCardMain person={item} key={i} />
                renderCards(item.difference, item)
              )}
            </div>
          </div>
        </div>
      )}

      <div onClick={() => setIsModal(true)} className={styles.addBtn}>
        <MdOutlineAdd />
      </div>
      {isModal && <Modal setIsModal={setIsModal} />}
    </>
  )
}

export default Home
