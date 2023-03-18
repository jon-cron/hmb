import "./Signup.css";
import { useSignup } from "../../hooks/useSignup.js";
import { useState } from "react";

export default function Signup() {
  const { error, isPending, signup } = useSignup();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [profileImg, setProfileImg] = useState(null);
  const [profileImgError, setProfileImgError] = useState(null);
  const handleImg = (e) => {
    setProfileImg(null);
    setProfileImgError(null);
    let selected = e.target.files[0];
    if (!selected) {
      setProfileImgError("Please select a file");
      return;
    }
    if (!selected.type.includes("image")) {
      setProfileImgError("Please select an image file");
      return;
    }
    if (selected.size > 100000) {
      setProfileImgError("File size too larger");
      return;
    }
    setProfileImgError(null);
    setProfileImg(selected);
    console.log(profileImg);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password != passwordCheck) {
      return;
    }
    signup(email, password, displayName, profileImg);
  };
  return (
    <div className="signup">
      <div className="form-div">
        <h2>Register</h2>
        <form className="form" onSubmit={handleSubmit}>
          <label>
            <span>Email:</span>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </label>
          <label>
            <span>User Name:</span>
            <input
              type="text"
              minLength={3}
              onChange={(e) => setDisplayName(e.target.value)}
              value={displayName}
              required
            />
          </label>
          <label>
            <span>Profile Image:</span>
            <input type="file" onChange={handleImg} required />
          </label>
          {profileImgError && <p>{profileImgError}</p>}
          <label>
            <span>Password:</span>
            <input
              type="password"
              minLength={8}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </label>
          <label>
            <span>Verify Password:</span>
            <input
              type="password"
              minLength={8}
              onChange={(e) => setPasswordCheck(e.target.value)}
              value={passwordCheck}
              required
            />
          </label>
          {password != passwordCheck && passwordCheck.length > 7 && (
            <p className="error">Does not match password</p>
          )}
          <div className="btn-div">
            <button className="reset" type="button">
              Reset
            </button>

            <button className="signup-btn">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
