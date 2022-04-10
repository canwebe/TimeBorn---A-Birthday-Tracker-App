import { useState } from 'react'
import { addNotes } from '../../helpers/firebase'
import styles from './addNotes.module.css'

export default function AddNotes({
  slug,
  uid,
  setIsModal,
  mainNote,
  fetchNoteData,
}) {
  const [error, setIsError] = useState('')
  const [note, setNote] = useState(mainNote)
  const [isLoading, setIsLoading] = useState(false)

  const handleAdd = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await addNotes(uid, slug, note)
      await fetchNoteData()
      setIsLoading(false)
      setIsModal(false)
    } catch (error) {
      console.log('Adding notes error', error)
      setIsLoading(false)
      setIsError('Something went wrong, Try Again!')
    }
  }

  return (
    <>
      <h1 className={styles.heading}>Add Extra Notes</h1>
      {!error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleAdd} className={styles.form}>
        <textarea
          className={styles.textarea}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          name='notes'
          rows='4'
          placeholder='Eg: Need to buy cake on 25th Jan'
        />
        <button disabled={isLoading} className={styles.btn} type='submit'>
          {isLoading ? 'Loading' : 'Add Notes'}
        </button>
      </form>
    </>
  )
}
