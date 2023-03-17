import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
//pages
import Home from "./pages/home/Home.js";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
