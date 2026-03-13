import React, { useState } from "react";
import AddRoom from "./components/AddRoom";
import RoomList from "./components/RoomList";
import BookRoom from "./components/BookRoom";
import AddFoodOrder from "./components/AddFoodOrder";
import FoodOrderList from "./components/FoodOrderList";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard"; 
import Auth from "./components/Auth";
import AdminDashboard from "./components/AdminDashboard";
import StaffManagement from "./components/StaffManagement";
import StaffDashboard from "./components/StaffDashboard";
import CustomerDashboard from "./components/CustomerDashboard";
import "./App.css";

function App() {
  // Global User State. null means not logged in.
  // Example logged in state: { role: 'ADMIN' | 'STAFF' | 'CUSTOMER', name: '...', email: '...' }
  const [user, setUser] = useState(null); 
  const [page, setPage] = useState("dashboard");
  const [refresh, setRefresh] = useState(false);

  // Global Staff State
  const [staff, setStaff] = useState([
    { id: "S-001", name: "Sarah Connor", email: "sarah@hotel.com", role: "Receptionist", status: "Active" },
    { id: "S-002", name: "Staff Member", email: "staff@hotel.com", role: "Manager", status: "Active" }, // The demo staff
    { id: "S-003", name: "Elena Rojas", email: "elena@hotel.com", role: "Housekeeping", status: "On Leave" },
  ]);

  // Global Tasks State
  const [tasks, setTasks] = useState([
      { id: 'T1', description: 'Clean Room 101', assignedTo: 'staff@hotel.com', status: 'Pending' },
      { id: 'T2', description: 'Deliver Breakfast to 205', assignedTo: 'staff@hotel.com', status: 'Completed' }
  ]);

  const fetchFoodOrders = () => setRefresh(!refresh);
  const handleBookingAdded = () => setRefresh(!refresh);

  const handleLoginSuccess = (loggedInUser) => {
    setUser(loggedInUser);
    // Redirect based on role
    if (loggedInUser.role === "ADMIN") {
        setPage("adminDashboard");
    } else if (loggedInUser.role === "STAFF") {
        setPage("staffDashboard");
    } else {
        setPage("customerDashboard");
    }
  };

  const handleLogout = () => {
      setUser(null);
      setPage("dashboard");
  };

  const updateTaskStatus = (taskId, newStatus) => {
      setTasks(tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
  };

  return (
    <div className="App">
      {!user ? (
        <Auth onLoginSuccess={handleLoginSuccess} />
      ) : (
        <>
          <Navbar 
            setPage={setPage} 
            currentPage={page} 
            user={user}
            onLogout={handleLogout}
          />
          <main className="main-content">
            <div className="container">
              
              {/* --- ADMIN ROUTES --- */}
              {user.role === "ADMIN" && (
                  <>
                      {page === "adminDashboard" && <AdminDashboard />}
                      {page === "addRoom" && <AddRoom onRoomAdded={() => setRefresh(!refresh)} />}
                      {page === "showRooms" && <RoomList refresh={refresh} />}
                      {page === "showFoodOrders" && <FoodOrderList refresh={refresh} />}
                      {page === "staffManagement" && (
                          <StaffManagement 
                              staff={staff} 
                              setStaff={setStaff} 
                              tasks={tasks} 
                              setTasks={setTasks} 
                          />
                      )}
                  </>
              )}

              {/* --- STAFF ROUTES --- */}
              {user.role === "STAFF" && (
                  <>
                      {page === "staffDashboard" && (
                          <StaffDashboard 
                              user={user} 
                              tasks={tasks} 
                              updateTaskStatus={updateTaskStatus} 
                          />
                      )}
                  </>
              )}

              {/* --- CUSTOMER ROUTES --- */}
              {user.role === "CUSTOMER" && (
                  <>
                      {page === "customerDashboard" && (
                           <CustomerDashboard user={user} setPage={setPage} />
                      )}
                      {page === "bookRoom" && <BookRoom onBookingAdded={handleBookingAdded} />}
                      {page === "addFood" && <AddFoodOrder onFoodAdded={fetchFoodOrders} />}
                  </>
              )}

            </div>
          </main>
        </>
      )}
    </div>
  );
}

export default App;
