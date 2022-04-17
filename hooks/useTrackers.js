import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAt,
  where,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../lib/firebase'

const useTrackers = (uid) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const today = new Date().getMonth().toString() + new Date().getDate()

  const q = query(
    collection(db, `users/${uid}/trackers`),
    orderBy('month'),
    orderBy('day')
  )

  useEffect(() => {
    const unsub = onSnapshot(q, (snapshot) => {
      let newData = []
      if (!snapshot.empty) {
        snapshot.forEach((item) => newData.push(item.data()))
        setData(newData)
      }

      setLoading(false)
    })

    return () => unsub()
  }, [uid])
  console.log(data)
  return { data, loading }
}

export default useTrackers
