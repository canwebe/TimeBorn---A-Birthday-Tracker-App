import Shimmer from '../shimmer'
import SkeletonElements from '../skeletonElements'
import styles from '../skeletonElements/skeletonElements.module.css'
export default function SkeletonHome() {
  return (
    <div className={styles.body}>
      <SkeletonElements type='bigTitle' />
      {[1, 2, 3, 4].map((item) => (
        <div key={item} className={styles.card}>
          <SkeletonElements type='title' />
          <SkeletonElements type='shortText' />
          <SkeletonElements type='shortText' />
          <Shimmer />
        </div>
      ))}
    </div>
  )
}
