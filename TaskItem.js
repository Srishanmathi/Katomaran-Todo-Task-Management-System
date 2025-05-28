// src/components/TaskItem.js

import React from 'react';
import './styles/TaskItem.css';
import axios from 'axios'; // Import axios for update/delete

const TaskItem = ({ task, refresh }) => {

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${task.title}"?`)) {
      try {
        await axios.delete(`http://localhost:5000/api/tasks/${task._id}`);
        if (refresh) refresh();
      } catch (err) {
        console.error("❌ Failed to delete task:", err.message);
        alert("Failed to delete task. Please try again.");
      }
    }
  };

  const handleToggleComplete = async () => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${task._id}`, {
        completed: !task.completed
      });
      if (refresh) refresh();
    } catch (err) {
      console.error("❌ Failed to toggle task completion:", err.message);
      alert("Failed to update task. Please try again.");
    }
  };

  // Helper to format date
  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    try {
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch (e) {
      return 'Invalid Date';
    }
  };

  return (
    <div className={`task-item-card ${task.completed ? 'completed' : ''}`}>
      <div className="task-item-content">
        <h3 className="task-title">{task.title}</h3>
        {task.description && <p className="task-description">{task.description}</p>}
        
        {/* Display Due Date */}
        <div className="task-detail-row">
            <span className="detail-label">Due Date:</span>
            <span className={`detail-value ${task.dueDate && new Date(task.dueDate) < new Date() && !task.completed ? 'overdue' : ''}`}>
                {formatDate(task.dueDate)}
            </span>
        </div>

        {/* Display Status */}
        <div className="task-detail-row">
            <span className="detail-label">Status:</span>
            <span className={`task-status ${task.completed ? 'status-completed' : 'status-pending'}`}>
                {task.completed ? 'Completed' : 'Pending'}
            </span>
        </div>

      </div>
      <div className="task-item-actions">
        <button onClick={handleToggleComplete} className="action-button toggle-button">
          {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
        </button>
        <button onClick={handleDelete} className="action-button delete-button">
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;