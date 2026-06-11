import React, { useEffect, useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import axios from "axios";

function Home() {
  const [heroData, setHeroData] = useState({
    heroTitle: "RADHA SERENITY RESORT",
    heroSubtitle: "Where Nature Meets Pure Luxury",
    heroVideo: "https://cdn.pixabay.com/video/2024/02/29/202392-918066367_large.mp4"
  });

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/admin/all-rooms");
        const data = res.data.find(item => item.id === "main");
        
        if (data) {
          // Use functional update (prev) to remove dependencies warning
          setHeroData(prev => ({
            heroTitle: data.heroTitle || prev.heroTitle,
            heroSubtitle: data.heroSubtitle || prev.heroSubtitle,
            heroVideo: data.heroVideo || prev.heroVideo
          }));
        }
      } catch (err) {
        console.error("Hero data fetch error:", err);
      }
    };
    fetchHero();
    
    // Empty dependency array is now safe because we don't reference 'heroData' directly
  }, []);

  return (
    <div className="hero-container">
      {/* Background Video - the 'key' attribute ensures reload on URL change */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        id="hero-video" 
        key={heroData.heroVideo}
      >
        <source src={heroData.heroVideo} type="video/mp4" />
      </video>

      <div className="hero-content">
        <h1>{heroData.heroTitle}</h1>
        <p>{heroData.heroSubtitle}</p>

        <Link to="/booking">
          <button className="hero-button">Book Your Stay</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;