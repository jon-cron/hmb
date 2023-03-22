import "./Home.css";
import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext.js";
import { useCollection } from "../../hooks/useCollection.js";
import JobsList from "../../components/jobsList/JobsList.js";
import FilterBy from "./FilterBy.js";
export default function Home() {
  const { documents } = useCollection("jobs");
  const { user } = useAuthContext();
  const [currentFilter, setCurrentFilter] = useState("all");
  console.log(documents);
  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter);
  };
  const jobs = documents
    ? documents.filter((document) => {
        switch (currentFilter) {
          case "all":
            return true;
          case "my posts":
            let mine = false;
            if (document.creator.id === user.uid) {
              mine = true;
            }
            return mine;
          default:
            return true;
        }
      })
    : null;
  return (
    <div className="container">
      <h1 className="title">Job Postings</h1>
      {documents && (
        <FilterBy currentFilter={currentFilter} changeFilter={changeFilter} />
      )}
      <div>{documents && <JobsList jobs={jobs} />}</div>
    </div>
  );
}
