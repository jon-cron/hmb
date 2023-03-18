import "./Login.css";

import { useState } from "react";

export default function () {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="signup">
      <div className="form-div">
        <h2>Register</h2>
        <form className="form">
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
            <span>Password:</span>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </label>

          <div className="btn-div">
            <button>Submit</button>
            <button>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
