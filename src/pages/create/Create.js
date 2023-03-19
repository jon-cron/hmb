import React from "react";
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
  return (
    <div className="container">
      <div className="create-form-div">
        <form>
          <label>
            <span>Posting Title</span>
            <input type="text" />
          </label>
          <label>
            <span>Description</span>
            <textarea rows={10}></textarea>
          </label>
          <label>
            <span># of workers</span>
            <input type="number" />
          </label>
          <label>
            <span>Tools needed</span>
            <Select options={categories} isMulti />
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
