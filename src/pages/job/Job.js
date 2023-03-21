import "./Job.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument.js";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config.js";
export default function Job() {
  const [job, setJob] = useState(null);
  const params = useParams();
  // const query = ["id", "==", params.id];
  // const { document } = useDocument("jobs", query);
  // console.log(document);
  useEffect(() => {
    const unsub = async () => {
      const jobRef = doc(db, "jobs", params.id);
      const jobSnap = await getDoc(jobRef);
      setJob(jobSnap.data().job);
    };
    return () => unsub();
  }, [params.id]);
  console.log(job);
  return (
    <div className="job-page">
      <h2>Job Page</h2>
    </div>
  );
}
