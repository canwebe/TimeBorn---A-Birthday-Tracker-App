import SkeletonElements from '../skeletonElements'
import styles from './skeletonProfile.module.css'
import Shimmer from '../shimmer'

export default function SkeletonProfile({ user }) {
  return (
    <>
      <div className={styles.profileAvatar}>
        <SkeletonElements type='avatar' />
        <SkeletonElements type='littleText' />
        <SkeletonElements type='littleText' />
      </div>
      <div className={user ? styles.friendListSmall : styles.friendList}>
        {[1, 2, 3].map((item) => (
          <div key={item} className={styles.friendCard}>
            <SkeletonElements type='shortText' />
            <SkeletonElements type='subtext' />
            <Shimmer />
          </div>
        ))}
      </div>
    </>
  )
}
