import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/authContext'
import { getAllUsers, getSearchResults } from '../helpers/firebase'
import Image from 'next/image'
import styles from '../styles/Search.module.css'

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
    <div className='wrapper'>
      <div className={styles.search}>
        <input
          type='text'
          required
          placeholder='Search Users Here'
          value={searchString}
          className={styles.input}
          onChange={(e) => setSearchString(e.target.value)}
        />
        {console.log(data, searchList, searchString)}
        {searchString.length > 3 && searchList.length > 0 && (
          <div className={styles.searchListWrapper}>
            {searchList.map((item) => (
              <Link href={`/u/${item.uid}`} key={item.slug}>
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
        )}
      </div>
    </div>
  )
}
