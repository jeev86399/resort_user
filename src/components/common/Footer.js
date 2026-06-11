import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import axios from "axios";

function Footer() {
  const [footer, setFooter] = useState(null);

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/admin/all-rooms");
        // We look for the document with ID 'footer'
        const footerData = res.data.find(item => item.id === "footer");
        if (footerData) setFooter(footerData);
      } catch (err) {
        console.error("Footer fetch error:", err);
      }
    };
    fetchFooter();
  }, []);

  if (!footer) return null;

  return (
    <footer className="relative bg-[#080808] text-gray-300 overflow-hidden">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#c19b76]/10 blur-[140px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 bg-white/5 backdrop-blur-xl rounded-3xl p-10 shadow-[0_30px_80px_rgba(0,0,0,0.6)] border border-white/10">
          
          {/* BRAND */}
          <div className="space-y-4">
            <h2 className="text-3xl font-extrabold text-white">
              <span className="text-[#c19b76]">{footer.resortName}</span>
            </h2>
            <p className="text-gray-400 leading-relaxed max-w-sm">{footer.description}</p>
          </div>

          {/* LINKS */}
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold text-white">Explore</h3>
            <ul className="space-y-3">
              {["about", "accommodation", "dining", "offers", "contact"].map((item) => (
                <li key={item}>
                  <Link to={`/${item}`} className="text-gray-400 hover:text-[#c19b76] transition">
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div className="space-y-4 text-right">
            <h3 className="text-xl font-semibold text-white">Get in Touch</h3>
            <div className="space-y-2">
              <p className="flex justify-end items-center gap-3"><FaPhoneAlt className="text-[#c19b76]" /> {footer.phone}</p>
              <p className="flex justify-end items-center gap-3"><FaEnvelope className="text-[#c19b76]" /> {footer.email}</p>
              <p className="flex justify-end items-center gap-3"><FaMapMarkerAlt className="text-[#c19b76]" /> {footer.address}</p>
            </div>
            <Link to="/booking" className="inline-block mt-4 px-8 py-3 rounded-full bg-[#c19b76] text-black font-semibold transition hover:-translate-y-1">
              Book Now
            </Link>
          </div>
        </div>

        {/* SOCIAL ICONS */}
        <div className="flex justify-center gap-8 mt-14">
          <a href={footer.facebook} target="_blank" rel="noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:text-[#c19b76] transition"><FaFacebookF /></a>
          <a href={footer.instagram} target="_blank" rel="noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:text-[#c19b76] transition"><FaInstagram /></a>
          <a href={footer.twitter} target="_blank" rel="noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:text-[#c19b76] transition"><FaTwitter /></a>
        </div>

        <div className="mt-10 pt-4 border-t border-white/10 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} <span className="text-[#c19b76] font-semibold">{footer.resortName}</span> — All Rights Reserved
        </div>
      </div>
    </footer>
  );
}

export default Footer;