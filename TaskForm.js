// src/components/TaskForm.js

import React, { useState } from 'react';
import axios from 'axios';
import './styles/TaskForm.css'; // Import the CSS for TaskForm

const TaskForm = ({ refresh }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [completed, setCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const user = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user.uid) {
      setErrorMessage("You must be logged in to add tasks.");
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }

    if (!title.trim()) {
      setErrorMessage("Task title cannot be empty.");
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }
    // Validation: description cannot be empty
    if (!description.trim()) {
      setErrorMessage("Task description cannot be empty.");
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }
    // Validation: due date cannot be empty
    if (!dueDate) {
      setErrorMessage("Due Date cannot be empty.");
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }

    setIsSubmitting(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      await axios.post('http://localhost:5000/api/tasks', {
        userId: user.uid,
        title,
        description,
        dueDate, // Send the due date (it's now required)
        completed
      });
      setSuccessMessage('Task added successfully!');
      setTitle('');
      setDescription('');
      setDueDate('');
      setCompleted(false);
      if (refresh) {
        refresh();
      }
    } catch (err) {
      console.error('❌ Failed to add task:', err.message);
      const msg = err.response?.data?.message || 'Failed to add task. Please try again.';
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setSuccessMessage('');
        setErrorMessage('');
      }, 3000);
    }
  };

  return (
    <div className="task-form-wrapper">
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label htmlFor="task-title" className="form-label">Task Title <span className="required-star">*</span></label>
          <input
            type="text"
            id="task-title"
            placeholder="e.g., Finish project report"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
            disabled={isSubmitting}
            aria-label="Task Title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="task-description" className="form-label">Description <span className="required-star">*</span></label>
          <textarea
            id="task-description"
            rows="3"
            placeholder="Add details about the task..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-textarea"
            disabled={isSubmitting}
            aria-label="Task Description"
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="task-due-date" className="form-label">Due Date <span className="required-star">*</span></label>
          <input
            type="date"
            id="task-due-date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="form-input"
            disabled={isSubmitting}
            aria-label="Task Due Date"
            required
          />
        </div>

        <div className="form-group form-checkbox-group">
          <input
            type="checkbox"
            id="task-completed"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            className="form-checkbox"
            disabled={isSubmitting}
            aria-label="Mark task as completed"
          />
          <label htmlFor="task-completed" className="form-label checkbox-label">Mark as Completed</label>
        </div>

        {successMessage && <p className="form-message success">{successMessage}</p>}
        {errorMessage && <p className="form-message error">{errorMessage}</p>}

        <button
          type="submit"
          className="add-task-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding Task...' : 'Add Task'}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;