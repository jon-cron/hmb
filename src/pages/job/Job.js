import "./Job.css";
import { useParams } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument.js";
import { useAuthContext } from "../../hooks/useAuthContext.js";
import Select from "react-select";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config.js";

const offerAmounts = [
  { value: "6", label: "6" },
  { value: "12", label: "12" },
  { value: "18", label: "18" },
  { value: "24", label: "24" },
  { value: "30", label: "30" },
  { value: "48", label: "48" },
  { value: "72", label: "72" },
  { value: "96", label: "96" },
];
const offerType = [
  { value: "Bud light", label: "Bud light" },
  { value: "Budweiser", label: "Budweiser" },
  { value: "Coors", label: "Coors" },
  { value: "Coors Light", label: "Coors Light" },
  { value: "Corona", label: "Corona" },
  { value: "Corona Premier", label: "Corona Premier" },
  { value: "Michelob Ultra", label: "Michelob Ultra" },
  { value: "Miller Light", label: "Miller Light" },
  { value: "Natural Light", label: "Natural Light" },
  { value: "Naturdays", label: "Naturdays" },
  { value: "Samuel Adams", label: "Samuel Adams" },
];
export default function Job() {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const params = useParams();
  const { user } = useAuthContext();
  const { document } = useDocument("jobs", params.id);
  console.log(document);
  const handleSubmit = async (e) => {
    e.preventDefault();
    //data for each offer, creator info (id, photoURL, displayName ), isAccepted: false, amount, type.
    //NOTE i need to update the document through this function
    const offer = {
      creator: {
        id: user.uid,
        profileImg: user.photoURL,
        displayName: user.displayName,
      },
      isAccepted: false,
      amount: amount.value,
      type: type.value,
    };
    console.log(offer);
    const jobRef = doc(db, "jobs", params.id);
    await updateDoc(jobRef, {
      offers: [...document.offers, offer],
    });
  };
  return (
    <div className="container">
      <div className="job-page">
        <h2 className="job-title">Job Page</h2>
        {document?.job && (
          <div className="job-section">
            <div className="job-info">
              <span className="job-name">
                <h3>{document.job.title}</h3>
              </span>
              <span className="job-flex">
                <h4>Description:</h4>
                {document.job.description}
              </span>
              <span className="job-flex-evenly">
                <div>
                  <h4>Workers Needed:</h4>
                  {document.job.totalWorkers}
                </div>
                <div>
                  <h4>Estimated Time:</h4>
                  {document.job.hours}(hours)
                </div>
              </span>
              <span className="job-flex">
                <h4>Preferred Items:</h4>
                <ul>
                  {document.job.items.map((i) => (
                    <li key={i.label}> {i.label} </li>
                  ))}
                </ul>
              </span>
              {document.offers.includes(user.uid) && (
                <span className="job-flex">
                  <h4>Location</h4>
                  {document.job.location}
                </span>
              )}
            </div>
            <div className="offer-section">
              {document.job.creator.id === user.uid ? (
                <div>
                  <h2>Offers</h2>
                </div>
              ) : (
                <div>
                  <h2>Make your offer!</h2>
                  <form className="offer-form" onSubmit={handleSubmit}>
                    <label>
                      <span>Amount</span>
                      <Select
                        className="react-select"
                        options={offerAmounts}
                        onChange={(option) => setAmount(option)}
                        value={amount}
                      />
                    </label>
                    <label>
                      <span>Type</span>
                      <Select
                        className="react-select"
                        options={offerType}
                        onChange={(option) => setType(option)}
                        value={type}
                      />
                    </label>
                    <button className="btn">Submit</button>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
