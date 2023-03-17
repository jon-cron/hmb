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
function App() {
  const { authIsReady, user } = useAuthContext();
  return (
    <div className="App">
      {authIsReady && (
        <Router>
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Home /> : <Navigate to="/" />}
            />
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;
