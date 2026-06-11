// src/ThingsToDo.js
import React, { useEffect, useRef, useState } from "react";
import "./ThingsToDo.css";
import { useNavigate } from "react-router-dom";

/**
 * ThingsToDo page
 * - 3D tilt on cards
 * - Reveal-on-scroll animations
 * - Map popup
 * - Activities booking
 */

const ACTIVITIES = [
  {
    id: "snorkel",
    title: "Snorkeling Adventure",
    tag: "Underwater Exploration",
    desc: "Discover colorful reefs, gentle marine life and shallow coral gardens — guided, safe and family friendly.",
    image: "https://media.tacdn.com/media/attractions-splice-spp-674x446/06/f0/fb/08.jpg"
  },
  {
    id: "jetski",
    title: "Jet Ski Riding",
    tag: "High Speed Fun",
    desc: "Feel the thrill on water — high-powered jet skis with safety briefings and instructors included.",
    image: "https://www.joyelawfirm.com/wp-content/uploads/2021/09/JLF_August_Topic1_1000x662_Blog.jpg"
  },
  {
    id: "sunsetcruise",
    title: "Sunset Cruise",
    tag: "Romantic Evening",
    desc: "Golden-hour lake cruise with live music and cocktails — perfect for couples and groups.",
    image: "https://media.tacdn.com/media/attractions-splice-spp-674x446/0c/01/50/e1.jpg"
  },
  {
    id: "beachvolley",
    title: "Beach Volleyball",
    tag: "Active Play",
    desc: "Organised matches and casual play — equipment provided. Great for groups & corporate team building.",
    image: "https://www.shutterstock.com/image-photo/athletes-compete-beach-volleyball-championship-600nw-2492270595.jpg"
  },
  {
    id: "kidsclub",
    title: "Kids Activities",
    tag: "Fun & Safe",
    desc: "Creative workshops, supervised games and activities to keep kids happy and parents relaxed.",
    image: "https://www.pinewoodresort.co.in/wp-content/uploads/2024/10/kida-play-area.jpg"
  },
  {
    id: "spa",
    title: "Spa & Wellness",
    tag: "Relax & Restore",
    desc: "Holistic spa treatments, steam rooms and Ayurvedic packages to restore your balance.",
    image: "https://www.ytlhotels.com/wp-content/uploads/2025/04/GIR-Spa-Treatment-Room-scaled-e1747190376271.jpg"
  }
];

const MAP_PINS = [
  { id: "pier", label: "Pier / Cruise", top: "30%", left: "48%", info: "Pier — where sunset cruises start." },
  { id: "spa", label: "Spa", top: "62%", left: "68%", info: "Spa & Wellness center — book relaxing treatments." },
  { id: "beach", label: "Main Beach", top: "78%", left: "28%", info: "Main Beach — snorkeling and water sports." }
];

export default function ThingsToDo() {
  const nav = useNavigate();
  const activitiesRef = useRef(null);
  const [popup, setPopup] = useState(null);

  // Reveal-on-scroll animation
  useEffect(() => {
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
  }, []);

  // Scroll to activities
  const handleScrollToActivities = () => {
    activitiesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Card tilt effect
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

  // Book action
  const handleBookNow = (activityId) => {
    nav("/booking", { state: { activity: activityId } });
  };

  // Map popup
  const handlePinClick = (pin) => {
    setPopup(pin);
  };

  return (
    <div>

      {/* HERO SECTION */}
      <section className="things-hero">
        <video
          className="things-hero-video"
          autoPlay
          loop
          muted
          playsInline
        >
          <source
            src="https://www.pexels.com/download/video/2711207/"
            type="video/mp4"
          />
        </video>

        <div className="things-hero-overlay" />

        <div className="things-hero-content">
          <h1 className="things-title">Discover Endless Adventures</h1>
          <p className="things-sub">
            From tranquil spa days to adrenaline-pumping water sports — curated experiences for every guest.
          </p>

          <button className="things-cta" onClick={handleScrollToActivities}>
            Explore Activities
          </button>

          <div className="scroll-hint" aria-hidden>
            <span className="arrow" />
            <small>Scroll to explore</small>
          </div>
        </div>
      </section>

      {/* ACTIVITIES GRID */}
      <section className="activities-section" ref={activitiesRef}>
        <h2 className="section-heading">Featured Activities</h2>
        <p className="section-lead">Hand-picked experiences that define Radha Serenity</p>

        <div className="activities-grid">
          {ACTIVITIES.map((act) => (
            <article
              key={act.id}
              className="activity-card reveal-on-scroll"
              onMouseMove={handleCardMove}
              onMouseLeave={handleCardLeave}
              role="region"
              aria-label={act.title}
            >
              <div
                className="card-media"
                style={{ backgroundImage: `url(${act.image})` }}
                aria-hidden="true"
              />

              <div className="card-body">
                <h3>{act.title}</h3>
                <h4>{act.tag}</h4>
                <p>{act.desc}</p>

                <div className="card-actions">
                  <button className="btn-primary" onClick={() => handleBookNow(act.id)}>
                    Book Now
                  </button>
                  <button
                    className="btn-outline"
                    onClick={() =>
                      setPopup({ id: act.id, label: act.title, info: act.desc })
                    }
                  >
                    Quick View
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* PARALLAX ROW */}
      <div className="parallax-row">
        <div className="parallax-item">
          <div className="parallax-card reveal-on-scroll">
            <h3>Thrilling Water Sports</h3>
            <p>Jet skis, banana boats, and paddleboarding — adrenaline meets safety with certified instructors.</p>
          </div>
        </div>

        <div className="parallax-item">
          <div className="parallax-card reveal-on-scroll">
            <h3>Calming Spa Rituals</h3>
            <p>Signature massages, steam therapy and holistic rituals for complete relaxation.</p>
          </div>
        </div>
      </div>

      {/* MAP SECTION */}
      <section className="map-section">
        <div className="map-wrapper">
          <div className="map-image" aria-hidden>
            <svg className="map-svg" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
              <defs>
                <linearGradient id="waterGrad" x1="0" x2="1">
                  <stop offset="0" stopColor="#e8fbfa" />
                  <stop offset="1" stopColor="#f2fffd" />
                </linearGradient>
              </defs>

              <rect x="0" y="0" width="1200" height="700" fill="url(#waterGrad)" />
              <ellipse cx="600" cy="420" rx="420" ry="220" fill="#fffef9" />
            </svg>

            {MAP_PINS.map((p) => (
              <button
                key={p.id}
                className="map-pin"
                style={{ top: p.top, left: p.left }}
                onClick={() => handlePinClick(p)}
                aria-label={p.label}
              >
                <span className="pin-dot" />
              </button>
            ))}
          </div>

          <aside className="map-legend">
            <h4>Interactive Resort Map</h4>
            <ul>
              {MAP_PINS.map((p) => (
                <li key={p.id}>
                  <strong>{p.label}:</strong> <span style={{ color: "var(--muted)" }}>{p.info}</span>
                </li>
              ))}
            </ul>

            <div style={{ marginTop: 12 }}>
              <button className="btn-primary" onClick={() => nav("/booking")}>Go to Booking</button>
            </div>
          </aside>
        </div>
      </section>

      {/* END SECTION */}
      <div className="cinematic-end">
        <h2>Ready to explore?</h2>
        <p>Book an experience or contact our guest services to plan a tailored itinerary.</p>
        <div className="end-actions">
          <button className="btn-primary" onClick={() => nav("/booking")}>Book An Experience</button>
          <button className="btn-outline" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            Back to top
          </button>
        </div>
      </div>

      {/* POPUP */}
      {popup && (
        <div className="map-popup" role="dialog" aria-modal="true">
          <div className="map-popup-inner">
            <button className="close-x" onClick={() => setPopup(null)} aria-label="Close">✕</button>

            <h3>{popup.label}</h3>
            <p style={{ color: "var(--muted)" }}>{popup.info}</p>

            <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
              <button className="btn-primary" onClick={() => handleBookNow(popup.id || popup.label)}>
                Book Now
              </button>

              <a
                className="btn-outline"
                href={`https://www.google.com/search?q=${encodeURIComponent(popup.label)}`}
                target="_blank"
                rel="noreferrer"
              >
                More Info
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}