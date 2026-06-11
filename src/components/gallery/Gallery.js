import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lightbox from "./Lightbox";

gsap.registerPlugin(ScrollTrigger);

function Gallery() {
  const [data, setData] = useState(null);
  const [selected, setSelected] = useState(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    async function fetchGallery() {
      try {
        const res = await axios.get("http://localhost:8080/api/admin/all-rooms");
        const galleryData = res.data.find(item => item.id === "galleryMain");
        if (galleryData) setData(galleryData);
      } catch (err) {
        console.error("Gallery fetch error:", err);
      }
    }
    fetchGallery();
  }, []);

  useEffect(() => {
    if (!data) return;
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.fromTo(card,
        { y: 120, rotateX: 8, scale: 0.95, opacity: 0 },
        {
          y: 0, rotateX: 0, scale: 1, opacity: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "top 40%",
            scrub: true
          }
        }
      );
    });
  }, [data]);

  if (!data) return <div className="pt-40 text-center">Loading Gallery...</div>;

  return (
    <div className="bg-white pt-[110px] pb-20 font-serif overflow-hidden">
      <div className="text-center mb-20">
        <h1 className="text-[3.2rem] font-bold text-[#0a345c]">{data.title}</h1>
        <div className="mx-auto my-5 h-1 w-[120px] rounded bg-gradient-to-r from-[#b58a41] via-[#e6c27a] to-[#b58a41]" />
        <p className="text-lg text-gray-600 max-w-xl mx-auto">{data.subtitle}</p>
      </div>

      <div className="mx-auto w-[85%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 perspective-[1200px]">
        {data.images.map((src, i) => (
          <div
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            onClick={() => setSelected(src)}
            className="group cursor-pointer rounded-[20px] border border-[rgba(181,138,65,0.25)] bg-white/70 p-4 shadow-lg backdrop-blur transition-all duration-700 hover:shadow-2xl"
          >
            <div className="overflow-hidden rounded-[16px]">
              <img src={src} alt="" className="h-[240px] w-full object-cover transition-transform duration-[900ms] group-hover:scale-110" />
            </div>
            <div className="mt-4 text-center text-[1.05rem] font-semibold text-[#0a345c] opacity-70 group-hover:opacity-100">
              VIEW {i + 1}
            </div>
          </div>
        ))}
      </div>
      {selected && <Lightbox src={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

export default Gallery;