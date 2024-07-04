// src/firebase/config.ts
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyApn0nASMqIP7jErDRt4CtGV6uLcyazSeQ',
  authDomain: 'paid-internship-with-firebase.firebaseapp.com',
  projectId: 'paid-internship-with-firebase',
  storageBucket: 'paid-internship-with-firebase.appspot.com',
  messagingSenderId: '832187298033',
  appId: '1:832187298033:web:1b84bfbf61b5ec2f167950',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, storage, googleProvider };
