import React, { useState, useEffect } from "react";
import "./RoomList.css";

const RoomList = ({ refresh }) => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/hotel/rooms")
      .then((response) => response.json())
      .then((data) => setRooms(data))
      .catch((error) => console.error("Error fetching rooms:", error));
  }, [refresh]);

  return (
    <div className="room-list">
      <div className="list-header">
        <h2>Available Rooms</h2>
        <p>Manage and view all rooms in the hotel.</p>
      </div>
      {rooms.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🛏️</div>
          <p>No rooms added yet. Start by adding a new room.</p>
        </div>
      ) : (
        <div className="room-grid">
          {rooms.map((room) => (
            <div className="room-card" key={room.id}>
              <div className="room-card-header">
                <h3>Room {room.room_number}</h3>
                <span className={`status-badge ${room.status?.toLowerCase()}`}>
                  {room.status || 'Available'}
                </span>
              </div>
              <div className="room-card-body">
                <p><strong>Type:</strong> {room.type}</p>
                <p className="price"><strong>Price:</strong> ${room.price}<span className="per-night">/night</span></p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoomList;
