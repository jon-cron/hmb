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
      id: Math.floor(Math.random() * 1000000),
      creator: {
        id: user.uid,
        profileImg: user.photoURL,
        displayName: user.displayName,
      },
      isAccepted: false,
      amount: amount.value,
      type: type.value,
    };
    const jobRef = doc(db, "jobs", params.id);
    await updateDoc(jobRef, {
      offers: [...document.offers, offer],
    });
  };
  const toggleIsAccepted = async (offer) => {
    const jobRef = doc(db, "jobs", params.id);
    const index = document.offers.findIndex((d) => d.id == offer.id);
    const bool = document.offers[index].isAccepted;
    console.log(bool);
    document.offers[index].isAccepted = !bool;
    await updateDoc(jobRef, {
      offers: document.offers,
    });
  };
  const handleCancel = async (id) => {
    document.offers = document.offers.filter((o) => o.creator.id != id);
    const jobRef = doc(db, "jobs", params.id);
    await updateDoc(jobRef, {
      offers: document.offers,
    });
  };
  // NOTE I was able to consolidate the functionality of toggling an offers isAccepted bool within the toggle function above making this function redundant
  // const handleRemove = async (offer) => {
  //   document.offers = document.offers.filter((o) => o.id != offer.id);
  //   const jobRef = doc(db, "jobs", params.id);
  //   await updateDoc(jobRef, {
  //     offers: document.offers,
  //   });
  // };
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
              {(document.offers && document.offers.includes(user.uid)) ||
                (document.job.creator.id === user.uid && (
                  <span className="job-flex">
                    <h4>Location:</h4>
                    {document.job.location}
                  </span>
                ))}
            </div>
            <div className="offer-section">
              {document.job.creator.id === user.uid && (
                <div>
                  <h2>Offers</h2>
                  {document.offers.length < 1 && (
                    <div>
                      <h3>No offers yet...</h3>
                    </div>
                  )}
                  {document?.offers.map((o) => (
                    <div
                      key={o.creator.id}
                      className={`offer-card ${o.isAccepted && "accepted"}`}
                    >
                      <div className="flex">
                        <img src={o.creator.profileImg} />
                        <h5>{o.creator.displayName.toUpperCase()}</h5>
                      </div>
                      <div className="flex">
                        <h6>
                          Will work for a {o.amount} pack of {o.type}.
                        </h6>
                      </div>
                      {!o.isAccepted && (
                        <button
                          className="btn"
                          onClick={() => toggleIsAccepted(o)}
                        >
                          Accept
                        </button>
                      )}

                      {o.isAccepted && (
                        <button
                          className="btn"
                          // NOTE still not sure why but my onClicks were invoking on render; using an anonymous function like below stop the invoking on render
                          onClick={() => toggleIsAccepted(o)}
                        >
                          Decline
                        </button>
                      )}
                      <button
                        className="btn"
                        // NOTE still not sure why but my onClicks were invoking on render; using an anonymous function like below stop the invoking on render
                        onClick={() => handleCancel(o.creator.id)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {!document.offers.find((o) => o.creator.id == user.uid) &&
                document.job.creator.id != user.uid && (
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
              {document.offers.find((o) => o.creator.id == user.uid) &&
                document.offers.find((o) => o.isAccepted == false) &&
                document.job.creator.id != user.uid && (
                  <div>
                    <h2>Your offer has been submitted!</h2>
                    <button
                      className="btn"
                      onClick={() => handleCancel(user.uid)}
                    >
                      Remove Offer
                    </button>
                  </div>
                )}
              {document.offers.find((o) => o.creator.id == user.uid) &&
                document.job.creator.id != user.uid &&
                document.offers.find((o) => o.isAccepted == true) && (
                  <div>
                    <h2>Your offer has been accepted.</h2>
                    <button
                      className="btn"
                      onClick={() => handleCancel(user.uid)}
                    >
                      Remove Offer
                    </button>
                  </div>
                )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
