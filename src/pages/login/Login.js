import "./Login.css";
import { useLogin } from "../../hooks/useLogin.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function () {
  const navigate = useNavigate();
  const { error, login } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
    // navigate("/");
  };
  return (
    <div className="login">
      <div className="form-div">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="form">
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
            <button>Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}
