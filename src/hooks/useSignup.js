import { useState, useEffect } from "react";
import { auth, storage, db } from "../firebase/config.js";
import { collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useAuthContext } from "./useAuthContext.js";
export const useSignup = () => {
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
      const uploadRef = ref(
        storage,
        `profileImgs/${res.user.uid}/${profileImg.name}`
      );
      //get a ref for the uploaded img
      uploadBytesResumable(uploadRef, profileImg);
      //get download url for db
      const imgPath = getDownloadURL(uploadRef);
      updateProfile(auth.currentUser, {
        displayName: displayName,
        photoURL: imgPath,
      });
      //attach other categories to our user
      const usersRef = collection(db, "users");
      await addDoc(usersRef, {
        id: res.user.uid,
        profileName: displayName,
        photoURL: imgPath,
      });
      dispatch({ type: "LOGIN", payload: res.user });
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
