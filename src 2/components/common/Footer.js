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
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../services/firebase";

function Footer() {
  const [footer, setFooter] = useState(null);

  useEffect(() => {
    const fetchFooter = async () => {
      const ref = doc(db, "siteSettings", "footer");
      const snap = await getDoc(ref);
      if (snap.exists()) setFooter(snap.data());
    };
    fetchFooter();
  }, []);

  if (!footer) return null;

  return (
    <footer className="relative bg-[#080808] text-gray-300 overflow-hidden">

      {/* Ambient light */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#c19b76]/10 blur-[140px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-6 py-20">

        {/* 3D Glass Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 bg-white/5 backdrop-blur-xl rounded-3xl p-10 shadow-[0_30px_80px_rgba(0,0,0,0.6)] border border-white/10">

          {/* BRAND */}
          <div className="space-y-4 transform transition hover:-translate-y-1">
            <h2 className="text-3xl font-extrabold text-white tracking-wide">
              <span className="text-[#c19b76]">{footer.resortName}</span>
            </h2>
            <p className="text-gray-400 leading-relaxed max-w-sm">
              {footer.description}
            </p>
          </div>

          {/* LINKS */}
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold text-white">
              Explore
            </h3>
            <ul className="space-y-3">
              {["about", "accommodation", "dining", "offers", "contact"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      to={`/${item}`}
                      className="relative inline-block text-gray-400 hover:text-[#c19b76] transition after:block after:h-[1px] after:bg-[#c19b76] after:scale-x-0 hover:after:scale-x-100 after:transition after:origin-left"
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* CONTACT */}
          <div className="space-y-4 text-right">
            <h3 className="text-xl font-semibold text-white">
              Get in Touch
            </h3>

            <div className="space-y-2">
              <p className="flex justify-end items-center gap-3">
                <FaPhoneAlt className="text-[#c19b76]" />
                {footer.phone}
              </p>
              <p className="flex justify-end items-center gap-3">
                <FaEnvelope className="text-[#c19b76]" />
                {footer.email}
              </p>
              <p className="flex justify-end items-center gap-3">
                <FaMapMarkerAlt className="text-[#c19b76]" />
                {footer.address}
              </p>
            </div>

            <a
              href="/booking"
              className="inline-block mt-4 px-8 py-3 rounded-full bg-[#c19b76] text-black font-semibold shadow-[0_15px_40px_rgba(193,155,118,0.5)] hover:shadow-[0_25px_60px_rgba(193,155,118,0.8)] hover:-translate-y-1 transition"
            >
              Book Now
            </a>
          </div>
        </div>

        {/* SOCIAL ICONS */}
        <div className="flex justify-center gap-8 mt-14">
          {[ 
            { icon: <FaFacebookF />, link: footer.facebook },
            { icon: <FaInstagram />, link: footer.instagram },
            { icon: <FaTwitter />, link: footer.twitter },
          ].map((s, i) => (
            <a
              key={i}
              href={s.link}
              target="_blank"
              rel="noreferrer"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-gray-400 hover:text-[#c19b76] hover:scale-110 hover:shadow-[0_15px_40px_rgba(193,155,118,0.6)] transition"
            >
              {s.icon}
            </a>
          ))}
        </div>

        {/* BOTTOM */}
        <div className="mt-10 pt-4 border-t border-white/10 text-center text-sm text-gray-500">
          © 2025{" "}
          <span className="text-[#c19b76] font-semibold">
            {footer.resortName}
          </span>{" "}
          — All Rights Reserved
        </div>
      </div>
    </footer>
  );
}

export default Footer;
