import { signOut } from 'firebase/auth'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { auth } from '../lib/firebase'
import { MdOutlineAdd } from 'react-icons/md'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import Modal from '../components/modal'

const Home = () => {
  const router = useRouter()
  const [isModal, setIsModal] = useState(false)
  return (
    <>
      <h1>Home</h1>
      <div onClick={() => setIsModal(true)} className={styles.addBtn}>
        <MdOutlineAdd />
      </div>
      {isModal && <Modal setIsModal={setIsModal} />}
    </>
  )
}

export default Home
