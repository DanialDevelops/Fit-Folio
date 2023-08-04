import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./pages/Home";
import Exercises from "./components/exercise.js";
import LoginSignup from "./pages/login.js";

function App() {
  const [currentPage, setCurrentPage] = useState("exercises"); // 'exercises' or 'login'

  return (
    <div>
      <header>
        <h1>Fit Folio</h1>
      </header>

      <nav>
        <ul>
          <li>
            <button onClick={() => setCurrentPage("exercises")}>
              Exercises
            </button>
          </li>
          <li>
            <button onClick={() => setCurrentPage("login")}>
              Login/Signup
            </button>
          </li>
        </ul>
      </nav>

      {currentPage === "exercises" && <Exercises />}
      {currentPage === "login" && <LoginSignup />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
