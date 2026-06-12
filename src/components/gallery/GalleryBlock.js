import { useEffect, useState, useRef } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../services/firebase";

function GalleryBlock() {
  const [data, setData] = useState(null);
  const sectionRef = useRef(null);

  // ==========================
  // FETCH FIRESTORE DATA
  // ==========================
  useEffect(() => {
    async function fetchGallery() {
      try {
        const ref = doc(db, "galleryBlock", "main");
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setData(snap.data());
        } else {
          console.warn("No gallery data found");
        }
      } catch (err) {
        console.error("Gallery fetch error:", err);
      }
    }

    fetchGallery();
  }, []);

  if (!data || !Array.isArray(data.images)) return null;

  return (
    <section
      ref={sectionRef}
      className="py-16 px-6 text-center bg-[#f9f9f9]"
    >
      {/* TITLE */}
      <h2 className="text-[2.7rem] font-serif text-[#444] mb-4">
        {data.title}
      </h2>

      {/* SUBTITLE */}
      <p className="text-gray-600 max-w-xl mx-auto mb-12">
        {data.subtitle}
      </p>

      {/* GRID */}
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-[1.2rem]
          max-w-7xl
          mx-auto
        "
      >
        {data.images.map((src, i) => (
          <div
            key={i}
            className="
              overflow-hidden
              rounded-[10px]
              bg-[#e8e8e8]
            "
          >
            <img
              src={src}
              alt={`Gallery ${i + 1}`}
              loading="lazy"
              className="
                w-full
                h-[260px]
                object-cover
                rounded-[10px]
                transition-all
                duration-500
                ease-out
                hover:scale-105
                hover:shadow-[0_10px_25px_rgba(0,0,0,0.25)]
              "
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default GalleryBlock;
