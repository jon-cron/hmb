import "./JobsList.css";

import React from "react";
import { Link } from "react-router-dom";

export default function JobsList({ jobs }) {
  return (
    <div className="jobs-list">
      {jobs.map((j) => (
        <Link to={`/jobs/${j.id}`} key={j.id} className="job-card">
          <div className="top-div">
            <h4>{j.title}</h4>
            <span>
              <h6>Creator: </h6>
              <img src={j.creator.photoURL} title={j.creator.displayName} />
            </span>
          </div>
          <div className="bottom-div">
            <h5>Estimated hours: {j.hours}</h5>
            <h5>Workers Needed: {j.totalWorkers}</h5>
          </div>
        </Link>
      ))}
    </div>
  );
}
