import React, { useEffect, useRef, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
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
      const ref = doc(db, "gallery", "main");
      const snap = await getDoc(ref);
      if (snap.exists()) setData(snap.data());
    }
    fetchGallery();
  }, []);

  useEffect(() => {
    if (!data) return;

    cardsRef.current.forEach((card, i) => {
      gsap.fromTo(
        card,
        {
          y: 120,
          rotateX: 8,
          scale: 0.95,
          opacity: 0
        },
        {
          y: 0,
          rotateX: 0,
          scale: 1,
          opacity: 1,
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

  if (!data) return null;

  return (
    <div className="bg-white pt-[110px] pb-20 font-serif overflow-hidden">

      {/* HEADER */}
      <div className="text-center mb-20">
        <h1 className="text-[3.2rem] font-bold text-[#0a345c]">
          {data.title}
        </h1>

        <div className="mx-auto my-5 h-1 w-[120px]
                        rounded bg-gradient-to-r
                        from-[#b58a41] via-[#e6c27a] to-[#b58a41]" />

        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          {data.subtitle}
        </p>
      </div>

      {/* GALLERY */}
      <div className="mx-auto w-[85%]
                      grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
                      gap-12 perspective-[1200px]">

        {data.images.map((src, i) => (
          <div
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            onClick={() => setSelected(src)}
            className="group cursor-pointer rounded-[20px]
                       border border-[rgba(181,138,65,0.25)]
                       bg-white/70 p-4
                       shadow-[0_15px_40px_rgba(0,60,90,0.18)]
                       backdrop-blur
                       transform-gpu
                       transition-all duration-700
                       hover:shadow-[0_30px_70px_rgba(0,60,90,0.3)]"
          >
            <div className="overflow-hidden rounded-[16px]">
              <img
                src={src}
                alt=""
                loading="lazy"
                className="h-[240px] w-full object-cover
                           transition-transform duration-[900ms]
                           group-hover:scale-110"
              />
            </div>

            <div
              className="mt-4 text-center text-[1.05rem]
                         font-semibold text-[#0a345c]
                         opacity-70 group-hover:opacity-100
                         transition-all duration-500"
            >
              EXPERIENCE VIEW {i + 1}
            </div>
          </div>
        ))}
      </div>

      {/* LIGHTBOX */}
      {selected && (
        <Lightbox src={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}

export default Gallery;
