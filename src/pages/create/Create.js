import React from "react";
import "./Create.css";
import Select from "react-select";
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
            <input />
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
            <span>City and State</span>
            <ReactGoogleAutocomplete apiKey={key}></ReactGoogleAutocomplete>
          </label>
        </form>
      </div>
    </div>
  );
}
