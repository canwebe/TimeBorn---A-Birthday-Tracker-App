import { useRouter } from 'next/router'
import styles from '../styles/Info.module.css'
import {
  MdDelete,
  MdEditNote,
  MdHourglassFull,
  MdCelebration,
  MdVolumeUp,
  MdVolumeOff,
} from 'react-icons/md'
import uniqueRandom from 'unique-random'
import { useAuth } from '../contexts/authContext'
import { deleteTracker, fetchNote, fetchWishes } from '../helpers/firebase'
import { useEffect, useRef, useState } from 'react'
import Modal from '../components/modal'
import AddNotes from '../components/addNotes'
import BackBtn from '../components/backBtn'
import { gifts } from '../data/data'
import Image from 'next/image'

export default function Info({ result }) {
  const router = useRouter()
  const { user } = useAuth()
  const { name, day, month, btune } = router.query

  const [isLoading, setIsLoading] = useState(false)
  const [isModal, setIsModal] = useState(false)
  const [mainNote, setMainNote] = useState('')
  const [wishList, setWishList] = useState(result)
  const [wish, setWish] = useState('')
  const [tag, setTag] = useState('')
  const [isBtnLoading, setIsBtnLoading] = useState(false)
  const [audio, setAudio] = useState(btune)

  const audioRef = useRef(null)

  const random = uniqueRandom(0, wishList.length - 1)

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

  const handleShuffle = async () => {
    setIsBtnLoading(true)
    const no = random()
    setWish(wishList[no].wishe)
    setIsBtnLoading(false)
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
      text: wish + '\n\nTo ' + name + '\n',
      url: 'https://timeborn.vercel.app',
    }
    if (navigator.canShare(shareData)) {
      navigator.share(shareData)
    } else {
      alert('Not shareable')
    }
  }

  const handlePlan = async () => {
    const shareData = {
      title: 'Plan Birthday Event',
      text:
        'Hey this year lets suprise ' +
        name +
        ' by organizing a birthday event on ' +
        dateString +
        '.',
      url: 'https://timeborn.vercel.app',
    }
    if (navigator.canShare(shareData)) {
      navigator.share(shareData)
    } else {
      alert('Not shareable')
    }
  }

  const handlePlay = () => {
    setAudio((prev) => !prev)
  }

  useEffect(() => {
    fetchNoteData()
  }, [])

  useEffect(() => {
    handleShuffle()
  }, [wishList])

  useEffect(() => {
    if (btune) {
      if (audio) {
        audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
    }
  }, [audio])

  return (
    <div className='wrapper'>
      <div className={styles.infoPage}>
        <div className={styles.infoBox}>
          {isLoading ? (
            <MdHourglassFull className={styles.deleteWait} />
          ) : (
            <MdDelete onClick={handleDelete} className={styles.delete} />
          )}
          {btune &&
            (audio ? (
              <MdVolumeUp onClick={handlePlay} className={styles.sound} />
            ) : (
              <MdVolumeOff onClick={handlePlay} className={styles.nosound} />
            ))}

          <p className={styles.name}>{name}</p>
          <p className={styles.birthday}>{dateString}</p>
        </div>
        {btune && (
          <audio
            controls
            loop
            className={styles.audio}
            src='audio.mp3'
            ref={audioRef}
          />
        )}

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
          <button onClick={handlePlan} className={styles.planBtn}>
            <MdCelebration />
            Plan a Party
          </button>
        </div>
        <div className={styles.wishesWrapper}>
          <h1>Birthday Wishes</h1>
          <div className={styles.wishes}>
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
              <option value='cool'>Cool</option>
            </select>
            <button
              onClick={handleShuffle}
              disabled={isBtnLoading}
              className={styles.shuffleBtn}
            >
              {isBtnLoading ? 'Loading' : 'Shuffle'}
            </button>
            <button onClick={handleWish} className={styles.wishBtn}>
              Wish Now
            </button>
          </div>
        </div>
        <h1>Suggested Gift Items</h1>
        <div className={styles.giftWrapper}>
          {gifts.map((item, i) => (
            <a
              href={item.link}
              target='_blank'
              rel='noreferrer'
              key={i}
              className={styles.giftCard}
            >
              <div className={styles.image}>
                <Image
                  className={styles.img}
                  src={item.photo}
                  width='100px'
                  height='100px'
                  layout='responsive'
                  alt='Gift Name'
                />
              </div>
              <p className={styles.giftName}>{item.name}</p>
            </a>
          ))}
        </div>
        <a
          href='https://www.amazon.com/Best-Gifts/s?k=Best+Gifts'
          className={styles.recomendation}
          target='_blank'
          rel='noreferrer'
        >
          For more Gift Recomendation
        </a>
      </div>
      <BackBtn />
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

  return {
    props: { result },
  }
}
