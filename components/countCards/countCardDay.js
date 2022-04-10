import { useEffect, useState } from 'react'
import styles from './countCard.module.css'
import Link from 'next/link'

export default function CountCardDay({ person }) {
  //Times
  const sec = 1000
  const min = sec * 60
  const hour = min * 60

  const hourRemain = Math.floor(person.difference / hour)

  const [minRemain, setMinRemain] = useState(
    Math.floor((person.difference % hour) / min)
  )

  useEffect(() => {
    const close = setInterval(() => {
      const currentTime = new Date()
      const difference = person.targetDate - currentTime
      setMinRemain(Math.floor((difference % hour) / min))
    }, min)

    return () => clearInterval(close)
  }, [person])

  return (
    <Link
      href={{
        pathname: '/info',
        query: { name: person.name, day: person.day, month: person.month },
      }}
    >
      <a className={styles.pcard}>
        <span className={styles.numbers}></span>
        {/* <p
        className={styles.countDown}
      >{`${monthRemain} Month , ${dayRemain} Days left`}</p> */}
        <p className={styles.countDownP}>
          <span className={styles.numbers}>{hourRemain}</span> Hour ,{' '}
          <span className={styles.numbers}>{minRemain}</span> Minutes left
        </p>
        <p className={styles.name}>{person.name}</p>
        <p className={styles.birthday}>
          {new Date(person.targetDate).toDateString()}
        </p>
      </a>
    </Link>
  )
}
