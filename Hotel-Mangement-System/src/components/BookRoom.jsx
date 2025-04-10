import React, { useState, useEffect } from "react";
import "./BookRoom.css";

const BookRoom = ({ onBookingAdded }) => {
  const [rooms, setRooms] = useState([]);
  const [booking, setBooking] = useState({
    guest_name: "",
    room_id: "",
    check_in: "",
    check_out: ""
  });

  useEffect(() => {
    fetch("http://localhost:5000/hotel/rooms")
      .then((response) => response.json())
      .then((data) => setRooms(data))
      .catch((error) => console.error("Error fetching rooms:", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/hotel/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(booking)
    })
      .then((response) => response.json())
      .then(() => {
        onBookingAdded();
        setBooking({
          guest_name: "",
          room_id: "",
          check_in: "",
          check_out: ""
        });
      })
      .catch((error) => console.error("Error booking room:", error));
  };

  return (
    <form className="book-room-form" onSubmit={handleSubmit}>
      <h2>Book Room</h2>
      <input
        type="text"
        placeholder="Guest Name"
        value={booking.guest_name}
        onChange={(e) =>
          setBooking({ ...booking, guest_name: e.target.value })
        }
        required
      />
      <select
        value={booking.room_id}
        onChange={(e) =>
          setBooking({ ...booking, room_id: e.target.value })
        }
        required
      >
        <option value="">Select Room</option>
        {rooms.map((room) => (
          <option key={room.id} value={room.id}>
            {room.room_number} - {room.type} (${room.price})
          </option>
        ))}
      </select>
      <input
        type="date"
        placeholder="Check-in Date"
        value={booking.check_in}
        onChange={(e) =>
          setBooking({ ...booking, check_in: e.target.value })
        }
        required
      />
      <input
        type="date"
        placeholder="Check-out Date"
        value={booking.check_out}
        onChange={(e) =>
          setBooking({ ...booking, check_out: e.target.value })
        }
        required
      />
      <button type="submit">Book Room</button>
    </form>
  );
};

export default BookRoom;
