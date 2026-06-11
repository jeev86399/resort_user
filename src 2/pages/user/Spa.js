import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Spa.css";

class Spa extends Component {
  render() {
    return (
      <div className="spa-page">
        <section className="spa-hero">
          <img
            src="https://www.mytravelbee.in/wp-content/uploads/2024/09/Niraamaya-Retreats-Surya-Samudra-Kovalam.jpg"
            alt="Spa Luxury"
            className="spa-hero-img"
          />
          <h1 className="spa-title">Luxury Resort Spa</h1>
          <p className="spa-sub">Relax • Rejuvenate • Refresh</p>
        </section>

        <section className="spa-services">
          <h2 className="section-title">Our Treatments</h2>
          <div className="services-grid">
            <div className="service-card">
              <img src="https://easemytrip.com/travel/img/amazing-spa-ind.jpg" alt="Massage" />
              <h3>Full Body Massage</h3>
              <p>Deep relaxation therapy with essential oils.</p>
            </div>
            <div className="service-card">
              <img src="https://plus.unsplash.com/premium_photo-1683134297492-cce5fc6dae31?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3BhJTIwcmVzb3J0fGVufDB8fDB8fHww" alt="Stone Therapy" />
              <h3>Hot Stone Therapy</h3>
              <p>Melt stress with warm volcanic stones.</p>
            </div>
          </div>
        </section>

        <section className="spa-booking">
          <h2>Book Your Therapy</h2>
          <p>Experience complete relaxation with our professional spa therapists.</p>
          <Link to="/booking" className="spa-btn">Book Now</Link>
        </section>
      </div>
    );
  }
}

export default Spa;
