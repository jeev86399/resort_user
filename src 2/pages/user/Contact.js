import React, { useState } from "react";
import "./Contact.css";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../../services/firebase'; // adjust path if needed

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔐 BASIC VALIDATION
    if (name.trim().length < 3) {
      alert("Please enter a valid name");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      alert("Please enter a valid Indian mobile number");
      return;
    }

    if (message.trim().length < 10) {
      alert("Message must be at least 10 characters");
      return;
    }

    if (!service) {
      alert("Please select a service");
      return;
    }

    // 🚫 BLOCK COMMON SPAM WORDS
    const blockedWords = ["test", "hi", "hello", "asdf", "free", "timepass"];
    if (blockedWords.some(word => message.toLowerCase().includes(word))) {
      alert("Invalid message content");
      return;
    }

    // ⏱ RATE LIMIT (1 MESSAGE / 5 MIN)
    const lastSent = localStorage.getItem("contact_last_sent");
    if (lastSent && Date.now() - lastSent < 5 * 60 * 1000) {
      alert("Please wait before sending another message");
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "contacts"), {
        name,
        email,
        phone,
        service,
        message,
        createdAt: serverTimestamp(),
        status: "new"
      });

      localStorage.setItem("contact_last_sent", Date.now());

      alert("Message sent successfully");

      // RESET FORM
      setName("");
      setEmail("");
      setPhone("");
      setService("");
      setMessage("");

    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
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

      {/* CONTACT INFO */}
      <section className="contact-info-section">
        <div className="contact-card">
          <FaMapMarkerAlt className="contact-icon" />
          <h3>Resort Address</h3>
          <p>Skydale Luxury Resort</p>
          <p>Green Valley Road, Munnar, Kerala</p>
        </div>

        <div className="contact-card">
          <FaPhoneAlt className="contact-icon" />
          <h3>Phone Numbers</h3>
          <p>Reception: +91 99999 11111</p>
          <p>Bookings: +91 88888 22222</p>
          <p className="whatsapp">
            <FaWhatsapp /> WhatsApp: +91 77777 33333
          </p>
        </div>

        <div className="contact-card">
          <FaEnvelope className="contact-icon" />
          <h3>Email</h3>
          <p>info@skydaleresort.com</p>
          <p>booking@skydaleresort.com</p>
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

          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Submit"}
          </button>
        </form>
      </section>

      {/* BUSINESS HOURS */}
      <section className="hours-section">
        <h2>Resort Hours</h2>

        <div className="hours-grid">
          <div className="hours-card">
            <h3>Resort</h3>
            <p>24/7 Open</p>
          </div>
          <div className="hours-card">
            <h3>Spa & Wellness</h3>
            <p>9:00 AM – 8:00 PM</p>
          </div>
          <div className="hours-card">
            <h3>Restaurant</h3>
            <p>7:00 AM – 11:00 PM</p>
          </div>
          <div className="hours-card">
            <h3>Activities</h3>
            <p>10:00 AM – 6:00 PM</p>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="map-section">
        <h2>Find Us</h2>
        <iframe
          title="Resort Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3915.728384532098!2d76.96418937582112!3d10.990292389183642!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba86086b3c42fb5%3A0x2e34d45a2f5a73d1!2sMunnar!5e0!3m2!1sen!2sin!4v0000"
          loading="lazy"
        ></iframe>
      </section>

    </div>
  );
};

export default Contact;
