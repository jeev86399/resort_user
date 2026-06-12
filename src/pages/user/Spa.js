// src/components/home/Spa.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Spa.css";

// 1. Double-check this path to your firebase.js file
import { db } from "../../services/firebase";
import { collection, getDocs, query, orderBy, doc, getDoc } from "firebase/firestore";

const Spa = () => {
  const [pageData, setPageData] = useState(null);
  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpaData = async () => {
      try {
        // Fetch Hero Data (Ensure Document ID is 'spaPage')
        const pageSnap = await getDoc(doc(db, "siteSettings", "spaPage"));
        if (pageSnap.exists()) {
          setPageData(pageSnap.data());
        }

        // Fetch Treatments (Ensure Collection is 'spaTreatments')
        const treatQuery = query(collection(db, "spaTreatments"), orderBy("order", "asc"));
        const treatSnap = await getDocs(treatQuery);
        const treatData = treatSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTreatments(treatData);

        setLoading(false);
      } catch (error) {
        console.error("Error loading Spa data:", error);
        setLoading(false);
      }
    };

    fetchSpaData();
  }, []);

  if (loading) {
    return <div className="loading-sanctuary">Entering the sanctuary...</div>;
  }

  // Fallback if Firebase is empty so the page doesn't look broken
  const heroImage = pageData?.heroImg || "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070";

  return (
    <div className="spa-page">
      {/* HERO SECTION */}
      <section className="spa-hero">
        <img
          src={heroImage}
          alt="Spa Luxury"
          className="spa-hero-img"
        />
        <div className="spa-hero-overlay">
          <h1 className="spa-title">{pageData?.title || "Luxury Resort Spa"}</h1>
          <p className="spa-sub">{pageData?.subtitle || "Relax • Rejuvenate • Refresh"}</p>
        </div>
      </section>

      {/* TREATMENTS GRID */}
      <section className="spa-services">
        <h2 className="section-title">Our Treatments</h2>
        <div className="services-grid">
          {treatments.map((item) => (
            <div className="service-card" key={item.id}>
              <div className="service-img-wrapper">
                <img src={item.img} alt={item.title} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BOOKING SECTION */}
      <section className="spa-booking">
        <h2>Book Your Therapy</h2>
        <p>Experience complete relaxation with our professional spa therapists.</p>
        <Link to="/booking" className="spa-btn">Book Now</Link>
      </section>
    </div>
  );
};

export default Spa;
