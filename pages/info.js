import { useRouter } from 'next/router'
import styles from '../styles/Info.module.css'
import { MdDelete, MdChevronLeft, MdEditNote } from 'react-icons/md'
import { useAuth } from '../contexts/authContext'
import { deleteTracker, fetchNote } from '../helpers/firebase'
import { useEffect, useState } from 'react'
import Modal from '../components/modal'
import AddNotes from '../components/addNotes'

export default function Info() {
  const router = useRouter()
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [isModal, setIsModal] = useState(false)
  const [mainNote, setMainNote] = useState('')

  const { name, day, month } = router.query
  const slug = name + day + month
  const dateString = new Date(
    new Date().getFullYear(),
    month,
    day
  ).toDateString()

  const handleDelete = async () => {
    setIsLoading(true)
    await deleteTracker(user?.uid, slug)
    router.back()
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

  useEffect(() => {
    fetchNoteData()
  }, [])

  return (
    <div className='wrapper'>
      <div className={styles.infoPage}>
        <div className={styles.infoBox}>
          <p className={styles.name}>{name}</p>
          <p className={styles.birthday}>{dateString}</p>
        </div>
        {mainNote && <p className={styles.note}>{mainNote}</p>}
        <div className={styles.btnWrapper}>
          <button
            disabled={isLoading}
            onClick={handleDelete}
            className={styles.deleteBtn}
          >
            {isLoading ? (
              'wait'
            ) : (
              <>
                <MdDelete />
                delete
              </>
            )}
          </button>
          <button
            disabled={isLoading}
            onClick={() => setIsModal(true)}
            className={styles.addBtn}
          >
            {isLoading ? (
              'wait'
            ) : (
              <>
                <MdEditNote />
                {mainNote ? 'Edit note' : 'Add note'}
              </>
            )}
          </button>
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
