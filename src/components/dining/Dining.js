import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Dining() {
  const [hero, setHero] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [chefSpecials, setChefSpecials] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==========================
  // FETCH DATA FROM SPRING BOOT
  // ==========================
  useEffect(() => {
    const fetchDiningData = async () => {
      try {
        // Calling your Spring Boot DiningController
        const heroRes = await axios.get("http://localhost:8080/api/dining/hero");
        const sessionsRes = await axios.get("http://localhost:8080/api/dining/sessions");
        const specialsRes = await axios.get("http://localhost:8080/api/dining/specials");

        // Use the first document for hero (matches your Firestore structure)
        if (heroRes.data && heroRes.data.length > 0) {
          setHero(heroRes.data[0]);
        }
        
        // Sorting sessions logic
        const order = ["morning", "breakfast", "lunch", "evening", "dinner", "late-night"];
        const sortedSessions = sessionsRes.data.sort((a, b) => 
            order.indexOf(a.id?.toLowerCase()) - order.indexOf(b.id?.toLowerCase())
        );
        
        setSessions(sortedSessions);
        setChefSpecials(specialsRes.data);
      } catch (err) {
        console.error("Dining fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDiningData();
  }, []);

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-gray-900 text-yellow-400">
        <p className="text-xl animate-pulse">Loading Gourmet Experience...</p>
    </div>
  );

  if (!hero) return (
    <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
        <p>Dining data not available.</p>
    </div>
  );

  return (
    <div className="dining-page bg-gray-900 text-gray-100">

      {/* Hero Section */}
      <div
        className="dining-hero-image h-[500px] md:h-[600px] flex items-center justify-center relative overflow-hidden"
        style={{
          backgroundImage: `url(${hero.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="dining-hero-text relative text-center px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg">
            {hero.title}
          </h1>
          <p className="text-xl md:text-2xl mt-4 text-gray-200 drop-shadow">
            {hero.subtitle}
          </p>
        </div>
      </div>

      {/* Chef Specials */}
      <section className="chef-special py-16 px-6 md:px-16">
        <h2 className="text-4xl font-bold text-center mb-4 text-yellow-400 drop-shadow-lg">
          Chef’s Signature Experiences
        </h2>
        <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
          Crafted with passion — a gourmet journey inspired by Kerala’s soul.
        </p>

        <div className="grid md:grid-cols-3 gap-12">
          {chefSpecials.map((chef) => (
            <div
              key={chef.id}
              className="chef-item bg-gray-800 rounded-xl shadow-2xl transform hover:rotate-3 hover:scale-105 transition duration-500 cursor-pointer overflow-hidden"
            >
              <img
                src={chef.img}
                alt={chef.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-yellow-400 mb-2">
                  {chef.title}
                </h3>
                <p className="text-gray-300">{chef.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dining Sessions */}
      <section className="dining-list py-16 px-6 md:px-16 bg-gray-900">
        <h2 className="text-4xl font-bold text-center mb-12 text-yellow-400 drop-shadow-lg">
          Our Dining Timings & Food Sessions
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {sessions.map((s) => (
            <div
              key={s.id}
              className="dining-card-itc bg-gray-800 rounded-xl shadow-2xl overflow-hidden transform hover:scale-105 hover:-translate-y-2 transition duration-500 cursor-pointer"
            >
              <img
                src={s.img}
                alt={s.subtitle}
                className="w-full h-52 md:h-64 object-cover"
              />
              <div className="p-6">
                <h5 className="text-gray-400 text-sm">{s.title}</h5>
                <h3 className="text-xl font-semibold text-yellow-400 mt-1">
                  {s.subtitle}
                </h3>
                <h6 className="text-gray-300 mt-2">Time: {s.time}</h6>
                <div className="mt-4">
                  <Link
                    to="/reserve"
                    state={{ session: s.id }}
                    className="inline-block px-4 py-2 bg-yellow-400 text-black font-semibold rounded-full hover:scale-105 transition"
                  >
                    Reserve
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
export default Dining;
