import styles from './loader.module.css'
export default function Loader() {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.loader}>Loading...</div>
    </div>
  )
}
