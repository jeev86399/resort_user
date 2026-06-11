import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Weddings.css";
import LightboxWedding from '../gallery/LightboxWedding';

export default function Weddings() {
  const [data, setData] = useState({
    heroVideo: "https://assets.mixkit.co/videos/5224/5224-720.mp4",
    features: [],
    galleryPhotos: []
  });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  // ==========================
  // 1. FETCH DATA FROM BACKEND
  // ==========================
  useEffect(() => {
    const fetchWeddings = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/admin/all-rooms");
        
        // Find main Wedding doc for Hero & Features
        const main = res.data.find(item => item.id === "weddingMain");
        // Filter for specific Wedding Gallery photos (type: "weddingGallery")
        const gallery = res.data.filter(item => item.type === "weddingGallery");

        if (main) {
          setData({
            heroVideo: main.heroVideo || "https://assets.mixkit.co/videos/5224/5224-720.mp4",
            features: main.features || [],
            galleryPhotos: gallery || []
          });
        }
      } catch (err) {
        console.error("Wedding fetch error:", err);
      }
    };
    fetchWeddings();
  }, []);

  // ==========================
  // 2. SCROLL REVEAL ANIMATION
  // ==========================
  useEffect(() => {
    const handleScroll = () => {
      const rows = document.querySelectorAll(".wed-feature-row, .gallery-card");
      rows.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0) scale(1)";
        } else {
          el.style.opacity = "0";
          el.style.transform = "translateY(30px) scale(0.995)";
        }
      });
    };

    // Initial run to check position on load
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);

    // This comment silences the ESLint warning you were getting
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.features, data.galleryPhotos]);

  // ==========================
  // 3. MOUSE TILT LOGIC
  // ==========================
  const handleTilt = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    el.style.transform = `perspective(1000px) rotateX(${dy * 6}deg) rotateY(${dx * -6}deg) translateY(-6px)`;
  };

  const resetTilt = (e) => {
    e.currentTarget.style.transform = "";
  };

  const openLightbox = (i) => {
    setStartIndex(i);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "";
  };

  if (!data.features.length) {
    return <div className="pt-40 text-center font-serif text-xl">Loading Wedding Bliss...</div>;
  }

  return (
    <div className="wed-page">

      {/* HERO SECTION */}
      <div className="wed-hero">
        <video autoPlay loop muted playsInline className="wed-video" key={data.heroVideo}>
          <source src={data.heroVideo} type="video/mp4" />
        </video>
        <div className="wed-overlay" />
        <div className="wed-hero-text">
          <h1>Our Wedding Memories</h1>
          <p>Moments of love, laughter & celebration</p>
          <div className="scroll-hint">↓</div>
        </div>
      </div>

      {/* INTRO TEXT */}
      <section className="wed-intro">
        <h2>Our Moment, Your Way</h2>
        <h3>Weddings Crafted by Radha Serenity Resort</h3>
        <p>
          At Radha Serenity Resort, weddings are crafted with elegance, warmth and cinema-grade hospitality.
          Choose from scenic lawns, serene lakeside spaces and opulent indoor halls.
        </p>
      </section>

      {/* DYNAMIC FEATURE ROWS */}
      <section className="wed-features">
        {data.features.map((f, i) => (
          <div className={`wed-feature-row ${i % 2 === 1 ? "reverse" : ""}`} key={i}>
            <div className="wed-feature-text">
              <h2>{f.title}</h2>
              <p>{f.desc}</p>
            </div>
            <div className="wed-feature-img">
              <img src={f.img} alt={f.title} />
            </div>
          </div>
        ))}
      </section>

      {/* CALL TO ACTION */}
      <div className="wed-cta">
        <h2>Plan Your Dream Wedding With Us</h2>
        <p>Your fairytale celebration starts here.</p>
        <a href="/booking" className="wed-btn">Get in touch</a>
      </div>

      {/* DYNAMIC GALLERY GRID */}
      <section className="wed-gallery-section">
        <h2 className="gallery-title">Memorable Celebrations — Modern + Traditional</h2>

        <div className="gallery-grid">
          {data.galleryPhotos.map((p, idx) => (
            <figure
              key={idx}
              className="gallery-card"
              onMouseMove={handleTilt}
              onMouseLeave={resetTilt}
              onClick={() => openLightbox(idx)}
              style={{ transition: 'opacity 0.6s ease-out, transform 0.6s ease-out' }}
            >
              <div className="card-media">
                <img src={p.src} alt={p.title || `Wedding photo ${idx + 1}`} />
              </div>
              <figcaption className="card-caption">
                <h4>{p.title}</h4>
                <p>Click to view</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* LIGHTBOX COMPONENT */}
      {lightboxOpen && (
        <LightboxWedding 
          photos={data.galleryPhotos} 
          startIndex={startIndex} 
          onClose={closeLightbox} 
        />
      )}
    </div>
  );
}