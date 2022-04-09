import styles from './countCard.module.css'
import { useState, useEffect } from 'react'

export default function CountCardHour({ person }) {
  //Times
  const sec = 1000
  const min = sec * 60
  const hour = min * 60

  const [minRemain, setMinRemain] = useState(
    Math.floor(person.difference / min)
  )
  const [secRemain, setSecRemain] = useState(
    Math.floor((person.difference % min) / sec)
  )
  const [isBirthday, setIsBirthday] = useState(person.isBirthday)

  useEffect(() => {
    if (!isBirthday) {
      const close = setInterval(() => {
        const currentTime = new Date()
        const difference = person.targetDate - currentTime
        setSecRemain(Math.floor((difference % min) / sec))
        setMinRemain(Math.floor(difference / min))
        if (difference <= 0) {
          setIsBirthday(true)
          clearInterval(close)
        }
      }, sec)

      return () => clearInterval(close)
    }
  }, [person])

  return (
    <div className={isBirthday ? styles.cardBirthday : styles.cardHour}>
      {isBirthday ? (
        <p className={styles.wish}>Happy Birthday</p>
      ) : minRemain ? (
        <p className={styles.countDownDay}>
          <span className={styles.numbers}>{minRemain}</span> Minute ,{' '}
          <span className={styles.numbers}>{secRemain}</span> Seconds
        </p>
      ) : (
        <p className={styles.countDown}>
          OMG <span className={styles.numbers}>{secRemain}</span> Seconds Left
        </p>
      )}

      <p className={styles.name}>{person.name}</p>
      <p className={styles.birthday}>
        {new Date(person.targetDate).toDateString()}
      </p>
    </div>
  )
}
