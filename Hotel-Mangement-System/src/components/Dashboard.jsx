import React, { useEffect, useState } from "react";
import "./Dashboard.css";

const Dashboard = () => {
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/hotel/rooms")
      .then((res) => res.json())
      .then((data) => setRooms(data))
      .catch((err) => console.error("Error fetching rooms:", err));

    fetch("http://localhost:5000/hotel/bookings")
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch((err) => console.error("Error fetching bookings:", err));
  }, []);

  const occupiedRooms = bookings.length;
  const totalRooms = rooms.length;
  const availableRooms = totalRooms - occupiedRooms;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Dashboard Overview</h2>
        <p>Welcome back! Here's what's happening today.</p>
      </div>
      <div className="dashboard-cards">
        <div className="card total">
          <div className="card-icon">🏨</div>
          <div className="card-info">
            <h3 className="card-title">Total Rooms</h3>
            <p className="card-value">{totalRooms}</p>
          </div>
        </div>
        <div className="card occupied">
          <div className="card-icon">🔑</div>
          <div className="card-info">
            <h3 className="card-title">Occupied</h3>
            <p className="card-value">{occupiedRooms}</p>
          </div>
        </div>
        <div className="card available">
          <div className="card-icon">✅</div>
          <div className="card-info">
            <h3 className="card-title">Available</h3>
            <p className="card-value">{availableRooms}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
