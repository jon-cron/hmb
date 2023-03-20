import { db } from "../firebase/config.js";
import { useReducer, useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};
const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return { isPending: true, document: null, success: false, error: null };
    case "ADD_DOC":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    default:
      return state;
  }
};
export const useFirestore = (desiredCollection) => {
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
      // console.log(doc);
      const addedDoc = await addDoc(ref, { doc });
      console.log(addedDoc);
      dispatchIfNotCancelled({ type: "ADD_DOC", payload: addedDoc });
    } catch (error) {
      dispatchIfNotCancelled({ type: "ERROR", payload: error.message });
    }
  };
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);
  return { addDocument, response };
};
