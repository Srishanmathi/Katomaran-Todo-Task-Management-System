// // src/components/TaskList.js

// import React from "react";
// import axios from "axios";

// const TaskList = ({ tasks, refresh }) => {
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/tasks/${id}`);
//       refresh(); // re-fetch tasks after deletion
//     } catch (err) {
//       console.error("❌ Failed to delete task:", err.message);
//       alert("Failed to delete task.");
//     }
//   };

//   const handleComplete = async (task) => {
//     try {
//       if (task.status === "Complete") return;
//       await axios.put(`http://localhost:5000/api/tasks/${task._id}`, {
//         ...task,
//         status: "Complete",
//       });
//       refresh(); // re-fetch tasks after marking complete
//     } catch (err) {
//       console.error("❌ Failed to update task:", err.message);
//       alert("Failed to mark task as complete.");
//     }
//   };

//   return (
//     <div className="space-y-4">
//       {tasks.length === 0 ? (
//         <p className="text-center text-gray-500">No tasks available</p>
//       ) : (
//         tasks.map((task) => (
//           <div
//             key={task._id}
//             className="border border-gray-200 rounded-lg shadow-sm p-4 bg-white hover:shadow-md transition"
//           >
//             <div className="flex justify-between items-start">
//               <div>
//                 <h2 className="text-lg font-semibold text-gray-800">
//                   {task.title}
//                 </h2>
//                 <p className="text-gray-600 text-sm">{task.description}</p>
//                 <p className="text-sm text-gray-500 mt-1">
//                   Due: {new Date(task.dueDate).toLocaleDateString()}
//                 </p>
//                 <span
//                   className={`inline-block mt-2 px-2 py-1 rounded-full text-xs font-semibold 
//                     ${
//                       task.status === "Open"
//                         ? "bg-yellow-100 text-yellow-800"
//                         : "bg-green-100 text-green-800"
//                     }`}
//                 >
//                   {task.status}
//                 </span>
//               </div>

//               <div className="flex flex-col space-y-2">
//                 <button
//                   onClick={() => handleComplete(task)}
//                   className={`px-3 py-1 rounded text-white text-sm font-medium ${
//                     task.status === "Complete"
//                       ? "bg-gray-400 cursor-not-allowed"
//                       : "bg-green-500 hover:bg-green-600"
//                   }`}
//                   disabled={task.status === "Complete"}
//                 >
//                   {task.status === "Complete" ? "Completed" : "Mark Complete"}
//                 </button>

//                 <button
//                   onClick={() => handleDelete(task._id)}
//                   className="px-3 py-1 rounded text-white text-sm font-medium bg-red-500 hover:bg-red-600"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default TaskList;
// // src/components/TaskList.js

// // src/components/TaskList.js

// // src/components/TaskList.js

// // import React from "react";
// // import axios from "axios";
// // import './TaskList.css'; // Import the CSS file

// // const TaskList = ({ tasks, refresh }) => {
// //   const handleDelete = async (id) => {
// //     try {
// //       await axios.delete(`http://localhost:5000/api/tasks/${id}`);
// //       refresh(); // re-fetch tasks after deletion
// //     } catch (err) {
// //       console.error("❌ Failed to delete task:", err.message);
// //       alert("Failed to delete task.");
// //     }
// //   };

// //   const handleComplete = async (task) => {
// //     try {
// //       if (task.status === "Complete") return;
// //       await axios.put(`http://localhost:5000/api/tasks/${task._id}`, {
// //         ...task,
// //         status: "Complete",
// //       });
// //       refresh(); // re-fetch tasks after marking complete
// //     } catch (err) {
// //       console.error("❌ Failed to update task:", err.message);
// //       alert("Failed to mark task as complete.");
// //     }
// //   };

// //   return (
// //     <div className="task-list-container">
// //       {tasks.length === 0 ? (
// //         <p className="no-tasks-message">No tasks available</p>
// //       ) : (
// //         tasks.map((task) => ( // Correctly iterating with 'task'
// //           <div
// //             key={task._id} // FIX: Moved key inside the div tag
// //             className="task-item"
// //           >
// //             <div className="task-item-content">
// //               <div>
// //                 <h2 className="task-title">
// //                   {task.title}
// //                 </h2>
// //                 <p className="task-description">{task.description}</p>
// //                 <p className="task-due-date">
// //                   Due: {new Date(task.dueDate).toLocaleDateString()}
// //                 </p>
// //                 <span
// //                   className={`task-status ${
// //                     task.status === "Open" ? "task-status-open" : "task-status-complete"
// //                   }`}
// //                 >
// //                   {task.status}
// //                 </span>
// //               </div>

// //               <div className="task-actions">
// //                 <button
// //                   onClick={() => handleComplete(task)}
// //                   className={`task-complete-button ${
// //                     task.status === "Complete" ? "task-button-disabled" : ""
// //                   }`}
// //                   disabled={task.status === "Complete"}
// //                 >
// //                   {task.status === "Complete" ? "Completed" : "Mark Complete"}
// //                 </button>

// //                 <button
// //                   onClick={() => handleDelete(task._id)}
// //                   className="task-delete-button"
// //                 >
// //                   Delete
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         ))
// //       )}
// //     </div>
// //   );
// // };

// // export default TaskList;
// src/components/TaskList.js

import React from 'react';
import TaskItem from './TaskItem'; // Import the TaskItem component
import './styles/TaskList.css'; // For the container of the task list

const TaskList = ({ tasks, refresh }) => {
  return (
    <div className="task-list-container">
      <h2 className="task-list-heading">Your Tasks</h2>
      {tasks.length === 0 ? (
        <p className="no-tasks-message">No tasks yet! Add one above.</p>
      ) : (
        <div className="task-items-grid"> {/* Grid for attractive task display */}
          {tasks.map(task => (
            <TaskItem key={task._id} task={task} refresh={refresh} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;