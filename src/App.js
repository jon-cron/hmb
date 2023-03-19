//styles
import "./App.css";
//react
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
//hooks
import { useAuthContext } from "./hooks/useAuthContext.js";
//pages
import Home from "./pages/home/Home.js";
import Signup from "./pages/signup/Signup.js";
import Login from "./pages/login/Login.js";
import Navbar from "./components/navbar/Navbar.js";
import Create from "./pages/create/Create.js";
function App() {
  const { authIsReady, user } = useAuthContext();
  return (
    <div className="App">
      {authIsReady && (
        <Router>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
            <Route
              path="/create"
              element={user ? <Create /> : <Navigate to="/login" />}
            />
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;
