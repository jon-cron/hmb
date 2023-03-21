import "./Job.css";
import React from "react";
import { useParams } from "react-router-dom";
import { useCollection } from "../../hooks/useCollection.js";
export default function Job() {
  const params = useParams();
  const query = ["id", "==", params.id];
  const { documents } = useCollection("jobs", query);
  console.log(params.id);
  return (
    <div className="job-page">
      <h2>Job Page</h2>
    </div>
  );
}
