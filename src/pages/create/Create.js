import React, { useState } from "react";
import "./Create.css";
import Select from "react-select";
// NOTE must "npm i react-google-autocomplete --save" before using
import ReactGoogleAutocomplete from "react-google-autocomplete";
const key = { apiKey: "AIzaSyBRDRNQTsTV-Y5fEdtPWFFKvvG3U5u9VNs" };
const categories = [
  { value: "Rake", label: "Rake" },
  { value: "Shovel", label: "Shovel" },
  { value: "Truck", label: "Truck" },
  { value: "Trailer", label: "Trailer" },
  { value: "Mower", label: "Mower" },
  { value: "Mechanic Tools", label: "Mechanic Tools" },
  { value: "Strong", label: "Strong" },
  { value: "Trash Bags", label: "Trash Bags" },
  { value: "Other", label: "Other" },
];
export default function Create() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState("");
  const [currentItem, setCurrentItem] = useState("");
  const [items, setItems] = useState([]);
  return (
    <div className="container">
      <div className="create-form-div">
        <form>
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
              onChange={(e) => setCapacity(e.target.value)}
              type="number"
            />
          </label>
          <label>
            <span>Tools needed</span>
            <Select
              options={categories}
              isMulti
              onChange={(option) => setCurrentItem(option)}
            />
          </label>
          <label>
            <span>Location</span>
            <input type="text" />
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
