import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../services/firebase";

function Accommodation() {
  const [data, setData] = useState(null);

  // ==========================
  // FETCH FIREBASE DATA
  // ==========================
  useEffect(() => {
    async function fetchAccommodation() {
      try {
        const ref = doc(db, "accommodation", "main");
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setData(snap.data());
        }
      } catch (err) {
        console.error("Accommodation fetch error:", err);
      }
    }

    fetchAccommodation();
  }, []);

  if (!data || !Array.isArray(data.rooms)) return null;

  return (
    <div className="w-full">

      {/* ================================
         🎥 FULLSCREEN VIDEO HERO
         ================================ */}
      <section className="relative w-full h-[90vh] overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={data.heroVideo} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/35" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
          <h1 className="text-[3.5rem] font-bold mb-3">
            {data.heroTitle}
          </h1>
          <p className="text-lg opacity-90 max-w-xl">
            {data.heroSubtitle}
          </p>
        </div>
      </section>

      {/* ================================
         🏨 ROOMS GRID
         ================================ */}
      <section className="py-16 px-[8%] bg-white">
        <h2 className="text-[2.4rem] font-semibold text-center mb-10">
          Our Rooms & Villas
        </h2>

        <div
          className="
            grid
            gap-6
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {data.rooms.map((room) => (
            <article
              key={room.id}
              className="
                bg-white
                rounded-[14px]
                overflow-hidden
                shadow-[0_8px_22px_rgba(0,0,0,0.15)]
                transition
                duration-300
                hover:-translate-y-2
              "
            >
              {/* IMAGE */}
              <div className="h-[220px] overflow-hidden">
                <img
                  src={room.images[0]}
                  alt={room.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* BODY */}
              <div className="p-[18px_20px]">
                <h3 className="text-[1.4rem] font-semibold mb-1">
                  {room.name}
                </h3>

                <p className="text-[0.95rem] opacity-80 mb-3">
                  {room.short}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-gray-100 px-3 py-1 rounded text-sm">
                    👥 {room.persons}
                  </span>
                  <span className="bg-gray-100 px-3 py-1 rounded text-sm">
                    🛏 {room.bed}
                  </span>
                  <span className="bg-gray-100 px-3 py-1 rounded text-sm">
                    📐 {room.size}
                  </span>
                </div>

                {/* FOOTER */}
                <div className="flex items-center justify-between">
                  <span className="text-[1.2rem] font-semibold text-[#1f4e3d]">
                    ₹ {room.price} <small className="text-sm">/ night</small>
                  </span>

                  <Link
                    to={`/accommodation/${room.id}`}
                    state={{ room }}
                    className="
                      bg-[#1f4e3d]
                      text-white
                      px-4
                      py-2.5
                      rounded-lg
                      font-semibold
                      transition
                      hover:bg-[#163c2e]
                    "
                  >
                    View Details
                  </Link>
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