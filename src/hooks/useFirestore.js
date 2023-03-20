import { db } from "../firebase/config.js";
import { useReducer, useEffect, useState } from "react";
import { addDoc, collection, doc, Timestamp } from "firebase/firestore";
import { useAuthContext } from "./useAuthContext.js";
import { async } from "@firebase/util";
let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};
const firestoreReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
export const useFirestore = (desiredCollection) => {
  const { user } = useAuthContext();
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  const ref = collection(db, desiredCollection);
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };
  const addDocument = async (doc) => {
    dispatch({ type: "IS_PENDING" });
    try {
      const createdAt = Timestamp(new Date().toLocaleDateString());
      const addedDoc = await addDoc(ref, {
        ...doc,
        createdAt,
        offers: [],
        creator: user,
      });
      dispatchIfNotCancelled({ type: "ADD_DOC", payload: addedDoc });
    } catch (error) {
      dispatchIfNotCancelled({ type: "ERROR", payload: error.message });
    }
  };
};
