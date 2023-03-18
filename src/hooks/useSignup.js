import { useState, useEffect } from "react";
import { auth, storage, db } from "../firebase/config.js";
import { collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuthContext } from "./useAuthContext.js";
const useSignup = () => {
  const [error, setError] = useState(null);
  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName, profileImg) => {
    setError(null);
    setIsPending(true);
    try {
      //create user
      const res = await createUserWithEmailAndPassword(auth, email, password);
      //check for the user
      if (!res) {
        throw new Error("Could not register");
      }
      //make storage upload path for image
      const uploadPath = `profileImgs/${res.user.uid}/${profileImg.name}`;
      //get a ref for the uploaded img
      const img = await storage.ref(uploadPath).put(profileImg);
      //get download url for db
      const imgUrl = await img.ref.getDownloadURL();
      //attach other categories to our user
      await res.user.updateProfile({ displayName, photoURL: imgUrl });
      const usersRef = collection(db, "users");
      const userInfo = await addDoc(usersRef, {
        id: res.user.uid,
        displayName,
        photoURL: imgUrl,
      });
      dispatch({ type: "LOGIN", payload: userInfo });
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
      }
    }
  };
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);
  return { signup, error, isPending };
};
