import React from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <div className="admin-buttons">
        <button onClick={() => navigate("/admin/manage-rooms")}>
          Manage Rooms
        </button>

        <button onClick={() => navigate("/admin/bookings")}>
          View Bookings
        </button>
      </div>
    </div>
  );
}

export default AdminDashboard;
