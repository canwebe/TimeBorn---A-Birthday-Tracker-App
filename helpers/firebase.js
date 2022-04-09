import {
  addDoc,
  collection,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore'
import { db } from '../lib/firebase'

export const trackBirthday = async (uid, name, day, month) => {
  await addDoc(collection(db, `users/${uid}/trackers`), {
    name,
    day,
    month,
    slug: name + day + month,
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

export const deleteTracker = async (uid, slug) => {
  const q = query(
    collection(db, `users/${uid}/trackers`),
    where('slug', '==', slug)
  )
  const snapshot = await getDocs(q)
  await deleteDoc(snapshot.docs[0].ref)
}
