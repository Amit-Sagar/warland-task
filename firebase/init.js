import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getFunctions } from 'firebase/functions'
import firebaseConfig from './config'

const firebaseApp = initializeApp(firebaseConfig, "config");
const firebaseAuth = getAuth(firebaseApp)
const firebaseDb = getFirestore(firebaseApp)
const firebaseStorage = getStorage(firebaseApp)
const firebaseFunction = getFunctions(firebaseApp)

export { firebaseApp, firebaseAuth, firebaseDb, firebaseStorage, firebaseFunction }
