import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Spa.css";

const Spa = () => {
  const [data, setData] = useState({
    heroImg: "https://www.mytravelbee.in/wp-content/uploads/2024/09/Niraamaya-Retreats-Surya-Samudra-Kovalam.jpg",
    services: []
  });

  useEffect(() => {
    const fetchSpa = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/admin/all-rooms");
        
        const mainSpa = res.data.find(item => item.id === "spaMain");
        const services = res.data.filter(item => item.type === "spaService");

        if (mainSpa) {
          // Use functional update (prevData) to fix the dependency warning
          setData(prevData => ({
            heroImg: mainSpa.heroImg || prevData.heroImg,
            services: services
          }));
        } else {
            // Even if mainSpa isn't found, we still want to load the services
            setData(prevData => ({
                ...prevData,
                services: services
            }));
        }
      } catch (err) {
        console.error("Spa fetch error:", err);
      }
    };
    fetchSpa();

    // Dependency array is empty because we no longer reference 'data' directly
  }, []);

  return (
    <div className="spa-page">
      <section className="spa-hero">
        <img src={data.heroImg} alt="Spa Luxury" className="spa-hero-img" />
        <h1 className="spa-title">Luxury Resort Spa</h1>
        <p className="spa-sub">Relax • Rejuvenate • Refresh</p>
      </section>

      <section className="spa-services">
        <h2 className="section-title">Our Treatments</h2>
        <div className="services-grid">
          {data.services.length > 0 ? (
            data.services.map((service, index) => (
              <div key={index} className="service-card">
                <img src={service.img} alt={service.title} />
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </div>
            ))
          ) : (
            <p className="text-center w-full">Loading treatments...</p>
          )}
        </div>
      </section>

      <section className="spa-booking">
        <h2>Book Your Therapy</h2>
        <p>Experience complete relaxation with our professional spa therapists.</p>
        <Link to="/booking" className="spa-btn">Book Now</Link>
      </section>
    </div>
  );
};

export default Spa;