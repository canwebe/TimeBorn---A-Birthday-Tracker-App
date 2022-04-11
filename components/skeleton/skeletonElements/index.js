import cls from 'classnames'
import styles from './skeletonElements.module.css'

export default function SkeletonElements({ type }) {
  return <div className={cls(styles.skeleton, styles[type])}></div>
}
