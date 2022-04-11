import Link from 'next/link'
import { useState } from 'react'
import { useAuth } from '../contexts/authContext'
import { getSearchResults } from '../helpers/firebase'
import styles from '../styles/Search.module.css'

export default function Search() {
  const [searchString, setSearchString] = useState('')
  const [searchList, setSearchList] = useState([])
  const { user } = useAuth()
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await getSearchResults(searchString, user?.uid)
      if (res?.length) {
        setSearchList(res)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='wrapper'>
      <div className={styles.search}>
        <h1>Search Karo</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type='text'
            required
            placeholder='Search Users Here'
            value={searchString}
            className={styles.input}
            onChange={(e) => setSearchString(e.target.value)}
          />
          <button type='submit'>Search</button>
        </form>
        {searchList.length > 0 &&
          searchList.map((item) => (
            <Link href={`/u/${item.uid}`} key={item.slug}>
              <a>{item.name}</a>
            </Link>
          ))}
      </div>
    </div>
  )
}
