import React from "react";
import "./StaffDashboard.css";

const StaffDashboard = ({ user, tasks, updateTaskStatus }) => {
  // Filter tasks assigned to the currently logged in staff member
  const myTasks = tasks.filter((task) => task.assignedTo === user.email);

  return (
    <div className="staff-dashboard">
      <div className="dashboard-header">
        <h2>My Task Dashboard</h2>
        <p>Welcome back, {user.name}. Here are your assigned tasks for today.</p>
      </div>

      <div className="task-overview">
        <div className="overview-card total">
          <h3>{myTasks.length}</h3>
          <p>Total Tasks</p>
        </div>
        <div className="overview-card pending">
          <h3>{myTasks.filter(t => t.status === 'Pending').length}</h3>
          <p>Pending Tasks</p>
        </div>
        <div className="overview-card completed">
          <h3>{myTasks.filter(t => t.status === 'Completed').length}</h3>
          <p>Completed Tasks</p>
        </div>
      </div>

      <div className="task-list-container">
        <h3>Current Tasks</h3>
        {myTasks.length === 0 ? (
          <div className="empty-state">
            <p>You have no tasks assigned to you right now. Great job!</p>
          </div>
        ) : (
          <div className="task-grid">
            {myTasks.map((task) => (
              <div 
                key={task.id} 
                className={`task-card ${task.status.toLowerCase()}`}
              >
                <div className="task-header">
                  <span className="task-id">#{task.id}</span>
                  <span className={`status-badge ${task.status.toLowerCase()}`}>
                    {task.status}
                  </span>
                </div>
                <div className="task-body">
                  <p className="task-desc">{task.description}</p>
                </div>
                <div className="task-actions">
                  {task.status === "Pending" ? (
                    <button 
                      className="complete-btn"
                      onClick={() => updateTaskStatus(task.id, "Completed")}
                    >
                      ✓ Mark as Completed
                    </button>
                  ) : (
                    <button 
                      className="undo-btn"
                      onClick={() => updateTaskStatus(task.id, "Pending")}
                    >
                      Undo Completion
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffDashboard;
