import React, { useState, useEffect, useCallback } from "react";
import "./Booking.css";
import { useLocation, useNavigate } from "react-router-dom";

// ⭐ Firebase Auth
import { getAuth, onAuthStateChanged } from "firebase/auth";
// ⭐ Firebase Firestore
import { getFirestore, collection, addDoc } from "firebase/firestore";
// Assuming you have a firebase.js config file, if not, you need to create one
// and export the db instance from it.

// MASTER ROOMS (moved outside component to prevent re-declaration on re-renders)
const rooms = [
  {
    id: "royal-suite",
    name: "Royal Suite Room with Balcony",
    short: "Spacious suite with private balcony & valley views.",
    price: 5000,
    persons: 3,
    bed: "160 x 200",
    size: "45 - 50 m²",
    view: "Valley View",
    quantity: 1,
    images: [
      "https://www.theleela.com/prod/content/assets/aio-banner/dekstop/Royal%20Suite%20with%20Plunge%20Pool_1920x950.webp?VersionId=V7krssYNQ7ENqw9D3xihvT522RNHiZ03",
      "https://sp-ao.shortpixel.ai/client/q_glossy,ret_img,w_794,h_595/https://oasisoftheseasallureoftheseas.com/wp-content/uploads/2013/07/oasis-of-the-seas-allure-of-the-seas-royal-suite-balcony3.jpg",
    ],
    link: "/accommodation/royal-suite",
  },
  {
    id: "deluxe-room",
    name: "Deluxe Room",
    short: "Comfortable deluxe room with garden view.",
    price: 3500,
    persons: 2,
    bed: "140 x 200",
    size: "35 - 40 m²",
    view: "Garden View",
    quantity: 1,
    images: [
      "https://www.ohotelsindia.com/pune/images/afac6de5e93b1d2018cc56a76528cdd2.jpg",
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1400&q=60",
    ],
    link: "/accommodation/deluxe-room",
  },
  {
    id: "lake-villa",
    name: "Lake Villa",
    short: "Private villa with direct lake access and pool.",
    price: 8900,
    persons: 4,
    bed: "King",
    size: "120 m²",
    view: "Lakefront",
    quantity: 1,
    images: [
      "https://www.lakecanopy.com/images/lakecanopy-poolvilla-pool.webp",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=60",
    ],
    link: "/accommodation/lake-villa",
  },
];

function Booking() {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore(); // Initialize Firestore

  // Check if user logged in → Member Rate Unlock
  const [isMember, setIsMember] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setIsMember(!!user); // true if logged in
    });
    return () => unsub();
  }, [auth]);

  // If user navigated from RoomDetail or Accommodation
  const {
    table = "",
    session = "",
    diningSelection: diningSelectionFromState = {},
    room: roomFromState = null,
    discount: discountFromState = 0,
  } = location.state || {};

  // FORM STATE
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
    table: table || "",
    session: session || "",
    selectedItems: diningSelectionFromState.items || {},
    diningTotal: diningSelectionFromState.total || 0,
    totalAmount: 0, // Will be calculated in useEffect
    selectedRoomIds: roomFromState ? [roomFromState.id] : [],
    quantities: roomFromState ? { [roomFromState.id]: 1 } : {},
  });

  // Extracted total calculation to a reusable function to keep the code DRY
  const calculateRoomTotal = useCallback(
    (selectedRoomIds, quantities, isMember, discount) => {
      let roomTotal = rooms
        .filter((r) => selectedRoomIds.includes(r.id))
        .reduce((sum, r) => sum + r.price * (quantities[r.id] || 1), 0);

      // Apply member discount
      if (isMember) roomTotal *= 0.9;

      // Apply offer discount
      if (discount > 0) roomTotal *= 1 - discount / 100;

      return Math.round(roomTotal);
    },
    [] // rooms is now stable, so we can remove it from dependencies
  );

  // SET ROOM & DISCOUNT ON LOAD
  useEffect(() => {
    setFormData((prev) => {
      const newSelectedRoomIds = [...prev.selectedRoomIds];
      const newQuantities = { ...prev.quantities };

      // If coming from Room Details page, add the room if it's not already selected
      if (roomFromState && !newSelectedRoomIds.includes(roomFromState.id)) {
        newSelectedRoomIds.push(roomFromState.id);
        if (!newQuantities[roomFromState.id]) {
          newQuantities[roomFromState.id] = 1; // Default to 1
        }
      }

      const roomTotal = calculateRoomTotal(
        newSelectedRoomIds,
        newQuantities,
        isMember,
        discountFromState
      );

      const diningTotal = diningSelectionFromState.total || 0;
      const grandTotal = roomTotal + diningTotal;

      return {
        ...prev,
        selectedRoomIds: newSelectedRoomIds,
        quantities: newQuantities,
        selectedItems: diningSelectionFromState.items || {},
        diningTotal: diningTotal,
        totalAmount: grandTotal,
      };
    });
  }, [
    roomFromState, // Add roomFromState to dependencies
    isMember,
    discountFromState,
    diningSelectionFromState,
    calculateRoomTotal,
  ]);

  // HANDLE INPUT CHANGES
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };
  // QUANTITY CHANGE
  const handleQuantityChange = (roomId, qty) => {
    setFormData((prev) => {
      const quantities = { ...prev.quantities, [roomId]: Number(qty) };
      const roomTotal = calculateRoomTotal(
        prev.selectedRoomIds,
        quantities,
        isMember,
        discountFromState
      );

      const grandTotal = roomTotal + prev.diningTotal;

      return { ...prev, quantities, totalAmount: grandTotal };
    });
  };

  // SELECT ROOM
  const handleSelectRoom = (room) => {
    setFormData((prev) => {
      let selected = [...prev.selectedRoomIds];

      if (selected.includes(room.id)) {
        selected = selected.filter((id) => id !== room.id);
      } else {
        selected.push(room.id);
      }

      const quantities = { ...prev.quantities };
      if (!quantities[room.id]) quantities[room.id] = 1;

      const roomTotal = calculateRoomTotal(
        selected,
        quantities,
        isMember,
        discountFromState
      );

      const grandTotal = roomTotal + prev.diningTotal;

      return { ...prev, selectedRoomIds: selected, quantities, totalAmount: grandTotal };
    });
  };

  const handleViewDetails = (room) => {
    navigate(`/accommodation/${room.id}`, { state: { room } });
  };

  // ⭐ MEMBER UNLOCK — redirect to signup if not logged in
  const handleMemberUnlock = () => {
    if (!isMember) {
      navigate("/user-signup");
    }
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.selectedRoomIds.length === 0) {
      alert("Please choose at least one room.");
      return;
    }

    try {
      // Create a payload with only the necessary data
      const bookingPayload = {
        ...formData,
        createdAt: new Date(), // Add a timestamp
        isMember,
      };

      // Add a new document with a generated id to the "bookings" collection
      const docRef = await addDoc(collection(db, "bookings"), bookingPayload);

      alert(
        `Booking confirmed successfully! Your Booking ID is: ${docRef.id}`
      );
      navigate("/"); // Optional: redirect to homepage after booking
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("There was an error with your booking. Please try again.");
    }
  };

  const safeSelectedItems = formData.selectedItems || {};
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="booking-page">
      <div className="booking-container">
        <h2>Book Your Stay</h2>

        <p className="booking-sub">
          {table && `Table: ${table}`} {session && `• Session: ${session}`}
        </p>

        <h3 className="section-title">Choose Accommodation</h3>

        {/* ⭐ ROOM LIST */}
        <div className="rooms-grid" style={{ marginBottom: 18 }}>
          {rooms.map((r) => (
            <div
              key={r.id}
              className={`room-card ${
                formData.selectedRoomIds.includes(r.id) ? "selected" : ""
              }`}
              onClick={() => handleSelectRoom(r)}
            >
              <div className="room-thumb">
                <img src={r.images?.[0] || ""} alt={r.name} />
              </div>

              <div className="room-body">
                <h4>{r.name}</h4>
                <p className="room-short">{r.short}</p>

                <div className="room-meta">
                  <span>👥 {r.persons}</span>
                  <span>🛏 {r.bed}</span>
                  <span>📐 {r.size}</span>
                </div>

                {formData.selectedRoomIds.includes(r.id) && (
                  <select
                    className="qty-select"
                    value={formData.quantities[r.id] || 1}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) =>
                      handleQuantityChange(r.id, e.target.value)
                    }
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                )}

                <div className="room-actions">

                  {/* VIEW DETAILS */}
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={(ev) => {
                      ev.stopPropagation();
                      handleViewDetails(r);
                    }}
                  >
                    View Details
                  </button>

                  {/* ⭐ MEMBER RATE */}
                  <button
                    type="button"
                    className="btn btn-member"
                    onClick={(ev) => {
                      ev.stopPropagation();
                      handleMemberUnlock();
                    }}
                    style={{
                      color: isMember ? "green" : "#b88a44",
                      fontWeight: 600,
                    }}
                  >
                    {isMember
                      ? "10% Member Rate Applied ✓"
                      : "Member Rate • Unlock"}
                  </button>

                  {/* SELECT BUTTON */}
                  <button
                    type="button"
                    className={`btn ${
                      formData.selectedRoomIds.includes(r.id)
                        ? "btn-ghost"
                        : "btn-primary"
                    }`}
                    onClick={(ev) => {
                      ev.stopPropagation();
                      handleSelectRoom(r);
                    }}
                  >
                    {formData.selectedRoomIds.includes(r.id)
                      ? "Selected"
                      : `Select • ₹ ${r.price}`}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SELECTED ROOMS */}
        {formData.selectedRoomIds.length > 0 && (
          <div className="selected-room-preview" style={{ textAlign: "left" }}>
            <h4>Selected Rooms:</h4>
            <ul>
              {rooms
                .filter((r) => formData.selectedRoomIds.includes(r.id))
                .map((r) => (
                  <li key={r.id}>
                    {r.name} • ₹ {r.price} ×{" "}
                    {formData.quantities[r.id] || 1} ={" "}
                    <b>
                      ₹ {r.price * (formData.quantities[r.id] || 1)}
                    </b>
                  </li>
                ))}
            </ul>

            {/* DISCOUNT SUMMARY */}
            <div className="discount-summary" style={{marginTop: 10}}>
              {isMember && <p className="discount-line">
                Member Discount: <span>10%</span>
              </p>}
              {discountFromState > 0 && <p className="discount-line">
                Special Offer: <span>{discountFromState}%</span>
              </p>}
            </div>

            <p>
              Total for Rooms:
              <span style={{fontWeight: 600}}> ₹ {formData.totalAmount - formData.diningTotal}</span>
            </p>
          </div>
        )}

        {/* MENU SUMMARY */}
        <div className="menu-summary" style={{ textAlign: "left" }}>
          <h4>Selected Menu & Pricing</h4>
          {Object.keys(safeSelectedItems).length === 0 ? (
            <p>No menu items selected.</p>
          ) : (
            <ul>
              {Object.entries(safeSelectedItems).map(([id, qty]) => (
                qty > 0 && <li key={id}>
                  {diningSelectionFromState.menu?.find(i => i.id === Number(id))?.name || `Item ${id}`}
                  &times; {qty}
                </li>
              ))}
            </ul>
          )}

          <p style={{ fontWeight: "600" }}>
          </p>
        </div>

        {/* GRAND TOTAL */}
        <div className="grand-total-summary" style={{ textAlign: "left", marginTop: 20, paddingTop: 20, borderTop: '1px solid #eee' }}>
          <h3 style={{
            fontSize: '1.5rem',
            color: '#b88a44'
          }}>
            Grand Total: ₹ {formData.totalAmount}
          </h3>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <div style={{ display: "flex", gap: 10 }}>
            <input
              type="date"
              name="checkIn"
              value={formData.checkIn}
              onChange={handleChange}
              required
              min={today}
              style={{ flex: 1 }}
            />

            <input
              type="date"
              name="checkOut"
              value={formData.checkOut}
              onChange={handleChange}
              required
              min={formData.checkIn || today}
              style={{ flex: 1 }}
            />
          </div>

          <input
            type="number"
            name="guests"
            min="1"
            value={formData.guests}
            onChange={handleChange}
          />

          <button type="submit" className="btn btn-submit">
            Book Now
          </button>
        </form>
      </div>
    </div>
  );
}

export default Booking;
