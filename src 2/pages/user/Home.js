// Home.js
import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="hero-container">

      {/* Background Video */}
      <video autoPlay loop muted playsInline id="hero-video">
        <source 
          src="https://cdn.pixabay.com/video/2024/02/29/202392-918066367_large.mp4" 
          type="video/mp4" 
        />
      </video>

      {/* HERO TEXT */}
      <div className="hero-content">
        <h1>RADHA SERENITY RESORT</h1>
        <p>Where Nature Meets Pure Luxury</p>

        <Link to="/booking">
          <button className="hero-button">Book Your Stay</button>
        </Link>
      </div>

    </div>
  );
}

export default Home;
