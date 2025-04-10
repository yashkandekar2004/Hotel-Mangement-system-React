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
      <h2>Dashboard Overview</h2>
      <div className="dashboard-cards">
        <div className="card total">
          <h3>Total Rooms</h3>
          <p>{totalRooms}</p>
        </div>
        <div className="card occupied">
          <h3>Occupied Rooms</h3>
          <p>{occupiedRooms}</p>
        </div>
        <div className="card available">
          <h3>Available Rooms</h3>
          <p>{availableRooms}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
