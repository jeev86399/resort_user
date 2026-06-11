import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Header() {
  const [scrolled, setScrolled] = useState(false);
  
  // 1. Initialize with default data so it's visible while fetching
  const [headerData, setHeaderData] = useState({
    logo: "https://your-default-logo-link.com/logo.png", 
    leftMenu: [
      { label: "Home", path: "/" },
      { label: "About", path: "/about" },
      { label: "Accommodation", path: "/accommodation" }
    ],
    rightMenu: [
      { label: "Dining", path: "/dining" },
      { label: "Gallery", path: "/gallery" },
      { label: "Contact", path: "/contact" }
    ]
  });

  // 2. Fetch Dynamic Header data via Spring Boot
  useEffect(() => {
    const fetchHeader = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/admin/all-rooms");
        const data = res.data.find(item => item.id === "header");
        if (data) {
          setHeaderData(data);
        }
      } catch (err) {
        console.error("Header fetch error:", err);
      }
    };
    fetchHeader();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 3. Scroll effect logic for background transition
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-[2000] transition-all duration-300
      ${scrolled
        ? "bg-white/80 backdrop-blur-md border-b border-white/20 shadow-sm py-2"
        : "bg-white/45 backdrop-blur-sm border-b border-white/25 py-4"
      }`}
    >
      <nav className="max-w-[1400px] mx-auto flex items-center justify-center px-5 transition-all">
        
        {/* LEFT MENU */}
        <ul className={`hidden md:flex items-center gap-8 ${scrolled ? "mr-8" : "mr-12"}`}>
          {headerData.leftMenu.map((item, i) => (
            <li key={i}>
              <Link 
                to={item.path} 
                className="text-sm font-semibold tracking-wide text-[#1a1a1a] hover:text-[#b68a5c] transition uppercase"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* LOGO */}
        <div className="flex-shrink-0">
          <Link to="/">
            <img 
              src={headerData.logo} 
              alt="Radha Resort Logo" 
              className={`transition-all duration-500 ${scrolled ? "h-[50px]" : "h-[75px]"} w-auto`} 
            />
          </Link>
        </div>

        {/* RIGHT MENU */}
        <ul className={`hidden md:flex items-center gap-8 ${scrolled ? "ml-8" : "ml-12"}`}>
          {headerData.rightMenu.map((item, i) => (
            <li key={i}>
              <Link 
                to={item.path} 
                className="text-sm font-semibold tracking-wide text-[#1a1a1a] hover:text-[#b68a5c] transition uppercase"
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