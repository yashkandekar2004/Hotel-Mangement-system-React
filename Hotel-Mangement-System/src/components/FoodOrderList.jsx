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
      <div className="list-header">
        <h2>Food Orders</h2>
        <p>Monitor recent room service requests.</p>
      </div>
      {orders.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🍽️</div>
          <p>No food orders found.</p>
        </div>
      ) : (
        <div className="food-order-grid">
          {orders.map((order) => (
            <div className="food-order-card" key={order.id}>
              <div className="order-header">
                <h3>Room {order.room_id}</h3>
                <span className="order-time">{new Date(order.order_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
              </div>
              <div className="order-body">
                <div className="order-item">
                  <span className="item-name">{order.item_name}</span>
                  <span className="item-qty">x{order.quantity}</span>
                </div>
                <div className="order-total">
                  <span>Total</span>
                  <span className="price">₹{order.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FoodOrderList;
