import { useEffect, useState } from "react";
import axios from "axios";

function GalleryBlock() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchGallery() {
      try {
        // Fetching through your Spring Boot Backend
        const res = await axios.get("http://localhost:8080/api/admin/all-rooms");
        const blockData = res.data.find(item => item.id === "galleryBlock");
        if (blockData) {
          setData(blockData);
        }
      } catch (err) {
        console.error("GalleryBlock fetch error:", err);
      }
    }
    fetchGallery();
  }, []);

  if (!data || !Array.isArray(data.images)) return null;

  return (
    <section className="py-16 px-6 text-center bg-[#f9f9f9]">
      <h2 className="text-[2.7rem] font-serif text-[#444] mb-4">
        {data.title}
      </h2>

      <p className="text-gray-600 max-w-xl mx-auto mb-12">
        {data.subtitle}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1.2rem] max-w-7xl mx-auto">
        {data.images.slice(0, 6).map((src, i) => ( // Showing first 6 images for the block
          <div key={i} className="overflow-hidden rounded-[10px] bg-[#e8e8e8]">
            <img
              src={src}
              alt={`Gallery ${i + 1}`}
              loading="lazy"
              className="w-full h-[260px] object-cover rounded-[10px] transition-all duration-500 ease-out hover:scale-105"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default GalleryBlock;