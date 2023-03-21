import "./Job.css";
import { useParams } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument.js";
import { useAuthContext } from "../../hooks/useAuthContext.js";
export default function Job() {
  // const [job, setJob] = useState(null);
  const params = useParams();
  const { user } = useAuthContext();
  const { document: job } = useDocument("jobs", params.id);
  console.log(job);
  return (
    <div className="container">
      <div className="job-page">
        <h2 className="job-title">Job Page</h2>
        {job && (
          <div className="job-section">
            <div className="job-info">
              <span className="job-name">
                <h3>{job.title}</h3>
              </span>
              <span className="job-description">
                <h4>Description:</h4>
                {job.description}
              </span>
            </div>
            <div className="offer-section">
              {job.creator.id === user.uid ? (
                <h2>Offers</h2>
              ) : (
                <h2>Make your offer!</h2>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
