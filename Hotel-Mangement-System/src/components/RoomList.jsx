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
      <h2>Available Rooms</h2>
      {rooms.length === 0 ? (
        <p>No rooms added yet.</p>
      ) : (
        <ul>
          {rooms.map((room) => (
            <li key={room.id}>
              <p><strong>Room Number:</strong> {room.room_number}</p>
              <p><strong>Type:</strong> {room.type}</p>
              <p><strong>Price:</strong> ${room.price}</p>
              <p><strong>Status:</strong> {room.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RoomList;
