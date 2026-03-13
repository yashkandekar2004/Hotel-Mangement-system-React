import React from "react";
import "./CustomerDashboard.css";

const CustomerDashboard = ({ user, setPage }) => {
  return (
    <div className="customer-dashboard">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Grandeur, {user.name}</h1>
          <p>Experience luxury, comfort, and exceptional service.</p>
        </div>
      </div>

      <div className="services-grid">
        <div className="service-card" onClick={() => setPage("bookRoom")}>
          <div className="service-icon">🛏️</div>
          <h3>Book a Stay</h3>
          <p>Find the perfect room for your upcoming trip. Browse our selection of luxury suites and comfortable standard rooms.</p>
          <button className="service-btn">Explore Rooms →</button>
        </div>

        <div className="service-card" onClick={() => setPage("addFood")}>
          <div className="service-icon">🍽️</div>
          <h3>In-Room Dining</h3>
          <p>Craving a late-night snack or a hearty breakfast? Order from our gourmet menu directly to your room.</p>
          <button className="service-btn">View Menu →</button>
        </div>

        <div className="service-card">
          <div className="service-icon">🛎️</div>
          <h3>Request Service</h3>
          <p>Need extra towels, a wake-up call, or assistance with your luggage? Let our staff know.</p>
          <button className="service-btn secondary" disabled>Coming Soon</button>
        </div>
      </div>

      <div className="info-section">
        <h2>Your Current Stay</h2>
        <div className="info-card empty">
          <p>You don't have any active bookings right now.</p>
          <button className="primary-btn mt-1" onClick={() => setPage("bookRoom")}>Book Now</button>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
