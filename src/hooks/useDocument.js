import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config.js";

export const useDocument = (c, id) => {
  const [document, setDocument] = useState(null);

  useEffect(() => {
    const unsub = async () => {
      const jobRef = doc(db, c, id);
      const jobSnap = await getDoc(jobRef);
      setDocument(jobSnap.data().job);
    };
    return () => unsub();
  }, [c, id]);
  return { document };
};
