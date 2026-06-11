import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ThingsToDo.css";

export default function ThingsToDo() {
  const nav = useNavigate();
  const activitiesRef = useRef(null);
  const [activities, setActivities] = useState([]);
  const [hero, setHero] = useState({ title: "", sub: "", video: "" });
  

  // FETCH DATA FROM SPRING BOOT
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/admin/all-rooms");
        
        // Find Hero Settings
        const heroData = res.data.find(item => item.id === "thingsHero");
        if (heroData) setHero(heroData);

        // Filter for Activities (ensure your Firestore docs have type: "activity")
        const actData = res.data.filter(item => item.type === "activity");
        setActivities(actData);
      } catch (err) {
        console.error("Error fetching adventures:", err);
      }
    };
    fetchData();
  }, []);

  // Reveal-on-scroll logic (Keep exactly as you wrote it)
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((ent) => {
        if (ent.isIntersecting) {
          ent.target.classList.add("revealed");
          observer.unobserve(ent.target);
        }
      });
    }, { threshold: 0.12 });
    const cards = document.querySelectorAll(".reveal-on-scroll");
    cards.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, [activities]); // Re-run when activities load

  // Tilt logic (Keep exactly as you wrote it)
  const handleCardMove = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * -8;
    const y = ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * 6;
    el.style.transform = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg) translateY(-6px) scale(1.01)`;
  };

  return (
    <div>
      {/* HERO SECTION (Dynamic Video) */}
      <section className="things-hero">
        <video className="things-hero-video" autoPlay loop muted playsInline key={hero.video}>
          <source src={hero.video} type="video/mp4" />
        </video>
        <div className="things-hero-overlay" />
        <div className="things-hero-content">
          <h1 className="things-title">{hero.title}</h1>
          <p className="things-sub">{hero.sub}</p>
          <button className="things-cta" onClick={() => activitiesRef.current?.scrollIntoView({ behavior: "smooth" })}>Explore Activities</button>
        </div>
      </section>

      {/* ACTIVITIES GRID (Dynamic Mapping) */}
      <section className="activities-section" ref={activitiesRef}>
        <h2 className="section-heading">Featured Activities</h2>
        <div className="activities-grid">
          {activities.map((act) => (
            <article key={act.id} className="activity-card reveal-on-scroll" onMouseMove={handleCardMove} onMouseLeave={(e) => e.currentTarget.style.transform = ""}>
              <div className="card-media" style={{ backgroundImage: `url(${act.image})` }} />
              <div className="card-body">
                <h3>{act.title}</h3>
                <h4>{act.tag}</h4>
                <p>{act.desc}</p>
                <button className="btn-primary" onClick={() => nav("/booking", { state: { activity: act.id } })}>Book Now</button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}