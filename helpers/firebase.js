import { addDoc, collection, getDocs } from 'firebase/firestore'
import { db } from '../lib/firebase'

export const trackBirthday = async (uid, name, day, month) => {
  await addDoc(collection(db, `users/${uid}/trackers`), {
    name,
    day,
    month,
  })
}

export const getTrackdetails = async (uid) => {
  const snapshot = await getDocs(collection(db, `users/${uid}/trackers`))
  if (!snapshot.empty) {
    return snapshot.docs.map((item) => item.data())
  } else {
    return []
  }
}
