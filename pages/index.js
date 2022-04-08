import { signOut } from 'firebase/auth'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { auth } from '../lib/firebase'
import { MdOutlineAdd } from 'react-icons/md'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import Modal from '../components/modal'
import { example } from '../components/modal/data'
const Home = () => {
  const router = useRouter()
  const [isModal, setIsModal] = useState(false)
  const [data, setData] = useState([])
  const [orgData, setOrgData] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const currentTime = new Date()
  const currentYear = new Date().getFullYear()

  const handelData = () => {
    setIsLoading(true)

    const newData = data.map((item) => {
      let targetDate = new Date(currentYear, item.month, item.date)
      let difference = targetDate - currentTime
      if (difference < 0) {
        targetDate = new Date(parseInt(currentYear) + 1, item.month, item.date)
        difference = targetDate - currentTime
        console.log('Negative', difference)
      }
      return {
        ...item,
        dayLeft: new Date(difference).getDate(),
        monthLeft: new Date(difference).getMonth() - 1,
        difference,
        targetDate,
      }
    })
    setIsLoading(false)
    setOrgData(newData.sort((a, b) => a.difference - b.difference))
    console.log('Done')
  }

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
          {orgData?.map((item, i) => (
            <div className={styles.flexItem} key={i}>
              <h3>{item.name}</h3>
              <p>
                {new Date(currentYear, item.month, item.date).toDateString()}
              </p>
              <p>Target Date : {new Date(item.targetDate).toDateString()}</p>
              <p>
                Day Left {item.dayLeft},Month Left {item.monthLeft + 1}
              </p>
              {/* {calTime(item.name, item.month, item.day)} */}
            </div>
          ))}
          {console.log(orgData)}
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
