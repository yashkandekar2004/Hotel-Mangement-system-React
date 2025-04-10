import React from "react";
import "./Navbar.css";

function Navbar({ setPage }) {
  return (
    <nav className="navbar">
      <h2>🏨 Hotel Management</h2>
      <ul>
        <li onClick={() => setPage("addRoom")}>Add Room</li>
        <li onClick={() => setPage("bookRoom")}>Book Room</li>
        <li onClick={() => setPage("addFood")}>Add Food Order</li>
        <li onClick={() => setPage("showRooms")}>Show Rooms</li>
        <li onClick={() => setPage("showFoodOrders")}>Show Food Orders</li>
      </ul>
    </nav>
  );
}

export default Navbar;
