// src/components/home/ThingsToDo.js
import React, { useEffect, useRef, useState } from "react";
import "./ThingsToDo.css";
import { useNavigate } from "react-router-dom";

// 1. Fixed Path: Moving up two folders to find firebase.js in /src
// If your firebase file is named differently or elsewhere, adjust this path.
import { db } from "../../services/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

const MAP_PINS = [
  { id: "pier", label: "Pier / Cruise", top: "30%", left: "48%", info: "Pier — where sunset cruises start." },
  { id: "spa", label: "Spa", top: "62%", left: "68%", info: "Spa & Wellness center — book relaxing treatments." },
  { id: "beach", label: "Main Beach", top: "78%", left: "28%", info: "Main Beach — snorkeling and water sports." }
];

export default function ThingsToDo() {
  const nav = useNavigate();
  const activitiesRef = useRef(null);
  const [popup, setPopup] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH DATA FROM FIRESTORE
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const q = query(collection(db, "activities"), orderBy("order", "asc"));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setActivities(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching activities: ", error);
        setLoading(false);
      }
    };
    fetchActivities();
  }, []);

  // REVEAL ON SCROLL ANIMATION
  useEffect(() => {
    if (loading) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((ent) => {
          if (ent.isIntersecting) {
            ent.target.classList.add("revealed");
            observer.unobserve(ent.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    const cards = document.querySelectorAll(".reveal-on-scroll");
    cards.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, [loading]);

  // --- HANDLER FUNCTIONS (Restored) ---
  
  const handleScrollToActivities = () => {
    activitiesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleCardMove = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rx = ((mouseY - cy) / cy) * 6;
    const ry = ((mouseX - cx) / cx) * -8;

    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px) scale(1.01)`;
    const media = el.querySelector(".card-media");
    if (media) media.style.transform = "scale(1.06)";
  };

  const handleCardLeave = (e) => {
    const el = e.currentTarget;
    el.style.transform = "";
    const media = el.querySelector(".card-media");
    if (media) media.style.transform = "";
  };

  const handleBookNow = (activityId) => {
    nav("/booking", { state: { activity: activityId } });
  };

  const handlePinClick = (pin) => {
    setPopup(pin);
  };

  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h2>Loading Experiences...</h2>
      </div>
    );
  }

  return (
    <div>
      {/* HERO SECTION */}
      <section className="things-hero">
        <video className="things-hero-video" autoPlay loop muted playsInline>
          <source src="https://www.pexels.com/download/video/2711207/" type="video/mp4" />
        </video>
        <div className="things-hero-overlay" />
        <div className="things-hero-content">
          <h1 className="things-title">Discover Endless Adventures</h1>
          <p className="things-sub">From tranquil spa days to adrenaline-pumping water sports.</p>
          <button className="things-cta" onClick={handleScrollToActivities}>Explore Activities</button>
        </div>
      </section>

      {/* ACTIVITIES GRID (Dynamic from Firestore) */}
      <section className="activities-section" ref={activitiesRef}>
        <h2 className="section-heading">Featured Activities</h2>
        <div className="activities-grid">
          {activities.map((act) => (
            <article
              key={act.id}
              className="activity-card reveal-on-scroll"
              onMouseMove={handleCardMove}
              onMouseLeave={handleCardLeave}
            >
              <div className="card-media" style={{ backgroundImage: `url(${act.image})` }} />
              <div className="card-body">
                <h3>{act.title}</h3>
                <h4>{act.tag}</h4>
                <p>{act.desc}</p>
                <div className="card-actions">
                  <button className="btn-primary" onClick={() => handleBookNow(act.id)}>Book Now</button>
                  <button className="btn-outline" onClick={() => setPopup(act)}>Quick View</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* MAP SECTION */}
      <section className="map-section">
        <div className="map-wrapper">
          <div className="map-image">
            <svg className="map-svg" viewBox="0 0 1200 700">
               <rect width="1200" height="700" fill="#f0fdfa" />
               <ellipse cx="600" cy="420" rx="420" ry="220" fill="#fff" />
            </svg>
            {MAP_PINS.map((p) => (
              <button key={p.id} className="map-pin" style={{ top: p.top, left: p.left }} onClick={() => handlePinClick(p)}>
                <span className="pin-dot" />
              </button>
            ))}
          </div>
          <aside className="map-legend">
            <h4>Interactive Resort Map</h4>
            <ul>
              {MAP_PINS.map((p) => (
                <li key={p.id}><strong>{p.label}:</strong> {p.info}</li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {/* POPUP MODAL */}
      {popup && (
        <div className="map-popup">
          <div className="map-popup-inner">
            <button className="close-x" onClick={() => setPopup(null)}>✕</button>
            <h3>{popup.title || popup.label}</h3>
            <p>{popup.desc || popup.info}</p>
            <button className="btn-primary" onClick={() => handleBookNow(popup.id)}>Book Now</button>
          </div>
        </div>
      )}
    </div>
  );
}
