import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyALKcqOi9swexcIOFxOiV5BkzFiD2FXZGQ",
  authDomain: "hmb1-14b31.firebaseapp.com",
  projectId: "hmb1-14b31",
  storageBucket: "hmb1-14b31.appspot.com",
  messagingSenderId: "49270632310",
  appId: "1:49270632310:web:ba59745a10f23e30fc5457",
};

initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();

export { db, auth };
