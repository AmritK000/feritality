import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDr7GOnRQRsRb4Z6-UMVhXZi0xEDjIM1Ww",
  authDomain: "frisbee-b2705.firebaseapp.com",
  projectId: "frisbee-b2705",
  storageBucket: "frisbee-b2705.appspot.com",
  messagingSenderId: "824986727294",
  appId: "1:824986727294:web:757565349cdae85a5cb92f",
  measurementId: "G-3PPMEFW0DN",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = getFirestore();
const storage = getStorage();
const auth = getAuth();

export { firebaseApp, db, storage, auth };
