import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Dining() {
  const [data, setData] = useState({
    hero: null,
    sessions: [],
    chefSpecials: []
  });

  useEffect(() => {
    const fetchDiningData = async () => {
      try {
        // Fetching everything from your Spring Boot Backend
        const res = await axios.get("http://localhost:8080/api/admin/all-rooms");
        
        // Filter out the data based on how you saved it in Firestore
        const hero = res.data.find(item => item.id === "diningHero");
        const chefSpecials = res.data.filter(item => item.type === "chefSpecial");
        const sessionsRaw = res.data.filter(item => item.type === "diningSession");

        // Sort sessions
        const order = ["morning", "breakfast", "lunch", "evening", "dinner", "late-night"];
        const sortedSessions = sessionsRaw.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));

        setData({ hero, sessions: sortedSessions, chefSpecials });
      } catch (err) {
        console.error("Dining fetch error:", err);
      }
    };
    fetchDiningData();
  }, []);

  if (!data.hero) return <div className="bg-gray-900 h-screen flex items-center justify-center text-white">Loading Menu...</div>;

  return (
    <div className="dining-page bg-gray-900 text-gray-100">
      {/* Hero Section */}
      <div className="h-[500px] md:h-[600px] flex items-center justify-center relative overflow-hidden"
        style={{ backgroundImage: `url(${data.hero.image})`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative text-center px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white">{data.hero.title}</h1>
          <p className="text-xl md:text-2xl mt-4 text-gray-200">{data.hero.subtitle}</p>
        </div>
      </div>

      {/* Chef Specials */}
      <section className="py-16 px-6 md:px-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-yellow-400">Chef’s Signature Experiences</h2>
        <div className="grid md:grid-cols-3 gap-12">
          {data.chefSpecials.map((chef) => (
            <div key={chef.id} className="bg-gray-800 rounded-xl overflow-hidden hover:scale-105 transition duration-500">
              <img src={chef.img} alt={chef.title} className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-yellow-400 mb-2">{chef.title}</h3>
                <p className="text-gray-300">{chef.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dining Sessions */}
      <section className="py-16 px-6 md:px-16 bg-gray-900">
        <h2 className="text-4xl font-bold text-center mb-12 text-yellow-400">Timings & Sessions</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {data.sessions.map((s) => (
            <div key={s.id} className="bg-gray-800 rounded-xl overflow-hidden hover:-translate-y-2 transition duration-500">
              <img src={s.img} alt={s.subtitle} className="w-full h-52 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-yellow-400">{s.subtitle}</h3>
                <h6 className="text-gray-300 mt-2">Time: {s.time}</h6>
                <Link to="/reserve" state={{ session: s.id }} className="mt-4 inline-block px-4 py-2 bg-yellow-400 text-black font-semibold rounded-full">Reserve</Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Dining;