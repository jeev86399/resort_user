import React, { useState } from "react";
import { db } from '../../services/firebase';
import { collection, addDoc } from "firebase/firestore";

function ManageRooms() {
  const [roomName, setRoomName] = useState("");
  const [price, setPrice] = useState("");

  const addRoom = async () => {
    try {
      await addDoc(collection(db, "rooms"), {
        name: roomName,
        price: Number(price),
      });

      alert("Room Added Successfully!");
      setRoomName("");
      setPrice("");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="manage-rooms">
      <h2>Manage Rooms</h2>

      <input
        type="text"
        placeholder="Room Name"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Room Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <button onClick={addRoom}>Add Room</button>
    </div>
  );
}

export default ManageRooms;
