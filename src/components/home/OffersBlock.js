import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function OffersBlock() {
  const navigate = useNavigate();
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/admin/all-rooms");
        // We filter for items that have type 'offer' and are active
        const data = res.data
          .filter((o) => o.type === "offer" && o.active);
        setOffers(data);
      } catch (err) {
        console.error("Offers fetch error:", err);
      }
    };
    fetchOffers();
  }, []);

  const handleOfferClick = (offer) => {
    navigate("/booking", {
      state: {
        discount: offer.discount,
        offerTitle: offer.title,
      },
    });
  };

  if (!offers.length) return null;

  return (
    <section className="bg-[#f9f8f6] py-[100px] px-5 text-center font-[Montserrat]">
      <h2 className="text-[2.5rem] font-bold text-black mb-[50px] tracking-wide">Special Offers</h2>
      <div className="flex flex-wrap justify-center gap-[30px]">
        {offers.map((offer) => (
          <div key={offer.id} className="group relative bg-white rounded-[15px] overflow-hidden max-w-[450px] transition-all duration-500 hover:-translate-y-3 hover:scale-[1.04] hover:shadow-2xl animate-[floatCard_5s_ease-in-out_infinite]">
            <div className="pointer-events-none absolute top-0 left-[-120%] w-[60%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg] transition-all duration-700 group-hover:left-[150%]"></div>
            <div className="h-[250px] bg-cover bg-center" style={{ backgroundImage: `url(${offer.image})` }}></div>
            <div className="p-[25px]">
              <h3 className="text-[1.6rem] mb-[10px] text-[#c19b76] font-bold uppercase">{offer.title}</h3>
              <p className="text-[1rem] text-[#555] leading-[1.6] mb-[20px]">{offer.description}</p>
              <button onClick={() => handleOfferClick(offer)} className="mt-6 px-6 py-3 border-2 border-[#c19b76] text-[#c19b76] font-medium transition-all hover:bg-[#c19b76] hover:text-white">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
      <style>{`@keyframes floatCard { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }`}</style>
    </section>
  );
}

export default OffersBlock;