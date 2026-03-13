import React, { useState } from "react";
import "./StaffManagement.css";

const StaffManagement = ({ staff, setStaff, tasks, setTasks }) => {
  const [showForm, setShowForm] = useState(false);
  const [newStaff, setNewStaff] = useState({ name: "", role: "Housekeeping", email: "" });
  
  // State for assigning a task
  const [assigningTaskTo, setAssigningTaskTo] = useState(null);
  const [newTaskDesc, setNewTaskDesc] = useState("");

  const handleAddStaff = (e) => {
    e.preventDefault();
    if (!newStaff.name || !newStaff.email) return;

    const newId = `S-00${staff.length + 1}`;
    setStaff([...staff, { id: newId, ...newStaff, status: "Active" }]);
    setShowForm(false);
    setNewStaff({ name: "", role: "Housekeeping", email: "" });
  };

  const handleRemoveStaff = (id) => {
    setStaff(staff.filter((s) => s.id !== id));
  };

  const handleAssignTaskSubmit = (e, email) => {
      e.preventDefault();
      if (!newTaskDesc) return;

      const newTask = {
          id: `T${Date.now()}`,
          description: newTaskDesc,
          assignedTo: email,
          status: 'Pending'
      };

      setTasks([...tasks, newTask]);
      setAssigningTaskTo(null);
      setNewTaskDesc("");
  };

  return (
    <div className="staff-management">
      <div className="staff-header">
        <div>
          <h2>Staff Management</h2>
          <p>View and manage hotel personnel & assign tasks.</p>
        </div>
        <button 
          className="add-staff-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancel" : "+ Add New Staff"}
        </button>
      </div>

      {showForm && (
        <form className="add-staff-form" onSubmit={handleAddStaff}>
          <div className="form-row">
            <div className="input-group">
              <label>Full Name</label>
              <input 
                type="text" 
                placeholder="Staff Name"
                value={newStaff.name}
                onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                required
              />
            </div>
            <div className="input-group">
              <label>Email (Login)</label>
              <input 
                type="email" 
                placeholder="staff@hotel.com"
                value={newStaff.email}
                onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                required
              />
            </div>
            <div className="input-group">
              <label>Role</label>
              <select 
                value={newStaff.role}
                onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })}
              >
                <option value="Receptionist">Receptionist</option>
                <option value="Housekeeping">Housekeeping</option>
                <option value="Room Service">Room Service</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>
            <button type="submit" className="submit-staff-btn">Save Member</button>
          </div>
        </form>
      )}

      <div className="staff-grid">
        {staff.map((member) => (
          <div className="staff-card" key={member.id}>
            <div className="staff-card-header">
              <div className="staff-avatar">
                {member.name.charAt(0)}
              </div>
              <div className="staff-info">
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            </div>
            <div className="staff-card-body">
              <div className="staff-meta">
                <span className="meta-label">Email</span>
                <span className="meta-value" style={{fontSize: '0.8rem'}}>{member.email}</span>
              </div>
              <div className="staff-meta">
                <span className="meta-label">Status</span>
                <span className={`status-badge ${member.status?.toLowerCase().replace(' ', '-')}`}>
                  {member.status}
                </span>
              </div>
              
              {/* Task Section */}
              <div className="staff-tasks">
                  <span className="meta-label" style={{marginTop:'1rem', display:'block'}}>Assigned Tasks</span>
                  <ul style={{fontSize: '0.85rem', color: 'var(--text-secondary)', paddingLeft: '1.2rem'}}>
                      {tasks.filter(t => t.assignedTo === member.email).length === 0 ? (
                          <li>No active tasks.</li>
                      ) : (
                          tasks.filter(t => t.assignedTo === member.email).map(task => (
                              <li key={task.id} style={{marginBottom: '4px'}}>
                                  {task.description} <strong style={{color: task.status === 'Completed' ? 'var(--success-color)' : 'var(--warning-color)'}}>({task.status})</strong>
                              </li>
                          ))
                      )}
                  </ul>
              </div>

            </div>
            <div className="staff-card-actions" style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}>
              
              {assigningTaskTo === member.email ? (
                  <form onSubmit={(e) => handleAssignTaskSubmit(e, member.email)} style={{width: '100%', display: 'flex', gap: '0.5rem'}}>
                      <input 
                         type="text" 
                         autoFocus
                         placeholder="Task description..." 
                         value={newTaskDesc}
                         onChange={(e) => setNewTaskDesc(e.target.value)}
                         style={{flex: 1, padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)'}}
                         required
                      />
                      <button type="submit" className="submit-staff-btn" style={{padding: '0.5rem'}}>Assign</button>
                      <button type="button" className="remove-btn" style={{padding: '0.5rem', gridColumn: 'span 2'}} onClick={() => setAssigningTaskTo(null)}>Cancel</button>
                  </form>
              ) : (
                  <>
                    <button 
                        className="submit-staff-btn"
                        style={{flex: 1}}
                        onClick={() => setAssigningTaskTo(member.email)}
                    >
                        Assign Task
                    </button>
                    <button 
                        className="remove-btn"
                        style={{flex: 1}}
                        onClick={() => handleRemoveStaff(member.id)}
                    >
                        Remove Access
                    </button>
                  </>
              )}
            </div>
          </div>
        ))}
        {staff.length === 0 && (
          <div className="empty-staff">
            <p>No staff members found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffManagement;
