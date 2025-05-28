// src/pages/MyTasksPage.js

import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import TaskList from "../components/TaskList";
import './styles/MyTasksPage.css'; // New CSS for this page

const MyTasksPage = () => {
  // Use state to store the user object, fetched once on mount
  const [user, setUser] = useState(null);

  // State for tasks and loading/error feedback
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Fetch user from localStorage only once on component mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    } else {
      // If no user found, set loading to false and indicate authentication needed
      setLoading(false);
      setError("User not authenticated. Please login to view tasks.");
    }
  }, []); // Empty dependency array means this runs only once after the initial render

  // 2. Memoized function to fetch tasks
  const fetchTasks = useCallback(async () => {
    // Only attempt to fetch if user is defined and has a UID
    if (!user || !user.uid) {
      // If user is null, it means we haven't loaded it yet or it's genuinely not authenticated.
      // We handle initial loading/auth check in the first useEffect.
      // So, if we reach here and user is null, it's already handled.
      // If user exists but no uid, it's an invalid user object.
      return;
    }

    setLoading(true); // Indicate loading has started
    setError(null);    // Clear any previous errors
    try {
      const res = await axios.get(`http://localhost:5000/api/tasks/${user.uid}`);
      setTasks(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch tasks:", err.message);
      setError("Failed to load tasks. Please try again.");
    } finally {
      setLoading(false); // Indicate loading has finished
    }
  }, [user]); // Recreate fetchTasks only if the 'user' object changes

  // 3. Effect to call fetchTasks when user is available or fetchTasks itself changes
  useEffect(() => {
    if (user) { // Only attempt to fetch tasks if the user object has been successfully loaded
      fetchTasks();
    }
  }, [user, fetchTasks]); // Dependencies: 'user' (when it gets set from localStorage) and 'fetchTasks' (which is stable unless 'user' changes)

  // --- Conditional Renders based on authentication and loading state ---

  // Initial check for authentication or if user is still loading
  if (loading && user === null) { // User is null initially, and we are in loading state
     return (
       <div className="my-tasks-container auth-error">
         <p>Loading user data...</p>
       </div>
     );
  }

  // If user is null after the initial load, it means authentication failed
  if (!user) {
    return (
      <div className="my-tasks-container auth-error">
        <p>{error || "User not authenticated. Please login to view tasks."}</p>
        <a href="/" className="back-to-login-link">Go to Login</a>
      </div>
    );
  }

  // Once user is authenticated, render the main content
  return (
    <div className="my-tasks-container">
      <div className="my-tasks-header">
        <h1 className="my-tasks-heading">My Tasks for {user.displayName || 'you'}</h1>
        <button onClick={() => window.history.back()} className="back-button">
          &larr; Back to Dashboard
        </button>
      </div>

      {/* Render based on loading, error, and task data */}
      {loading ? (
        <p className="loading-message">Loading tasks...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        tasks.length === 0 ? (
          <p className="no-tasks-message">You have no tasks yet! Go to Dashboard to add some.</p>
        ) : (
          <TaskList tasks={tasks} refresh={fetchTasks} />
        )
      )}
    </div>
  );
};

export default MyTasksPage;