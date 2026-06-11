import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../services/firebase";

export default function RoomDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);

  // ==========================
  // FETCH ROOM FROM FIREBASE
  // ==========================
  useEffect(() => {
    async function fetchRoom() {
      const ref = doc(db, "accommodation", "main");
      const snap = await getDoc(ref);

      if (!snap.exists()) return;

      const found = snap.data().rooms.find(r => r.id === id);
      setRoom(found);
    }

    fetchRoom();
  }, [id]);

  if (!room) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold mb-4">Room Not Found</h2>
        <button
          onClick={() => navigate("/accommodation")}
          className="bg-[#b68a5c] text-white px-6 py-3 rounded-lg font-semibold"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#f8f3ea]">

      {/* ==========================
           HERO SECTION
      ========================== */}
      <section
        className="relative h-[65vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${room.images[0]})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/70" />

        <div className="relative z-10 h-full flex flex-col justify-end px-[8%] pb-12 text-white">
          <h1 className="text-5xl font-semibold mb-2">
            {room.name}
          </h1>
          <p className="text-lg opacity-90 max-w-xl">
            {room.short}
          </p>
        </div>
      </section>

      {/* ==========================
           CONTENT
      ========================== */}
      <section className="max-w-[1250px] mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-14">

        {/* LEFT */}
        <div>
          <h2 className="text-3xl font-semibold mb-6 border-l-4 border-[#b68a5c] pl-4">
            Room Highlights
          </h2>

          <ul className="space-y-4 text-lg mb-10">
            <li>👥 Capacity: {room.persons} Guests</li>
            <li>🛏 Bed Size: {room.bed}</li>
            <li>📐 Room Size: {room.size}</li>
            <li>🌄 View: {room.view}</li>
          </ul>

          <p className="text-3xl font-bold text-[#b68a5c] mb-6">
            ₹ {room.price} <span className="text-base font-normal">/ Night</span>
          </p>

          <button
            onClick={() =>
              navigate("/booking", {
                state: {
                  room,
                  selectedItems: {},
                  totalAmount: room.price
                }
              })
            }
            className="bg-[#b68a5c] text-white px-8 py-3 rounded-lg text-lg font-semibold transition hover:bg-[#8d6b45] hover:scale-105"
          >
            Book This Room
          </button>
        </div>

        {/* RIGHT - GALLERY */}
        <div>
          <h2 className="text-3xl font-semibold mb-6 border-l-4 border-[#b68a5c] pl-4">
            Gallery
          </h2>

          <div className="grid grid-cols-2 gap-4">
            {room.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={room.name}
                className="w-full h-[200px] object-cover rounded-xl shadow-lg transition hover:scale-105"
              />
            ))}
          </div>
        </div>

      </section>
    </div>
  );
}
