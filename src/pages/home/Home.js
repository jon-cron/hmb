import "./Home.css";

import React from "react";
import { useAuthContext } from "../../hooks/useAuthContext.js";
export default function Home() {
  const { user } = useAuthContext();
  console.log(user);
  return (
    <div>
      <div>
        <img src={user.photoURL} height={50} width={50} />
      </div>
    </div>
  );
}
