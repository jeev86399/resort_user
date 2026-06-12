// src/components/home/Home.js
import React, { useEffect, useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";

// 1. Firebase Imports
import { db } from "../../services/firebase";
import { doc, getDoc } from "firebase/firestore";

function Home() {
  // 2. States for dynamic content
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  // 3. Fetch data from siteSettings/home
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const docRef = doc(db, "siteSettings", "home");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setContent(docSnap.data());
        } else {
          console.log("No such document!");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching home data:", error);
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  if (loading) return <div className="loader">Loading...</div>;
  if (!content) return null;

  return (
    <div className="hero-container">
      {/* Background Video (Dynamic) */}
      <video key={content.heroVideo} autoPlay loop muted playsInline id="hero-video">
        <source src={content.heroVideo} type="video/mp4" />
      </video>

      {/* HERO TEXT (Dynamic) */}
      <div className="hero-content">
        <h1>{content.title}</h1>
        <p>{content.subtitle}</p>

        <Link to="/booking">
          <button className="hero-button">Book Your Stay</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
