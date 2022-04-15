import { MdOutlineAdd } from 'react-icons/md'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import Modal from '../components/modal'
import CountCardMain from '../components/countCards/countCardMain'
import CountCardDay from '../components/countCards/countCardDay'
import CountCardMonth from '../components/countCards/countCardMonth'
import CountCardHour from '../components/countCards/countCardHour'
import { useAuth } from '../contexts/authContext'
import AddTrackerModal from '../components/addTrackerModal'
import SkeletonHome from '../components/skeleton/skeletonHome'
import useTrackers from '../hooks/useTrackers'

const Home = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [orgData, setOrgData] = useState({
    below2: [],
    main: [],
    empty: true,
  })

  const [isModal, setIsModal] = useState(false)

  const { user } = useAuth()
  const { data, loading } = useTrackers(user?.uid)
  //Times
  const sec = 1000
  const min = sec * 60
  const hour = min * 60
  const day = hour * 24
  const month = day * 30.4167

  const currentTime = new Date()
  const currentYear = new Date().getFullYear()

  const handleData = async () => {
    try {
      if (!loading) {
        let isBirthday = false
        if (data?.length) {
          const newData = data.map((item) => {
            isBirthday = false
            let targetDate = new Date(currentYear, item.month, item.day)
            let difference = targetDate - currentTime
            if (difference < -day) {
              targetDate = new Date(
                parseInt(currentYear) + 1,
                item.month,
                item.day
              )
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
          const sorted = newData.sort((a, b) => a.difference - b.difference)
          setOrgData({
            below2: sorted.filter((item) => item.difference < 2 * day),
            main: sorted.filter((item) => item.difference >= 2 * day),
            empty: false,
          })
        }

        setIsLoading(false)
        console.log('Done')
      }
    } catch (error) {
      console.log('Something went wrong in fetch', error)
      setIsLoading(false)
    }
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
    handleData()
  }, [data])

  return (
    <div className='wrapper'>
      {isLoading ? (
        <SkeletonHome />
      ) : orgData.empty ? (
        <p className={styles.loading}>
          No Data Found, Please Add Some People Here
        </p>
      ) : (
        <div className={styles.flexWrapper}>
          {orgData?.below2.length > 0 && (
            <div className={styles.priority}>
              <h1 className={styles.header}>In Two Days</h1>
              <div className={styles.priorityParts}>
                {orgData?.below2?.map((item, i) =>
                  renderCards(item.difference, item)
                )}
              </div>
            </div>
          )}

          <div className={styles.priority}>
            <h1 className={styles.header}>Upcommings</h1>
            <div className={styles.priorityParts}>
              {orgData?.main?.map((item, i) =>
                renderCards(item.difference, item)
              )}
            </div>
          </div>
        </div>
      )}

      <div onClick={() => setIsModal(true)} className={styles.addBtn}>
        <MdOutlineAdd />
      </div>
      {isModal && (
        <Modal setIsModal={setIsModal}>
          <AddTrackerModal setIsModal={setIsModal} uid={user?.uid} />
        </Modal>
      )}
    </div>
  )
}

export default Home
