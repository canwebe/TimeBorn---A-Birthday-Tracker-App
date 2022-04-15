import { collection, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../lib/firebase'

const useTrackers = (uid) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const q = collection(db, `users/${uid}/trackers`)

  useEffect(() => {
    const unsub = onSnapshot(q, (snapshot) => {
      let newData = []
      snapshot.forEach((item) => newData.push(item.data()))
      setData(newData)
      setLoading(false)
    })

    return () => unsub()
  }, [uid])

  return { data, loading }
}

export default useTrackers
