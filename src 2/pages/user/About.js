// About.js
import React from "react";
import "./About.css";

// Use URLs directly — no import needed
const heroVideo =
  "https://cdn.pixabay.com/video/2024/02/29/202392-918066367_large.mp4";

const img1 =
  "https://w0.peakpx.com/wallpaper/392/364/HD-wallpaper-luxury-resort-resort-beach-beautiful-magic-sunset-pool-lights-luxury.jpg";

const img2 =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRndn-uE70oB6kXRkp-y1nHEIWThinC9rLa-g&s";

const img3 =
  "https://i.pinimg.com/736x/3b/b1/b8/3bb1b8cf846fae3eefd8175c3630cf83.jpg";

const img4 =
  "https://img.freepik.com/free-photo/cute-monkey-spending-time-nature_23-2150754655.jpg?semt=ais_hybrid&w=740&q=80";

const img5 =
  "https://img.freepik.com/free-photo/beautiful-monkey-spending-time-nature_23-2150754581.jpg?semt=ais_incoming&w=740&q=80";

function About() {
  const [showMore, setShowMore] = React.useState(false);

  return (
    <div className="about-page">
      {/* Hero Section */}
      <div className="hero-video-container">
        <video autoPlay loop muted className="hero-video">
          <source src={heroVideo} type="video/mp4" />
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
          <p>
            Nestled amidst nature’s calm embrace, our resort began as a dream to
            create a holistic escape where guests experience peace in its purest
            form. What started as a small wellness retreat has grown into a
            sanctuary of luxury, healing, and unforgettable moments. Every
            corner of our property reflects our dedication to elegance, comfort,
            and the art of slow living.
          </p>
        </div>
        <div className="story-image">
          <img src={img1} alt="Resort Story" />
        </div>
      </section>

      {/* Philosophy */}
      <section className="section philosophy">
        <h2>Our Philosophy</h2>
        <p>
          At our resort, wellness is not a service — it is a lifestyle. We
          believe in harmonizing the body, mind, and spirit through personalized
          care, nature-inspired rituals, and mindful experiences. Every aroma,
          every sound, every texture is thoughtfully curated to bring balance,
          clarity, and gentle renewal.
        </p>
      </section>

      {/* Unique Features */}
      <section className="section features">
        <h2>What Makes Us Unique</h2>

        <div className="feature-cards">
          <div className="card">
            <h3>Private Spa Suites</h3>
            <p>Exclusive suites designed for ultimate relaxation.</p>
          </div>

          <div className="card">
            <h3>Signature Therapies</h3>
            <p>Handcrafted wellness experiences tailored for you.</p>
          </div>

          <div className="card">
            <h3>World-Class Hospitality</h3>
            <p>Every detail curated for impeccable comfort.</p>
          </div>

          {/* Hidden Cards */}
          <div className={`card hidden-card ${showMore ? "show" : ""}`}>
            <h3>Tropical Luxury Ambience</h3>
            <p>
              Nature-inspired luxury with soothing water, greenery, and
              candle-lit evenings.
            </p>
          </div>

          <div className={`card hidden-card ${showMore ? "show" : ""}`}>
            <h3>Award-Winning Wellness</h3>
            <p>
              Our spa therapies are recognised for excellence and healing
              traditions.
            </p>
          </div>

          <div className={`card hidden-card ${showMore ? "show" : ""}`}>
            <h3>Personalized Guest Care</h3>
            <p>Uniquely curated experiences crafted to your needs.</p>
          </div>
        </div>

        <button className="toggle-btn" onClick={() => setShowMore(!showMore)}>
          {showMore ? "Show Less" : "Show More"}
        </button>
      </section>

      {/* Gallery */}
      <section className="section gallery">
        <h2>The Resort Experience</h2>
        <p>
          Discover serene landscapes, soothing spa spaces, elegant architecture,
          and experiences that stay with you long after your stay ends.
        </p>

        <div className="gallery-images">
          <img src={img1} alt="Gallery 1" />
          <img src={img2} alt="Gallery 2" />
          <img src={img3} alt="Gallery 3" />
        </div>
      </section>

      {/* Experts */}
      <section className="section experts">
        <h2>Meet Our Experts</h2>

        <div className="expert-cards">
          <div className="expert">
            <img src={img4} alt="Expert 1" />
            <h4>Sumanth Reddy</h4>
            <p>A wellness specialist with 10+ years of holistic healing.</p>
          </div>

          <div className="expert">
            <img src={img5} alt="Expert 2" />
            <h4>Shasi Vardhan</h4>
            <p>Known for relaxing massage techniques and warm guest service.</p>
          </div>
        </div>
      </section>

      {/* Promise */}
      <section className="section promise">
        <h2>Our Promise</h2>
        <p>
          We promise to offer more than a stay — an experience of peace, warmth,
          and rejuvenation designed to help you slow down, breathe deeper, and
          reconnect with your inner calm.
        </p>
        <button className="cta-button">Book Your Escape</button>
      </section>
    </div>
  );
}

export default About;