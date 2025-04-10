import React, { useState, useEffect } from "react";
import "./FoodOrderList.css";

const FoodOrderList = ({ refresh }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/hotel/food-orders/")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("Error fetching food orders:", err));
  }, [refresh]);

  return (
    <div className="food-order-list">
      <h2>Food Orders</h2>
      {orders.length === 0 ? (
        <p>No food orders yet.</p>
      ) : (
        <div className="food-order-grid">
          {orders.map((order) => (
            <div className="food-order-card" key={order.id}>
              <p><strong>Room:</strong> {order.room_id}</p>
              <p><strong>Item:</strong> {order.item_name}</p>
              <p><strong>Quantity:</strong> {order.quantity}</p>
              <p><strong>Total Price:</strong> ₹{order.price}</p>
              <p><strong>Order Time:</strong> {new Date(order.order_time).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FoodOrderList;
