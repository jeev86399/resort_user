import React, { useEffect, useState } from "react";
import { db } from '../../services/firebase';

import { collection, getDocs, deleteDoc, updateDoc, doc } from "firebase/firestore";

function AdminBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    const snap = await getDocs(collection(db, "bookings"));
    const arr = [];
    snap.forEach(doc => arr.push({ id: doc.id, ...doc.data() }));
    setBookings(arr);
  };

  const approveBooking = async (id) => {
    await updateDoc(doc(db, "bookings", id), { status: "approved" });
    alert("Booking Approved");
    loadBookings();
  };

  const deleteBooking = async (id) => {
    await deleteDoc(doc(db, "bookings", id));
    alert("Booking Deleted");
    loadBookings();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin – All Bookings</h2>

      {bookings.map(b => (
        <div key={b.id} style={{ border: "1px solid #ccc", padding: "15px", marginBottom: "10px" }}>
          <h3>{b.name}</h3>
          <p>Email: {b.email}</p>
          <p>Room Type: {b.room}</p>
          <p>Check-In: {b.checkIn}</p>
          <p>Check-Out: {b.checkOut}</p>
          <p>Status: {b.status || "pending"}</p>

          <button onClick={() => approveBooking(b.id)} style={{ marginRight: "10px" }}>
            Approve
          </button>
          <button onClick={() => deleteBooking(b.id)} style={{ background: "red", color: "white" }}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default AdminBookings;
