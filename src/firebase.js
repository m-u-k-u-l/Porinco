import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

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
export const db = getFirestore(app);
export const auth = getAuth(app);


