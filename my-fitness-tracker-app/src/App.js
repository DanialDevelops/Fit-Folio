import React, { useState } from 'react';
import './App.css';

import Exercises from './components/exercise.js';
import LoginSignup from './components/login.js';

function App() {
  const [currentPage, setCurrentPage] = useState('exercises'); // 'exercises' or 'login'

  return (
    <div>
      <header>
        <h1>Fitness Tracker</h1>
      </header>

      <nav>
        <ul>
          <li>
            <button onClick={() => setCurrentPage('exercises')}>Exercises</button>
          </li>
          <li>
            <button onClick={() => setCurrentPage('login')}>Login/Signup</button>
          </li>
        </ul>
      </nav>

      {currentPage === 'exercises' && <Exercises />}
      {currentPage === 'login' && <LoginSignup />}
    </div>
  );
}

export default App;