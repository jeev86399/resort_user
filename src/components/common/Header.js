import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../services/firebase";

function Header() {
  const [headerData, setHeaderData] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  // Fetch Header from Firebase
  useEffect(() => {
    const fetchHeader = async () => {
      const ref = doc(db, "siteSettings", "header");
      const snap = await getDoc(ref);
      if (snap.exists()) setHeaderData(snap.data());
    };
    fetchHeader();
  }, []);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!headerData) return null;

  return (
    <header
      className={`fixed top-0 w-full z-[2000] transition-all duration-300
      ${scrolled
        ? "bg-white/60 backdrop-blur-md border-b border-white/20"
        : "bg-white/45 backdrop-blur-sm border-b border-white/25"
      }`}
    >
      <nav
        className={`max-w-[1400px] mx-auto flex items-center justify-center px-5
        ${scrolled ? "py-1.5" : "py-2.5"} transition-all duration-300`}
      >
        {/* LEFT MENU */}
        <ul
          className={`hidden md:flex items-center list-none
          ${scrolled ? "gap-3.5 mr-6" : "gap-6 mr-8"} transition-all`}
        >
          {headerData.leftMenu.map((item, i) => (
            <li key={i}>
              <Link
                to={item.path}
                className="text-sm font-semibold tracking-wide text-[#1a1a1a]
                hover:text-[#b68a5c] transition"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* LOGO */}
        <div className="flex-shrink-0">
          <img
            src={headerData.logo}
            alt="Resort Logo"
            className={`transition-all duration-300
            ${scrolled ? "h-[60px]" : "h-[80px]"} w-auto`}
          />
        </div>

        {/* RIGHT MENU */}
        <ul
          className={`hidden md:flex items-center list-none
          ${scrolled ? "gap-3.5 ml-6" : "gap-6 ml-8"} transition-all`}
        >
          {headerData.rightMenu.map((item, i) => (
            <li key={i}>
              <Link
                to={item.path}
                className="text-sm font-semibold tracking-wide text-[#1a1a1a]
                hover:text-[#b68a5c] transition"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
