import React, { useState } from "react";
import "./ReserveDetails.css";
import { useLocation, useNavigate } from "react-router-dom";

function ReserveDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { session } = location.state || {};

  const [visitType, setVisitType] = useState("");
  const [roomNo, setRoomNo] = useState("");
  const [stayKey, setStayKey] = useState("");
  const [table, setTable] = useState("");
  const [staying, setStaying] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  // MENU DATA
  const sessionMenus = {
    morning: [
      { id: 1, name: "Idli", price: 50 },
      { id: 2, name: "Dosa", price: 60 },
      { id: 3, name: "Upma", price: 40 },
      { id: 4, name: "Fresh Juice", price: 80 },
    ],
    breakfast: [
      { id: 1, name: "Pongal", price: 60 },
      { id: 2, name: "Poori", price: 50 },
      { id: 3, name: "Vada", price: 40 },
      { id: 4, name: "Dosa", price: 60 },
      { id: 5, name: "Sweets", price: 70 },
    ],
    lunch: [
      { id: 1, name: "Kerala Meals", price: 180 },
      { id: 2, name: "Fish Fry", price: 250 },
      { id: 3, name: "Chicken Curry", price: 200 },
      { id: 4, name: "Biryani", price: 220 },
    ],
    evening: [
      { id: 1, name: "Samosa", price: 30 },
      { id: 2, name: "Cutlet", price: 50 },
      { id: 3, name: "Sandwich", price: 60 },
      { id: 4, name: "Tea/Coffee", price: 40 },
    ],
    dinner: [
      { id: 1, name: "Curries", price: 180 },
      { id: 2, name: "Rotis", price: 50 },
      { id: 3, name: "Kebabs", price: 200 },
      { id: 4, name: "Biryani", price: 220 },
      { id: 5, name: "Desserts", price: 100 },
    ],
    "late-night": [
      { id: 1, name: "Soups", price: 70 },
      { id: 2, name: "Sandwiches", price: 80 },
      { id: 3, name: "Milkshakes", price: 90 },
      { id: 4, name: "Light Bites", price: 60 },
    ],
  };

  const menu = sessionMenus[session] || [];
  const tables = ["Table 1", "Table 2", "Table 3", "Table 4", "Table 5"];

  // Menu quantities
  const [selectedItems, setSelectedItems] = useState({});

  const increaseQty = (item) => {
    setSelectedItems((prev) => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + 1,
    }));
  };

  const decreaseQty = (item) => {
    setSelectedItems((prev) => ({
      ...prev,
      [item.id]: prev[item.id] > 0 ? prev[item.id] - 1 : 0,
    }));
  };

  const hasSelectedItems = Object.values(selectedItems).some((qty) => qty > 0);

  // TOTAL
  const totalAmount = Object.keys(selectedItems).reduce((acc, id) => {
    const item = menu.find((m) => m.id === Number(id));
    const qty = selectedItems[id];
    return acc + item.price * qty;
  }, 0);

  // BOOKED PEOPLE SUBMIT
  const handleBookedPeopleSubmit = () => {
    if (!hasSelectedItems) {
      alert("Please select at least 1 quantity from menu.");
      return;
    }

    if (!roomNo || !stayKey || !table) {
      alert("Please fill all details for booked people.");
      return;
    }

    setShowPopup(true);
  };

  // NEW BOOKING SUBMIT
  const handleNewBookingSubmit = () => {
    if (!hasSelectedItems) {
      alert("Please select at least 1 quantity from the menu.");
      return;
    }

    if (!staying) {
      alert("Please select staying or dining.");
      return;
    }

    if (!table) {
      alert("Please select table number.");
      return;
    }

    if (staying === "stay") {
      navigate("/booking", {
  state: {
    table,
    session,
      diningSelection: { items: selectedItems, total: totalAmount, menu },
  },
});

    } else {
      setShowPopup(true);
    }
  };

  return (
    <div className="reserve-wrapper">
      <div className="reserve-left">
        <h2>Reserve Your Experience</h2>
        <p className="sub">
          {session ? `Session: ${session.replace("-", " ")}` : ""}
        </p>

        <label>Type of Visit</label>
        <select value={visitType} onChange={(e) => setVisitType(e.target.value)}>
          <option value="">Select Option</option>
          <option value="booked">Booked People</option>
          <option value="new">New Booking</option>
        </select>

        {visitType === "booked" && (
          <>
            <label>Enter Room Number</label>
            <input
              type="text"
              placeholder="Eg: A-204"
              value={roomNo}
              onChange={(e) => setRoomNo(e.target.value)}
            />

            <label>Enter Special Key</label>
            <input
              type="password"
              placeholder="Enter Key"
              value={stayKey}
              onChange={(e) => setStayKey(e.target.value)}
            />

            <label>Select Table</label>
            <select value={table} onChange={(e) => setTable(e.target.value)}>
              <option value="">Choose Table</option>
              {tables.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            <button className="book-btn" onClick={handleBookedPeopleSubmit}>
              Confirm Booking
            </button>
          </>
        )}

        {visitType === "new" && (
          <>
            <label>Are you staying in the resort?</label>
            <select value={staying} onChange={(e) => setStaying(e.target.value)}>
              <option value="">Select Option</option>
              <option value="stay">Yes, I am staying</option>
              <option value="dining">No, only dining</option>
            </select>

            {staying && (
              <>
                <label>Select Table</label>
                <select value={table} onChange={(e) => setTable(e.target.value)}>
                  <option value="">Choose Table</option>
                  {tables.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>

                <button className="book-btn" onClick={handleNewBookingSubmit}>
                  {staying === "stay"
                    ? "Go to Room Booking"
                    : "Confirm Table"}
                </button>
              </>
            )}
          </>
        )}
      </div>

      <div className="menu-right">
        <h3>Menu & Pricing</h3>

        {menu.length === 0 ? (
          <p>No menu available for this session.</p>
        ) : (
          menu.map((item) => (
            <div className="menu-item" key={item.id}>
              <div>
                <h4>{item.name}</h4>
                <p>₹ {item.price}</p>
              </div>

              <div className="qty-box">
                <button onClick={() => decreaseQty(item)}>-</button>
                <span>{selectedItems[item.id] || 0}</span>
                <button onClick={() => increaseQty(item)}>+</button>
              </div>
            </div>
          ))
        )}

        <div className="total-box">
          <h3>Total: ₹ {totalAmount}</h3>
        </div>
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Booking Confirmed!</h3>
            <p>
              {visitType === "booked"
                ? `Room No: ${roomNo}, Table: ${table}, Session: ${session}`
                : `Table: ${table}, Session: ${session}`}
            </p>

            <button onClick={() => setShowPopup(false)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReserveDetails;
