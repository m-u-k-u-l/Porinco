import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged, signOut, updateProfile, createUserWithEmailAndPassword , sendEmailVerification} from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyATl6Fo2OY6H4FUT6fA12FwwdtjYiriaxE",
  authDomain: "poreincodb.firebaseapp.com",
  projectId: "poreincodb",
  storageBucket: "poreincodb.appspot.com",
  messagingSenderId: "306178074671",
  appId: "1:306178074671:web:a6dd5809ff8a6992e5beda",
  measurementId: "G-1BFNJ3W99Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export {
  getFirestore, 
  collection, 
  addDoc,
  db,
  auth,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification
}
