import "./Job.css";
import { useParams } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument.js";
export default function Job() {
  // const [job, setJob] = useState(null);
  const params = useParams();
  const { document } = useDocument("jobs", params.id);
  console.log(document);
  return (
    <div className="job-page">
      <h2>Job Page</h2>
    </div>
  );
}
