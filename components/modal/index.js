import { MdOutlineClose } from 'react-icons/md'
import cls from 'classnames'
import styles from './modal.module.css'
import { useState } from 'react'
import { months } from './data'

export default function Modal({ setIsModal }) {
  const [name, setName] = useState('')
  const [day, setDay] = useState(1)
  const [month, setMonth] = useState(1)
  const [dob, setDob] = useState(new Date())

  const day30 = ['2', '4', '6', '9', '11']

  return (
    <div className={styles.backDrop}>
      <div className={styles.modal}>
        <MdOutlineClose
          onClick={() => setIsModal(false)}
          className={styles.cross}
        />
        <h1 className={styles.heading}>Add Your Friend</h1>
        <form className={styles.form}>
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
          <select onChange={(e) => setMonth(e.target.value)} name='month'>
            {months.map((item, i) => (
              <option key={i} value={i}>
                {item}
              </option>
            ))}
          </select>
          <select
            name='day'
            onChange={(e) => setDay(e.target.value)}
            value={day}
          >
            {[
              ...Array(day30.includes(month) ? (month === '2' ? 29 : 30) : 31),
            ].map((item, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>

          <button className={styles.btn} type='submit'>
            Add Details
          </button>
        </form>
        <p>{JSON.stringify(dob)}</p>
      </div>
    </div>
  )
}
