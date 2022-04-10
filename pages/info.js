import { useRouter } from 'next/router'
import styles from '../styles/Info.module.css'
import {
  MdDelete,
  MdChevronLeft,
  MdEditNote,
  MdHourglassFull,
  MdCelebration,
} from 'react-icons/md'
import uniqueRandom from 'unique-random'
import { useAuth } from '../contexts/authContext'
import { deleteTracker, fetchNote, fetchWishes } from '../helpers/firebase'
import { useEffect, useState } from 'react'
import Modal from '../components/modal'
import AddNotes from '../components/addNotes'

export default function Info({ result }) {
  const router = useRouter()
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [isModal, setIsModal] = useState(false)
  const [mainNote, setMainNote] = useState('')
  const [wishList, setWishList] = useState(result)
  const [wish, setWish] = useState('')
  const [tag, setTag] = useState('')

  const random = uniqueRandom(0, wishList.length - 1)
  const { name, day, month } = router.query
  const slug = name + day + month
  const dateString = new Date(
    new Date().getFullYear(),
    month,
    day
  ).toDateString()

  const handleDelete = async () => {
    setIsLoading(true)
    try {
      await deleteTracker(user?.uid, slug)
      router.back()
    } catch (error) {
      setIsLoading(false)
    }
  }

  const fetchNoteData = async () => {
    try {
      const noteData = await fetchNote(user?.uid, slug)
      if (noteData) {
        setMainNote(noteData)
      }
    } catch (error) {
      console.log('Fetch note error', error)
    }
  }

  const handleShuffle = () => {
    // const no = Math.floor(Math.random() * wishList.length)
    const no = random()
    console.log(no)
    setWish(wishList[no].wishe)
  }

  const handleTag = async (e) => {
    setTag(e.target.value)
    if (e.target.value) {
      const res = await fetchWishes(e.target.value)
      if (res.length) {
        setWishList(res)
      }
    } else {
      setWishList(result)
    }
  }

  const handleWish = async () => {
    const shareData = {
      title: 'Happy Birthday ' + name,
      text: wish,
    }
    if (navigator.canShare(shareData)) {
      navigator.share(shareData)
    } else {
      alert('Not shareable')
    }
  }

  useEffect(() => {
    fetchNoteData()
  }, [])

  useEffect(() => {
    handleShuffle()
  }, [wishList])

  return (
    <div className='wrapper'>
      <div className={styles.infoPage}>
        <div className={styles.infoBox}>
          {isLoading ? (
            <MdHourglassFull className={styles.deleteWait} />
          ) : (
            <MdDelete onClick={handleDelete} className={styles.delete} />
          )}
          <p className={styles.name}>{name}</p>
          <p className={styles.birthday}>{dateString}</p>
        </div>
        {mainNote && <p className={styles.note}>{mainNote}</p>}
        <div className={styles.btnWrapper}>
          <button
            disabled={isLoading}
            onClick={() => setIsModal(true)}
            className={styles.addBtn}
          >
            <MdEditNote />
            {mainNote ? 'Edit note' : 'Add note'}
          </button>
          <button className={styles.planBtn}>
            <MdCelebration />
            Plan a Party
          </button>
        </div>
        <div className={styles.wishesWrapper}>
          <h1>Birthday Wishes</h1>
          <div className={styles.wishes}>
            {console.log('props,', wishList, wish, tag)}
            <p className={styles.wishesPara}>{wish}</p>
          </div>
          <div className={styles.wishBtnWrapper}>
            <select
              onChange={handleTag}
              className={styles.select}
              value={tag}
              name='tag'
            >
              <option value=''>All</option>
              <option value='inspire'>Inspire</option>
              <option value='funny'>Funny</option>
              <option value='cute'>Cute</option>
              <option value='ddsb'>ddsbs</option>
            </select>
            <button onClick={handleShuffle} className={styles.shuffleBtn}>
              Shuffle
            </button>
            <button onClick={handleWish} className={styles.wishBtn}>
              Wish Now
            </button>
          </div>
        </div>
      </div>
      <div onClick={() => router.back()} className={styles.backBtn}>
        <MdChevronLeft /> Back
      </div>
      {isModal && (
        <Modal setIsModal={setIsModal}>
          <AddNotes
            slug={slug}
            uid={user?.uid}
            setIsModal={setIsModal}
            mainNote={mainNote}
            fetchNoteData={fetchNoteData}
          />
        </Modal>
      )}
    </div>
  )
}

export async function getStaticProps() {
  let result = []
  try {
    result = await fetchWishes()
  } catch (error) {
    console.log(error)
  }
  console.log('server', result)
  return {
    props: { result },
  }
}
