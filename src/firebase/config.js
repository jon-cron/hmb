import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyALKcqOi9swexcIOFxOiV5BkzFiD2FXZGQ",
  authDomain: "hmb1-14b31.firebaseapp.com",
  projectId: "hmb1-14b31",
  storageBucket: "hmb1-14b31.appspot.com",
  messagingSenderId: "49270632310",
  appId: "1:49270632310:web:ba59745a10f23e30fc5457",
};

const app = initializeApp(firebaseConfig);
// NOTE i set the initializeApp to a var because that is what the documentation did. Remove if this causes auth to fail
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
export { db, auth, storage };
