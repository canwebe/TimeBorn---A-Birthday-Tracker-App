import Link from 'next/link'
import styles from './countCard.module.css'

export default function CountCardMonth({ person }) {
  //Times
  const sec = 1000
  const min = sec * 60
  const hour = min * 60
  const day = hour * 24
  const month = day * 30.4167

  const dayRemain = Math.floor((person.difference % month) / day)

  return (
    <Link
      href={{
        pathname: '/info',
        query: { name: person.name, day: person.day, month: person.month },
      }}
    >
      <a className={styles.card}>
        <span className={styles.numbers}></span>
        <p className={styles.countDown}>
          <span className={styles.numbers}>{dayRemain}</span> Days to Go
        </p>
        <p className={styles.name}>{person.name}</p>
        <p className={styles.birthday}>
          {new Date(person.targetDate).toDateString()}
        </p>
      </a>
    </Link>
  )
}
