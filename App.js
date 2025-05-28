// src/App.js (Example - adjust based on your actual routing setup)

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MyTasksPage from './pages/MyTasksPage'; // Import the new page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-tasks" element={<MyTasksPage />} /> {/* New Route */}
        {/* Add any other routes you have */}
      </Routes>
    </Router>
  );
}

export default App;