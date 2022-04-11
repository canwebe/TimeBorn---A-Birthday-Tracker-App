import { MdChevronLeft } from 'react-icons/md'
import { useRouter } from 'next/router'
import styles from './backBtn.module.css'

export default function BackBtn() {
  const router = useRouter()
  return (
    <div onClick={() => router.back()} className={styles.backBtn}>
      <MdChevronLeft /> Back
    </div>
  )
}
