import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Using Axios for the backend call

function Accommodation() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchAccommodation() {
      try {
        // CALLING YOUR SPRING BOOT BACKEND INSTEAD OF FIREBASE DIRECTLY
        const res = await axios.get("http://localhost:8080/api/admin/all-rooms");
        
        // Find the 'main' document from the list
        const mainDoc = res.data.find(item => item.id === "main");
        if (mainDoc) {
          setData(mainDoc);
        }
      } catch (err) {
        console.error("Backend fetch error:", err);
      }
    }
    fetchAccommodation();
  }, []);

  if (!data || !Array.isArray(data.rooms)) return <div className="text-center py-20">Loading Luxury...</div>;

  return (
    <div className="w-full">
      {/* 🎥 VIDEO HERO (Now Dynamic from DB) */}
      <section className="relative w-full h-[90vh] overflow-hidden">
        <video className="absolute inset-0 w-full h-full object-cover" autoPlay loop muted playsInline key={data.heroVideo}>
          <source src={data.heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/35" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
          <h1 className="text-[3.5rem] font-bold mb-3">{data.heroTitle}</h1>
          <p className="text-lg opacity-90 max-w-xl">{data.heroSubtitle}</p>
        </div>
      </section>

      {/* 🏨 ROOMS GRID (Mapping through your Firestore 'rooms' array) */}
      <section className="py-16 px-[8%] bg-white">
        <h2 className="text-[2.4rem] font-semibold text-center mb-10">Our Rooms & Villas</h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {data.rooms.map((room) => (
            <article key={room.id} className="bg-white rounded-[14px] overflow-hidden shadow-lg transition hover:-translate-y-2">
              <div className="h-[220px] overflow-hidden">
                <img src={room.images[0]} alt={room.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-[18px_20px]">
                <h3 className="text-[1.4rem] font-semibold mb-1">{room.name}</h3>
                <p className="text-[0.95rem] opacity-80 mb-3">{room.short}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[1.2rem] font-semibold text-[#1f4e3d]">₹ {room.price}</span>
                  <Link to={`/accommodation/${room.id}`} state={{ room }} className="bg-[#1f4e3d] text-white px-4 py-2 rounded-lg">View Details</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Accommodation;