import React from "react";
import "./Navbar.css";

function Navbar({ setPage, currentPage, user, onLogout }) {
  const adminNavItems = [
    { id: "adminDashboard", label: "Overview", icon: "📊" },
    { id: "addRoom", label: "Add Room", icon: "➕" },
    { id: "showRooms", label: "Manage Rooms", icon: "🚪" },
    { id: "showFoodOrders", label: "All Food Orders", icon: "📋" },
    { id: "staffManagement", label: "Manage Staff", icon: "👥" },
    // { id: "manageTasks", label: "Assign Tasks", icon: "📝" }, // To be implemented
  ];

  const staffNavItems = [
    { id: "staffDashboard", label: "My Tasks", icon: "✅" },
  ];

  const customerNavItems = [
    { id: "customerDashboard", label: "Home", icon: "🏠" },
    { id: "bookRoom", label: "Book a Room", icon: "🔑" },
    { id: "addFood", label: "Order Food", icon: "🍽️" },
    // { id: "myBookings", label: "My Bookings", icon: "📅" }, // To be implemented
  ];

  let currentNavItems = [];
  let portalName = "Grandeur";
  let portalIcon = "H";

  if (user?.role === "ADMIN") {
      currentNavItems = adminNavItems;
      portalName = "Admin Portal";
      portalIcon = "🛡️";
  } else if (user?.role === "STAFF") {
      currentNavItems = staffNavItems;
      portalName = "Staff Portal";
      portalIcon = "👔";
  } else if (user?.role === "CUSTOMER") {
      currentNavItems = customerNavItems;
  }

  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <div className="logo-icon">{portalIcon}</div>
        <h2>{portalName}</h2>
      </div>
      
      {/* Show currently logged in user info (optional, but good UX) */}
      <div style={{padding: '0 1rem', marginBottom: '1rem', color: 'var(--text-secondary)', fontSize: '0.85rem'}}>
          Welcome, {user?.name}
      </div>

      <ul className="nav-list">
        {currentNavItems.map((item) => (
          <li
            key={item.id}
            className={`nav-item ${currentPage === item.id ? "active" : ""}`}
            onClick={() => setPage(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </li>
        ))}
      </ul>
      <div className="sidebar-footer">
        <button className="admin-toggle-btn" onClick={onLogout} style={{backgroundColor: 'var(--danger-color)', color: 'white'}}>
          <span>🚪 Log Out</span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
