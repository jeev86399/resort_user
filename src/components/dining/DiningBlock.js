import React, { useEffect, useState } from "react";
import axios from "axios";

function DiningBlock() {
  const [data, setData] = useState(null);

  // Fetch data via Spring Boot Backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/admin/all-rooms");
        // Look for the specific 'diningBlock' configuration
        const blockData = res.data.find(item => item.id === "diningBlock");
        if (blockData) {
          setData(blockData);
        }
      } catch (err) {
        console.error("DiningBlock fetch error:", err);
      }
    };
    fetchData();
  }, []);

  // Parallax Logic (Keep as is, it's a great feature!)
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
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10 text-center px-6 max-w-3xl">
        <h1 className="text-white text-4xl font-semibold tracking-[6px] uppercase mb-6">
          {data.title || "Dining"}
        </h1>

        <p className="text-white text-lg md:text-base leading-relaxed mb-8">
          {data.description}
        </p>

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