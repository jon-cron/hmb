import "./Home.css";

import React from "react";
import { useAuthContext } from "../../hooks/useAuthContext.js";
export default function Home() {
  const { user } = useAuthContext();
  return (
    <div className="container">
      <div></div>
    </div>
  );
}
