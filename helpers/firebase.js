import { updateProfile } from 'firebase/auth'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore'
import { auth, db } from '../lib/firebase'

export const trackBirthday = async (uid, name, day, month, privacy = true) => {
  await addDoc(collection(db, `users/${uid}/trackers`), {
    name,
    day,
    month,
    slug: name + day + month,
    privacy,
  })
}

export const getTrackdetails = async (uid, privacy) => {
  let q = collection(db, `users/${uid}/trackers`)
  if (privacy) {
    q = query(q, where('privacy', '==', false))
  }
  const snapshot = await getDocs(q)
  if (!snapshot.empty) {
    return snapshot.docs.map((item) => item.data())
  }
}

export const getTrackdetailsOrder = async (uid, order) => {
  const q = query(collection(db, `users/${uid}/trackers`), orderBy(order))
  const snapshot = await getDocs(q)
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

export const fetchWishes = async () => {
  const res = await getDocs(collection(db, 'birthdayWishes'))

  if (!res.empty) {
    return res.docs.map((item) => item.data())
  }
}

export const userDataEdit = async (uid, payload) => {
  const ref = doc(db, 'users', uid)

  await setDoc(ref, payload, { merge: true })
}

export const checkNewUser = async (uid) => {
  const q = query(collection(db, 'users'), where('uid', '==', uid))
  const res = await getDocs(q)
  return res.empty
}

export const fetchUserData = async (uid) => {
  const ref = doc(db, 'users', uid)
  const res = await getDoc(ref)
  if (res.exists) {
    return res.data()
  }
}

export const updateUserName = async (uid, name) => {
  await updateProfile(auth.currentUser, {
    displayName: name,
  })
  await userDataEdit(uid, { name })
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

export const saveTrackerToOwn = async (uid, slug, day, month, name) => {
  const q = query(
    collection(db, `users/${uid}/trackers`),
    where('slug', '==', slug)
  )
  const snapshot = await getDocs(q)
  if (snapshot.empty) {
    await trackBirthday(uid, name, day, month)
  }
}

export const getSearchResults = async (name, uid) => {
  const q = query(
    collection(db, 'users'),
    where('nameLower', '==', name),
    where('uid', '!=', uid)
  )
  const snapshot = await getDocs(q)
  if (!snapshot.empty) {
    return snapshot.docs.map((item) => item.data())
  }
}

export const getAllUsers = async (uid) => {
  const q = query(collection(db, 'users'), where('uid', '!=', uid))
  const snapshot = await getDocs(q)
  if (!snapshot.empty) {
    return snapshot.docs.map((item) => item.data())
  } else {
    return []
  }
}
