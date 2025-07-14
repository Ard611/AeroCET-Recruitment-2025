// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Weather from './weatherapi';
import Gallery from './gallery';
import './App.css';

// Home component with buttons
const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleTask = (task: string) => {
    if (task === 'Task 1') navigate('/gallery');
    else if (task === 'Task 2') navigate('/weather');
  };

  return (
    <div className="app">
      <div className="content">
        <h1>
          Welcome to <span className="highlight">AeroCET</span> Recruitment 2025
        </h1>
        <p>Official Aeromodelling Club of College of Engineering, Trivandrum</p>
        <div className="button-group">
          <button onClick={() => handleTask('Task 1')}>Gallery</button>
          <button onClick={() => handleTask('Task 2')}>Weather</button>
        </div>
      </div>
    </div>
  );
};

// Main App with routing
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </Router>
  );
};

export default App;
