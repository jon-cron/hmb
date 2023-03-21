import "./Job.css";
import { useParams } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument.js";
export default function Job() {
  // const [job, setJob] = useState(null);
  const params = useParams();
  const { document: job } = useDocument("jobs", params.id);
  console.log(job);
  return (
    <div className="job-page">
      <h2>Job Page</h2>
      {job && <h2>{job.title}</h2>}
    </div>
  );
}
