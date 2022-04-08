import { MdOutlineClose } from 'react-icons/md'
import cls from 'classnames'
import styles from './modal.module.css'
import { useState } from 'react'
import { months } from './data'

export default function Modal({ setIsModal }) {
  const [name, setName] = useState('')
  const [day, setDay] = useState('0')
  const [month, setMonth] = useState('1')
  const [dob, setDob] = useState(new Date())

  const day30 = ['1', '3', '5', '8', '10']

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(name, day, month)
  }

  return (
    <div className={styles.backDrop}>
      <div className={styles.modal}>
        <MdOutlineClose
          onClick={() => setIsModal(false)}
          className={styles.cross}
        />
        <h1 className={styles.heading}>Add Your Friend</h1>
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
              <option value='0'>Day</option>
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
          </div>
          <button className={styles.btn} type='submit'>
            Add Details
          </button>
        </form>
      </div>
    </div>
  )
}
