import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../services/firebase";

function DiningBlock() {
  const [data, setData] = useState(null);

  // Fetch Firebase data
  useEffect(() => {
    const fetchData = async () => {
      const ref = doc(db, "siteSettings", "diningBlock");
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setData(snap.data());
      }
    };
    fetchData();
  }, []);

  // Parallax
  useEffect(() => {
    const handleScroll = () => {
      const section = document.querySelector(".dining-block");
      if (!section) return;
      section.style.backgroundPositionY = `${window.scrollY * 0.3}px`;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!data) return null;

  return (
    <section
      className="dining-block relative h-[70vh] w-full bg-cover bg-center bg-fixed flex items-center justify-center"
      style={{ backgroundImage: `url(${data.backgroundImage})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* CONTENT */}
      <div className="relative z-10 text-center px-6 max-w-3xl">
        
        {/* 🔥 MAIN DINING HEADING */}
        <h1 className="text-white text-6xl md:text-4xl font-semibold tracking-[6px] uppercase mb-6">
          Dining
        </h1>

        {/* Description */}
        <p className="text-white text-lg md:text-base leading-relaxed mb-8">
          {data.description}
        </p>

        {/* Button */}
        <a
          href={data.buttonPath}
          className="inline-block bg-white text-black px-8 py-3 rounded-full font-bold uppercase tracking-wider transition hover:scale-105"
        >
          {data.buttonText}
        </a>
      </div>
    </section>
  );
}

export default DiningBlock;
