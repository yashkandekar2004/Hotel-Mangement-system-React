import React, { useState } from "react";
import AddRoom from "./components/AddRoom";
import RoomList from "./components/RoomList";
import BookRoom from "./components/BookRoom";
import AddFoodOrder from "./components/AddFoodOrder";
import FoodOrderList from "./components/FoodOrderList";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  const [page, setPage] = useState("addRoom");
  const [refresh, setRefresh] = useState(false);

  const fetchFoodOrders = () => {
    setRefresh(!refresh);
  };
const handleBookingAdded = ()=>{
  setRefresh(!refresh);
}
  return (
    <div className="App">
      <Navbar setPage={setPage} />

      <div className="container">
        {page === "addRoom" && <AddRoom onRoomAdded={() => setRefresh(!refresh)} />}
        {page === "bookRoom" && <BookRoom  onBookingAdded={handleBookingAdded}/>}
        {page === "addFood" && <AddFoodOrder onFoodAdded={fetchFoodOrders} />}
        {page === "showRooms" && <RoomList refresh={refresh} />}
        {page === "showFoodOrders" && <FoodOrderList />}
      </div>
    </div>
  );
}

export default App;
