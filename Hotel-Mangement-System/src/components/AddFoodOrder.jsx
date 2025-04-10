import React, { useState, useEffect } from "react";
import "./AddFoodOrder.css";

const AddFoodOrder = ({ onFoodAdded }) => {
  const [rooms, setRooms] = useState([]);
  const [order, setOrder] = useState({
    room_id: "",
    item_name: "",
    quantity: "",
    price: ""
  });

  useEffect(() => {
    fetch("http://localhost:5000/hotel/rooms")
      .then((res) => res.json())
      .then((data) => setRooms(data))
      .catch((err) => console.error("Error fetching rooms:", err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/hotel/food-orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order)
    })
      .then((res) => res.json())
      .then(() => {
        onFoodAdded();
        setOrder({ room_id: "", item_name: "", quantity: "", price: "" });
      })
      .catch((err) => console.error("Error placing food order:", err));
  };

  return (
    <form className="add-food-order-form" onSubmit={handleSubmit}>
      <h2>Place Food Order</h2>
      <select
        value={order.room_id}
        onChange={(e) => setOrder({ ...order, room_id: e.target.value })}
        required
      >
        <option value="">Select Room</option>
        {rooms.map((room) => (
          <option key={room.id} value={room.id}>
            {room.room_number} - {room.type}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Food Item"
        value={order.item_name}
        onChange={(e) => setOrder({ ...order, item_name: e.target.value })}
        required
      />
      <input
        type="number"
        placeholder="Quantity"
        value={order.quantity}
        onChange={(e) => setOrder({ ...order, quantity: e.target.value })}
        required
      />
      <input
        type="number"
        placeholder="Price per item"
        value={order.price}
        onChange={(e) => setOrder({ ...order, price: e.target.value })}
        required
      />
      <button type="submit">Order Food</button>
    </form>
  );
};

export default AddFoodOrder;
