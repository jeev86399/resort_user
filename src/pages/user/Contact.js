import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Contact.css";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../../services/firebase';

const Contact = () => {
  // Form States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // 1. Initialize with Default Data to prevent "Loading..." screen lock
  const [contactInfo, setContactInfo] = useState({
    resortName: "Radha Serenity Resort",
    address: "Varkala Beach Road, Kerala, India",
    phone: "+91 99999 11111",
    whatsapp: "+91 77777 33333",
    email: "info@radhaserenity.com"
  });

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/admin/all-rooms");
        const info = res.data.find(item => item.id === "footer"); 
        if (info) setContactInfo(info);
      } catch (err) {
        console.error("Failed to load contact info", err);
      }
    };
    fetchInfo();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic Validation
    if (name.length < 3 || !phone.match(/^[6-9]\d{9}$/)) {
        alert("Please enter valid details.");
        return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "contacts"), {
        name, email, phone, service, message,
        createdAt: serverTimestamp(),
        status: "new"
      });
      alert("Message sent successfully!");
      setName(""); setEmail(""); setPhone(""); setService(""); setMessage("");
    } catch (error) {
      console.error(error);
      alert("Error sending message.");
    }
    setLoading(false);
  };

  return (
    <div className="contact-page">
      {/* HERO SECTION */}
      <section className="contact-hero">
        <div className="overlay"></div>
        <h1 className="contact-title">Contact Our Resort</h1>
        <p className="contact-subtitle">We're here to assist you anytime</p>
      </section>

      {/* CONTACT INFO (Dynamic) */}
      <section className="contact-info-section">
        <div className="contact-card">
          <FaMapMarkerAlt className="contact-icon" />
          <h3>Resort Address</h3>
          <p className="font-bold">{contactInfo.resortName}</p>
          <p>{contactInfo.address}</p>
        </div>

        <div className="contact-card">
          <FaPhoneAlt className="contact-icon" />
          <h3>Phone Numbers</h3>
          <p>Direct: {contactInfo.phone}</p>
          <p className="whatsapp">
            <FaWhatsapp /> WhatsApp: {contactInfo.whatsapp || contactInfo.phone}
          </p>
        </div>

        <div className="contact-card">
          <FaEnvelope className="contact-icon" />
          <h3>Email</h3>
          <p>{contactInfo.email}</p>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="contact-form-section">
        <h2>Send Us a Message</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            required
          >
            <option value="">Select Service</option>
            <option>Room Booking</option>
            <option>Dining Reservation</option>
            <option>Spa Appointment</option>
            <option>Wedding Enquiry</option>
            <option>General Question</option>
          </select>
          <textarea
            placeholder="Your Message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? "Sending..." : "Submit Message"}
          </button>
        </form>
      </section>

      {/* HOURS & MAP (Static or kept as is) */}
      <section className="hours-section">
        <div className="hours-grid">
          <div className="hours-card"><h3>Resort</h3><p>24/7 Open</p></div>
          <div className="hours-card"><h3>Spa</h3><p>9 AM – 8 PM</p></div>
          <div className="hours-card"><h3>Dining</h3><p>7 AM – 11 PM</p></div>
        </div>
      </section>
    </div>
  );
};

export default Contact;