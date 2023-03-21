import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config.js";

export const useDocument = (c, id) => {
  const [document, setDocument] = useState(null);

  useEffect(() => {
    // NOTE here is a good example of how to get a snapshot of a single doc using Firebase 9
    const unsub = async () => {
      const jobRef = doc(db, c, id);
      const unsub = onSnapshot(jobRef, (snapshot) => {
        setDocument(snapshot.data());
      });
    };
    return () => unsub();
  }, [c, id]);
  return { document };
};
