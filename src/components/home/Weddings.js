// src/components/home/Weddings.js
import React, { useEffect, useState } from "react";
import "./Weddings.css";
import LightboxWedding from '../gallery/LightboxWedding';

// Firebase Imports
import { db } from "../../services/firebase";
import { collection, getDocs, query, orderBy, doc, getDoc } from "firebase/firestore";

export default function Weddings() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  
  // States for Dynamic Data
  const [features, setFeatures] = useState([]);
  const [galleryPhotos, setGalleryPhotos] = useState([]);
  const [heroVideo, setHeroVideo] = useState(""); // State for dynamic video
  const [loading, setLoading] = useState(true);

  // Fetch Data from Firebase
  useEffect(() => {
    const fetchWeddingData = async () => {
      try {
        // 1. Fetch Hero Video from siteSettings/weddings
        const videoDoc = await getDoc(doc(db, "siteSettings", "weddings"));
        if (videoDoc.exists()) {
          setHeroVideo(videoDoc.data().heroVideo);
        } else {
          // Fallback video if Firebase is empty
          setHeroVideo("https://assets.mixkit.co/videos/5224/5224-720.mp4");
        }

        // 2. Fetch Features
        const featQuery = query(collection(db, "weddingFeatures"), orderBy("order", "asc"));
        const featSnap = await getDocs(featQuery);
        const featData = featSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFeatures(featData);

        // 3. Fetch Gallery
        const galleryQuery = query(collection(db, "weddingGallery"), orderBy("order", "asc"));
        const gallerySnap = await getDocs(galleryQuery);
        const galleryData = gallerySnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setGalleryPhotos(galleryData);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching wedding data:", error);
        setLoading(false);
      }
    };

    fetchWeddingData();
  }, []);

  // Scroll Animation Logic
  useEffect(() => {
    if (loading) return;
    const handleScroll = () => {
      const rows = document.querySelectorAll(".wed-feature-row, .gallery-card");
      rows.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0) scale(1)";
        }
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  // Tilt Handlers
  const handleTilt = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    el.style.transform = `perspective(1000px) rotateX(${dy * 6}deg) rotateY(${dx * -6}deg) translateY(-6px)`;
  };

  const resetTilt = (e) => (e.currentTarget.style.transform = "");

  const openLightbox = (i) => {
    setStartIndex(i);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  if (loading) return <div className="loading-screen">Loading Wedding Memories...</div>;

  return (
    <div className="wed-page">
      {/* DYNAMIC HERO VIDEO */}
      <div className="wed-hero">
        {heroVideo && (
          <video key={heroVideo} autoPlay loop muted playsInline className="wed-video">
            <source src={heroVideo} type="video/mp4" />
          </video>
        )}
        <div className="wed-overlay" />
        <div className="wed-hero-text">
          <h1>Our Wedding Memories</h1>
          <p>Moments of love, laughter & celebration</p>
        </div>
      </div>

      {/* FEATURE ROWS */}
      <section className="wed-features">
        {features.map((f, i) => (
          <div className={`wed-feature-row ${i % 2 === 1 ? "reverse" : ""}`} key={f.id}>
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

      {/* GALLERY GRID */}
      <section className="wed-gallery-section">
        <h2 className="gallery-title">Great Weddings — Modern + Traditional</h2>
        <div className="gallery-grid">
          {galleryPhotos.map((p, idx) => (
            <figure
              key={p.id}
              className="gallery-card"
              onMouseMove={handleTilt}
              onMouseLeave={resetTilt}
              onClick={() => openLightbox(idx)}
            >
              <div className="card-media">
                <img src={p.src} alt={p.alt} />
              </div>
              <figcaption className="card-caption">
                <h4>{p.title}</h4>
                <p>{p.alt}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {lightboxOpen && (
        <LightboxWedding 
          photos={galleryPhotos} 
          startIndex={startIndex} 
          onClose={() => { setLightboxOpen(false); document.body.style.overflow = ""; }} 
        />
      )}
    </div>
  );
}
