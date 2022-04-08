import { MdOutlineClose } from 'react-icons/Md'
import cls from 'classnames'
import styles from './modal.module.css'
import { useState } from 'react'

export default function Modal({ setIsModal }) {
  const [name, setName] = useState('')
  const [dob, setDob] = useState('')

  const handleClick = (e) => {
    if (e.target.classList.contains('backDrop')) {
      setIsModal(false)
    }
  }

  return (
    <div onClick={handleClick} className={cls('backDrop', styles.backDrop)}>
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
            onChange={() => setName(e.target.value)}
            type='text'
            name='name'
            placeholder='Enter Name'
            required
          />
          <input
            value={dob}
            className={styles.input}
            onChange={() => setDob(e.target.value)}
            type='date'
            name='dob'
            required
          />
          <button className={styles.btn} type='submit'>
            Add Details
          </button>
        </form>
      </div>
    </div>
  )
}
