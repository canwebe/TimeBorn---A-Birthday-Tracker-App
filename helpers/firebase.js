import { updateProfile } from 'firebase/auth'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore'
import { auth, db } from '../lib/firebase'

export const trackBirthday = async (uid, name, day, month) => {
  await addDoc(collection(db, `users/${uid}/trackers`), {
    name,
    day,
    month,
    slug: name + day + month,
    privacy: false,
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

export const addNotes = async (uid, slug, note) => {
  const q = query(
    collection(db, `users/${uid}/trackers`),
    where('slug', '==', slug)
  )
  const snapshot = await getDocs(q)

  if (!snapshot.empty) {
    await updateDoc(snapshot.docs[0].ref, {
      note,
    })
  }
}

export const fetchNote = async (uid, slug) => {
  const q = query(
    collection(db, `users/${uid}/trackers`),
    where('slug', '==', slug)
  )
  const snapshot = await getDocs(q)
  if (!snapshot.empty) {
    return snapshot.docs[0].data()?.note
  } else {
    return ''
  }
}

export const fetchWishes = async (tag) => {
  let res
  if (tag) {
    const q = query(collection(db, 'birthdayWishes'), where('tag', '==', tag))
    res = await getDocs(q)
  } else {
    res = await getDocs(collection(db, 'birthdayWishes'))
  }

  if (!res.empty) {
    return res.docs.map((item) => item.data())
  } else {
    return []
  }
}

export const userDateEdit = async (uid, day, month) => {
  const ref = doc(db, 'users', uid)
  console.log(ref)
  await setDoc(
    ref,
    {
      day,
      month,
    },

    { merge: true }
  )
}

export const fetchUserDob = async (uid) => {
  const ref = doc(db, 'users', uid)
  const res = await getDoc(ref)
  if (res.exists) {
    return res.data()
  }
}

export const updateUserName = async (name) => {
  await updateProfile(auth.currentUser, {
    displayName: name,
  })
}

export const updatePrivacy = async (uid, slug, privacy) => {
  const q = query(
    collection(db, `users/${uid}/trackers`),
    where('slug', '==', slug)
  )
  const snapshot = await getDocs(q)
  if (!snapshot.empty) {
    await updateDoc(snapshot.docs[0].ref, {
      privacy,
    })
  }
}
