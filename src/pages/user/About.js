import React, { useEffect, useState } from "react";
import axios from "axios";
import "./About.css";

function About() {
  const [showMore, setShowMore] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/admin/all-rooms");
        const aboutDoc = res.data.find(item => item.id === "aboutPage");
        if (aboutDoc) setData(aboutDoc);
      } catch (err) {
        console.error("About page fetch error:", err);
      }
    };
    fetchAboutData();
  }, []);

  if (!data) return <div className="pt-40 text-center">Loading Our Story...</div>;

  return (
    <div className="about-page">
      {/* Hero Section */}
      <div className="hero-video-container">
        <video autoPlay loop muted playsInline className="hero-video" key={data.heroVideo}>
          <source src={data.heroVideo} type="video/mp4" />
        </video>
        <div className="hero-content">
          <h1>{data.heroTitle}</h1>
          <p>{data.heroSubtitle}</p>
        </div>
      </div>

      {/* Our Story */}
      <section className="section story">
        <div className="story-text">
          <h2>Our Story</h2>
          <p>{data.storyText}</p>
        </div>
        <div className="story-image">
          <img src={data.storyImage} alt="Resort Story" />
        </div>
      </section>

      {/* Philosophy */}
      <section className="section philosophy">
        <h2>Our Philosophy</h2>
        <p>{data.philosophyText}</p>
      </section>

      {/* Unique Features */}
      <section className="section features">
        <h2>What Makes Us Unique</h2>
        <div className="feature-cards">
          {data.features.map((f, i) => (
            <div key={i} className={`card ${i >= 3 ? (showMore ? "show" : "hidden-card") : ""}`}>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
        <button className="toggle-btn" onClick={() => setShowMore(!showMore)}>
          {showMore ? "Show Less" : "Show More"}
        </button>
      </section>

      {/* Experts */}
      <section className="section experts">
        <h2>Meet Our Experts</h2>
        <div className="expert-cards">
          {data.experts.map((exp, i) => (
            <div key={i} className="expert">
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
        <p>{data.promiseText}</p>
        <button className="cta-button">Book Your Escape</button>
      </section>
    </div>
  );
}

export default About;