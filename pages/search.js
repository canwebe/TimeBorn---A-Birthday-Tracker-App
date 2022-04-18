import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/authContext'
import { getAllUsers } from '../helpers/firebase'
import Image from 'next/image'
import styles from '../styles/Search.module.css'
import { motion } from 'framer-motion'

const mainVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { ease: 'easeInOut' },
  },
}

export default function Search() {
  const [data, setData] = useState([])
  const [searchString, setSearchString] = useState('')
  const [searchList, setSearchList] = useState([])
  const { user } = useAuth()

  const fetchData = async () => {
    try {
      const res = await getAllUsers(user?.uid)
      setData(res)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
    console.log('feth data')
  }, [])

  useEffect(() => {
    if (searchString.length > 3) {
      setSearchList(
        data.filter((item) =>
          item.name.toLowerCase().includes(searchString.toLowerCase())
        )
      )
    }
  }, [searchString])

  return (
    <motion.div
      className='wrapper'
      variants={mainVariant}
      initial='hidden'
      animate='visible'
    >
      <div className={styles.search}>
        <input
          type='text'
          required
          placeholder='Search Users Here'
          value={searchString}
          autoFocus
          className={styles.input}
          onChange={(e) => setSearchString(e.target.value)}
        />

        {searchString.length > 3 && searchList.length > 0 ? (
          <div className={styles.searchListWrapper}>
            {searchList.map((item, i) => (
              <Link href={`/u/${item.uid}`} key={i}>
                <a className={styles.userCard}>
                  <div className={styles.avatarImg}>
                    <Image
                      className={styles.img}
                      src={item.photoURL}
                      width='100px'
                      height='100px'
                      layout='responsive'
                      alt='avatar img'
                    />
                  </div>
                  <p className={styles.name}>{item.name}</p>
                </a>
              </Link>
            ))}
          </div>
        ) : (
          <div className={styles.searchSvg}>
            <Image
              src='/search.svg'
              width='300px'
              height='300px'
              layout='responsive'
              alt='search img'
            />
          </div>
        )}
      </div>
    </motion.div>
  )
}
