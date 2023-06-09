//styles
import "./Navbar.css";
//react
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
//context
import { useAuthContext } from "../../hooks/useAuthContext.js";
import { useLogout } from "../../hooks/useLogout.js";
export default function Navbar() {
  const navigate = useNavigate();
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
    navigate("/login");
  };
  return (
    <div className="navbar">
      {user ? (
        <div>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/create">Post Job</NavLink>
        </div>
      ) : (
        <div />
      )}
      <div>
        <ul>
          {!user && (
            <>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/signup">Register</NavLink>
              </li>
            </>
          )}
          {user && (
            <li className="logout">
              <h4>Hello, {user.displayName.toUpperCase()}!</h4>
              <img src={user.photoURL} className="profile-img" />
              <button onClick={handleClick} className="logout-btn">
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
