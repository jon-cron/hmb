import React, { useState } from "react";
import "./Create.css";
import Select from "react-select";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useAuthContext } from "../../hooks/useAuthContext.js";
import { db } from "../../firebase/config.js";
import { useNavigate } from "react-router-dom";
// NOTE must "npm i react-google-autocomplete --save" before using
// import ReactGoogleAutocomplete from "react-google-autocomplete";
// const key = { apiKey: "AIzaSyBRDRNQTsTV-Y5fEdtPWFFKvvG3U5u9VNs" };
const categories = [
  { value: "Rake", label: "Rake" },
  { value: "Shovel", label: "Shovel" },
  { value: "Truck", label: "Truck" },
  { value: "Trailer", label: "Trailer" },
  { value: "Mower", label: "Mower" },
  { value: "Mechanic Tools", label: "Mechanic Tools" },
  { value: "Strong", label: "Strong" },
  { value: "Trash Bags", label: "Trash Bags" },
];
export default function Create() {
  // NOTE posting data: title string, creator {}, description string, location string, workerTotal string, items [strings], offers [price, creator, job id, isAccepted bool]
  const { user } = useAuthContext();
  // const { addDocument, response } = useFirestore("jobs");
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [totalWorkers, setTotalWorkers] = useState("");
  const [items, setItems] = useState([]);
  const [hours, setHours] = useState("");
  const [dueDate, setDueDate] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const createdAt = Timestamp.fromDate(new Date());
    const job = {
      creator: {
        id: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
      },
      title: title,
      description: description,
      location: location,
      totalWorkers: totalWorkers,
      items: items,
      createdAt: createdAt,
      hours: hours,
      dueDate: dueDate,
    };
    // await addDocument(job);
    const ref = collection(db, "jobs");
    await addDoc(ref, { job, offers: [] });
    // console.log(response);
    resetForm();
    navigate("/");
  };
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setLocation("");
    setTotalWorkers("");
    setItems([]);
    setHours("");
  };
  return (
    <div className="container">
      <div className="create-form-div">
        <form onSubmit={handleSubmit}>
          <label>
            <span>Posting Title</span>
            <input
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              required
              value={title}
            />
          </label>
          <label>
            <span>Description</span>
            <textarea
              required
              onChange={(e) => setDescription(e.target.value)}
              rows={10}
              value={description}
            ></textarea>
          </label>
          <label>
            <span>Work Date</span>
            <input
              type="datetime-local"
              required
              onChange={(e) => setDueDate(e.target.value)}
              value={dueDate}
            />
          </label>
          <label>
            <span># of workers</span>
            <input
              required
              onChange={(e) => setTotalWorkers(e.target.value)}
              type="number"
              value={totalWorkers}
            />
          </label>
          <label>
            <span>Estimated Time (hours)</span>
            <input
              required
              onChange={(e) => setHours(e.target.value)}
              type="number"
              value={hours}
            />
          </label>
          <label>
            <span>Tools needed</span>
            <Select
              required
              options={categories}
              isMulti
              onChange={(option) => setItems(option)}
              value={items}
            />
          </label>
          <label>
            <span>Location</span>
            <input
              required
              type="text"
              onChange={(e) => setLocation(e.target.value)}
              value={location}
            />
            {/* <ReactGoogleAutocomplete
              apiKey="AIzaSyBRDRNQTsTV-Y5fEdtPWFFKvvG3U5u9VNs"
              onChange={(e) => console.log(e.target.value)}
            ></ReactGoogleAutocomplete> */}
          </label>
          <button className="btn">Submit</button>
        </form>
      </div>
    </div>
  );
}
