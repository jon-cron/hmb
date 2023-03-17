//styles
import "./Navbar.css";
//react
import React from "react";
import { NavLink } from "react-router-dom";
//context
import { useAuthContext } from "../../hooks/useAuthContext.js";
export default function Navbar() {
  const { user } = useAuthContext();
  return (
    <div className="navbar">
      {user ? (
        <div>
          <NavLink to="/">Home</NavLink>
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
                <NavLink to="/signup">Signup</NavLink>
              </li>
            </>
          )}
          {user && (
            <li>
              <button className="logout-btn">Logout</button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
