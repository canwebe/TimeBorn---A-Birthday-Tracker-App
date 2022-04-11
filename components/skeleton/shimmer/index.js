import styles from './shimmer.module.css'
export default function Shimmer() {
  return (
    <div className={styles.shimmerWrapper}>
      <div className={styles.shimmer}></div>
    </div>
  )
}
