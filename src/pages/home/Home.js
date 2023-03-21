import "./Home.css";
import React from "react";
import { useAuthContext } from "../../hooks/useAuthContext.js";
import { useCollection } from "../../hooks/useCollection.js";
import JobsList from "../../components/jobsList/JobsList.js";
export default function Home() {
  const { documents } = useCollection("jobs");
  const { user } = useAuthContext();
  console.log(documents);
  return (
    <div className="container">
      <div>{documents && <JobsList jobs={documents} />}</div>
    </div>
  );
}
