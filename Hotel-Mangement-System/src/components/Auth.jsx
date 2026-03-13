import React, { useState } from "react";
import "./Auth.css";

const Auth = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setError("");
    setFormData({ name: "", email: "", password: "" });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Mock API Call Simulation
    setTimeout(() => {
      setIsLoading(false);
      
      if (isLogin) {
        if (formData.email === "admin@hotel.com" && formData.password === "admin123") {
          onLoginSuccess({ role: "ADMIN", name: "Super Admin", email: formData.email });
        } else if (formData.email === "staff@hotel.com" && formData.password === "staff123") {
          onLoginSuccess({ role: "STAFF", name: "Staff Member", email: formData.email });
        } else if (formData.email && formData.password) {
          // Any other login is considered a customer
          onLoginSuccess({ role: "CUSTOMER", name: "Valued Guest", email: formData.email });
        } else {
          setError("Please enter valid credentials.");
        }
      } else {
        if (!formData.name || !formData.email || !formData.password) {
          setError("All fields are required for sign up.");
        } else {
          // Mock successful customer signup -> immediately log them in
          onLoginSuccess({ role: "CUSTOMER", name: formData.name, email: formData.email });
        }
      }
    }, 1200);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">H</div>
          <h2>{isLogin ? "Welcome Back" : "Create Account"}</h2>
          <p>{isLogin ? "Please sign in to your account." : "Register to book a room and access guest services."}</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="input-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleInputChange}
                required={!isLogin}
              />
            </div>
          )}

          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="user@example.com"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit" className="auth-button" disabled={isLoading}>
            {isLoading ? <span className="loader"></span> : (isLogin ? "Sign In" : "Create Account")}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <span className="auth-link" onClick={handleToggle}>
              {isLogin ? "Sign Up" : "Log In"}
            </span>
          </p>
          <div className="demo-credentials"> {/* Keep this simple for ease of use */}
              <p style={{fontSize: '0.8rem', marginTop: '1rem', color: '#888'}}>
                  Admin: admin@hotel.com / admin123 <br/>
                  Staff: staff@hotel.com / staff123 <br/>
                  Customer: Any other email
              </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;

