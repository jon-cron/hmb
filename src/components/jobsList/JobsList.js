import "./JobsList.css";

import React from "react";
import { Link } from "react-router-dom";

export default function JobsList({ jobs }) {
  return (
    <div className="jobs-list">
      {jobs.map((j) => (
        <Link to={`/jobs/${j.id}`} key={j.id} className="job-card">
          {j.title}
        </Link>
      ))}
    </div>
  );
}
