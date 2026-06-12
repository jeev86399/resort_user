// src/components/home/About.js
import React, { useEffect, useState } from "react";
import "./About.css";

// Firebase Imports
import { db } from "../../services/firebase";
import { collection, getDocs, query, orderBy, doc, getDoc } from "firebase/firestore";

function About() {
  const [showMore, setShowMore] = useState(false);
  
  // States for dynamic data
  const [pageData, setPageData] = useState(null);
  const [features, setFeatures] = useState([]);
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        // 1. Fetch Static Text (Story, Philosophy, Promise)
        const pageSnap = await getDoc(doc(db, "siteSettings", "aboutPage"));
        if (pageSnap.exists()) setPageData(pageSnap.data());

        // 2. Fetch Features
        const featSnap = await getDocs(query(collection(db, "aboutFeatures"), orderBy("order", "asc")));
        setFeatures(featSnap.docs.map(d => ({ id: d.id, ...d.data() })));

        // 3. Fetch Experts
        const expSnap = await getDocs(query(collection(db, "aboutExperts"), orderBy("order", "asc")));
        setExperts(expSnap.docs.map(d => ({ id: d.id, ...d.data() })));

        setLoading(false);
      } catch (error) {
        console.error("Error loading About page:", error);
        setLoading(false);
      }
    };
    fetchAboutData();
  }, []);

  if (loading || !pageData) return <div className="loading">Loading our story...</div>;

  return (
    <div className="about-page">
      {/* Hero Section */}
      <div className="hero-video-container">
        <video key={pageData.heroVideo} autoPlay loop muted className="hero-video">
          <source src={pageData.heroVideo} type="video/mp4" />
        </video>
        <div className="hero-content">
          <h1>WELCOME TO RADHA SERENITY RESORT</h1>
          <p>Step into a world where nature, luxury, and timeless comfort come together.</p>
        </div>
      </div>

      {/* Our Story */}
      <section className="section story">
        <div className="story-text">
          <h2>Our Story</h2>
          <p>{pageData.storyText}</p>
        </div>
        <div className="story-image">
          <img src={pageData.storyImage} alt="Resort Story" />
        </div>
      </section>

      {/* Philosophy */}
      <section className="section philosophy">
        <h2>Our Philosophy</h2>
        <p>{pageData.philosophy}</p>
      </section>

      {/* Unique Features (Dynamic Grid) */}
      <section className="section features">
        <h2>What Makes Us Unique</h2>
        <div className="feature-cards">
          {features.map((feat, idx) => (
            <div 
              key={feat.id} 
              className={`card ${idx > 2 && !showMore ? "hide-on-mobile" : ""} ${(idx > 2 && showMore) ? "show" : ""}`}
              style={{ display: (idx > 2 && !showMore) ? 'none' : 'block' }}
            >
              <h3>{feat.title}</h3>
              <p>{feat.desc}</p>
            </div>
          ))}
        </div>
        {features.length > 3 && (
          <button className="toggle-btn" onClick={() => setShowMore(!showMore)}>
            {showMore ? "Show Less" : "Show More"}
          </button>
        )}
      </section>

      {/* Experts (Dynamic Team) */}
      <section className="section experts">
        <h2>Meet Our Experts</h2>
        <div className="expert-cards">
          {experts.map(exp => (
            <div className="expert" key={exp.id}>
              <img src={exp.img} alt={exp.name} />
              <h4>{exp.name}</h4>
              <p>{exp.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Promise */}
      <section className="section promise">
        <h2>Our Promise</h2>
        <p>{pageData.promise}</p>
        <button className="cta-button">Book Your Escape</button>
      </section>
    </div>
  );
}

export default About;
