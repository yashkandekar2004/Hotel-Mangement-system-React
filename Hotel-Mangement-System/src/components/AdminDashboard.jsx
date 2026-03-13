import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    occupancyRate: 0,
    activeStaff: 0,
    recentBookings: []
  });

  useEffect(() => {
    // Simulating fetching analytical data for the dashboard
    setTimeout(() => {
      setStats({
        totalRevenue: 24580,
        occupancyRate: 85,
        activeStaff: 24,
        recentBookings: [
          { id: "B-101", room: "101", guest: "Alice Smith", amount: 450, status: "Paid" },
          { id: "B-102", room: "205", guest: "Bob Johnson", amount: 800, status: "Pending" },
          { id: "B-103", room: "302", guest: "Charlie Brown", amount: 320, status: "Paid" },
        ]
      });
    }, 800);
  }, []);

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h2>Admin Overview</h2>
        <p>Monitor hotel performance and key metrics.</p>
      </div>

      <div className="metrics-grid">
        <div className="metric-card revenue">
          <div className="metric-icon">💰</div>
          <div className="metric-info">
            <h3>Total Revenue</h3>
            <p className="metric-value">${stats.totalRevenue.toLocaleString()}</p>
            <span className="metric-trend positive">↑ 12% from last month</span>
          </div>
        </div>

        <div className="metric-card occupancy">
          <div className="metric-icon">🏨</div>
          <div className="metric-info">
            <h3>Occupancy Rate</h3>
            <p className="metric-value">{stats.occupancyRate}%</p>
            <span className="metric-trend positive">↑ 5% from last week</span>
          </div>
        </div>

        <div className="metric-card staff">
          <div className="metric-icon">👥</div>
          <div className="metric-info">
            <h3>Active Staff</h3>
            <p className="metric-value">{stats.activeStaff}</p>
            <span className="metric-trend neutral">Across all departments</span>
          </div>
        </div>
      </div>

      <div className="recent-activity">
        <h3>Recent Transactions</h3>
        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Guest Name</th>
                <th>Room</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentBookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td>{booking.guest}</td>
                  <td>{booking.room}</td>
                  <td className="amount">${booking.amount}</td>
                  <td>
                    <span className={`status-pill ${booking.status.toLowerCase()}`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
