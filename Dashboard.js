// src/pages/Dashboard.js

import React, { useState, useEffect } from "react"; // Added useEffect for quote
import { useNavigate } from "react-router-dom";
// No need for axios, TaskList here anymore as per previous refactoring
// TaskForm is still here for adding tasks
import TaskForm from "../components/TaskForm";
import './styles/Dashboard.css';


  // Array of productivity/task management quotes
  const quotes = [
    "The secret of getting ahead is getting started.",
    "It's not about having time. It's about making time.",
    "The highly effective person starts with the end in mind.",
    "For every minute spent in organizing, an hour is earned.",
    "Focus on being productive, not busy.",
    "The way to get started is to quit talking and begin doing.",
    "You don't have to see the whole staircase, just take the first step.",
    "Either you run the day, or the day runs you.",
    "Plans are nothing; planning is everything.",
    "Productivity is never an accident. It is always the result of a commitment to excellence, intelligent planning, and focused effort."
  ];

  const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [currentQuote, setCurrentQuote] = useState("");

  useEffect(() => {
    // Select a random quote on component mount
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomIndex]);
  }, []); // Empty dependency array means this runs only once on mount

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const goToMyTasks = () => {
    navigate("/my-tasks");
  };

  // 🔒 Protect in case user is not found
  if (!user) {
    return (
      <div className="auth-error-container">
        User not authenticated. Please login again.
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-content-wrapper">

        {/* Header: Welcome + Logout */}
        <div className="dashboard-header">
          <h1 className="dashboard-welcome-message">
            Welcome, {user.displayName || 'Guest'}!
          </h1>
          <button
            onClick={handleLogout}
            className="logout-button"
          >
            Logout
          </button>
        </div>

        {/* Quote of the Day Section */}
        <div className="quote-section">
          <p className="quote-text">"{currentQuote}"</p>
          <span className="quote-author">- Anonymous</span> {/* or specific author if you add them */}
        </div>

        {/* Task Form */}
        <div className="task-form-section">
          <h2 className="section-heading">Add a New Task</h2>
          <TaskForm />
        </div>

        {/* "My Tasks" Button */}
        <div className="my-tasks-button-container">
          <button
            onClick={goToMyTasks}
            className="my-tasks-button"
          >
            Go to My Tasks
          </button>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;