import React, { useState } from "react";
import "./Create.css";
import Select from "react-select";
import { useFirestore } from "../../hooks/useFirestore.js";
import { Timestamp } from "firebase/firestore";
import { useAuthContext } from "../../hooks/useAuthContext.js";
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
  const { addDocument, response } = useFirestore("jobs");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [totalWorkers, setTotalWorkers] = useState("");
  const [items, setItems] = useState([]);
  const [hours, setHours] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const createdAt = new Timestamp(new Date().toLocaleDateString());
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
      offers: [],
    };
    console.log(job);
    await addDocument(job);
    console.log(response);
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
            <input onChange={(e) => setTitle(e.target.value)} type="text" />
          </label>
          <label>
            <span>Description</span>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              rows={10}
            ></textarea>
          </label>
          <label>
            <span># of workers</span>
            <input
              onChange={(e) => setTotalWorkers(e.target.value)}
              type="number"
            />
          </label>
          <label>
            <span>Estimated Time (hours)</span>
            <input onChange={(e) => setHours(e.target.value)} type="number" />
          </label>
          <label>
            <span>Tools needed</span>
            <Select
              options={categories}
              isMulti
              onChange={(option) => setItems(option)}
            />
          </label>
          <label>
            <span>Location</span>
            <input type="text" onChange={(e) => setLocation(e.target.value)} />
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
