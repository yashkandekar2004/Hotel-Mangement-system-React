import React, { useState } from "react";
import "./AddRoom.css";

const AddRoom = ({ onRoomAdded }) => {
  const [room, setRoom] = useState({
    room_number: "",
    type: "",
    price: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/hotel/rooms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(room)
    })
      .then((response) => response.json())
      .then(() => {
        onRoomAdded(); 
        setRoom({ room_number: "", type: "", price: "" });
      })
      .catch((error) => console.error("Error adding room:", error));
  };

  return (
    <form className="add-room-form" onSubmit={handleSubmit}>
      <h2>Add Room</h2>
      <input
        type="text"
        placeholder="Room Number"
        value={room.room_number}
        onChange={(e) => setRoom({ ...room, room_number: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Room Type (Single, Double, Suite)"
        value={room.type}
        onChange={(e) => setRoom({ ...room, type: e.target.value })}
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={room.price}
        onChange={(e) => setRoom({ ...room, price: e.target.value })}
        required
      />
      <button type="submit">Add Room</button>
    </form>
  );
};

export default AddRoom;
