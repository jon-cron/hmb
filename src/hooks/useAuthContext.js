import { AuthContext } from "../context/AuthContext.js";
import { useContext } from "react";

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Must use auth within the provider");
  }
  return context;
};
