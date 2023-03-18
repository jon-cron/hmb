import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config.js";
import { useState } from "react";
import { useAuthContext } from "./useAuthContext.js";
export const useLogin = () => {
  const [error, setError] = useState(null);
  // NOTE this is how we hook into the auth context and trigger actions in the reducer
  const { dispatch } = useAuthContext();

  const login = (email, password) => {
    setError(null);
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        dispatch({ type: "LOGIN", payload: res.user });
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  return { error, login };
};
