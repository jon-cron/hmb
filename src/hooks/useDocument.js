import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config.js";

export const useDocument = (c, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ref = doc(db, c, id);
    const unsub = onSnapshot(
      ref,
      (snapshot) => {
        if (!snapshot.empty) {
          setDocument({ ...snapshot.docs, id: snapshot.id });
          setError(null);
        } else {
          setError("No document by that id");
        }
      },
      (error) => {
        console.log(error.message);
        setError("Failed to get doc");
      }
    );
    return () => unsub();
  }, [c, id]);
  return { document, error };
};
