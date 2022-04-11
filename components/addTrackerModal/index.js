import { useState } from 'react'
import { trackBirthday } from '../../helpers/firebase'
import { months } from '../../data/data'
import styles from './addTrackerModal.module.css'

export default function AddTrackerModal({ setIsModal, uid, handleData }) {
  const [name, setName] = useState('')
  const [day, setDay] = useState('')
  const [month, setMonth] = useState('1')
  const [privacy, setPrivacy] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // const { user } = useAuth()

  const day30 = ['1', '3', '5', '8', '10']

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await trackBirthday(uid, name, day, month, privacy)
      setName('')
      setDay('')
      setMonth('1')
      setIsLoading(false)
      handleData()
      setIsModal(false)
    } catch (error) {
      console.log(error)
      setName('')
      setDay('')
      setMonth('1')
      setError('Something went wrong, Try Again!')
      setIsLoading(false)
    }
  }

  return (
    <>
      <h1 className={styles.heading}>Add Your Friend</h1>
      {!error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          className={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          type='text'
          autoFocus
          name='name'
          placeholder='Enter Name'
          required
          autoComplete='false'
        />
        {/* <input
            value={dob}
            className={styles.input}
            onChange={(e) => setDob(e.target.value)}
            type='date'
            name='dob'
            required
          /> */}

        <div className={styles.selectDiv}>
          <select
            className={styles.selectMonth}
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
              ...Array(day30.includes(month) ? (month === '1' ? 29 : 30) : 31),
            ].map((item, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.btnWrapper}>
          <span className={styles.toggleBtn}>
            <label className={styles.switch}>
              <input
                className={styles.checkbox}
                type='checkbox'
                checked={privacy}
                onChange={() => setPrivacy((prev) => !prev)}
              />
              <span className={styles.slider} />
            </label>

            {privacy ? (
              <span className={styles.private}>private</span>
            ) : (
              <span className={styles.public}>public</span>
            )}
          </span>
          {console.log(privacy)}
          <button disabled={isLoading} className={styles.btn} type='submit'>
            {isLoading ? 'Loading' : 'Add Details'}
          </button>
        </div>
      </form>
    </>
  )
}
