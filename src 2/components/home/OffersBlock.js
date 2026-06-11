import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebase";

function OffersBlock() {
  const navigate = useNavigate();
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      const snap = await getDocs(collection(db, "offers"));
      const data = snap.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((o) => o.active);
      setOffers(data);
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
      {/* Title */}
      <h2 className="text-[2.5rem] font-bold text-black mb-[50px] tracking-wide">
        Special Offers
      </h2>

      {/* Cards */}
      <div className="flex flex-wrap justify-center gap-[30px]">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="group relative bg-white rounded-[15px] overflow-hidden max-w-[450px]
                       transition-all duration-500
                       hover:-translate-y-3 hover:scale-[1.04]
                       hover:shadow-[0_20px_35px_rgba(0,0,0,0.25)]
                       animate-[floatCard_5s_ease-in-out_infinite]"
          >
            {/* Shine Effect */}
            <div
              className="pointer-events-none absolute top-0 left-[-120%] w-[60%] h-full
                         bg-gradient-to-r from-transparent via-white/30 to-transparent
                         skew-x-[-20deg] transition-all duration-700
                         group-hover:left-[150%]"
            ></div>

            {/* Image */}
            <div
              className="h-[250px] bg-cover bg-center"
              style={{ backgroundImage: `url(${offer.image})` }}
            ></div>

            {/* Content */}
            <div className="p-[25px]">
              <h3 className="text-[1.6rem] mb-[10px] text-[#c19b76] font-bold uppercase">
                {offer.title}
              </h3>

              <p className="text-[1rem] text-[#555] leading-[1.6] mb-[20px]">
                {offer.description}
              </p>

              <button
                onClick={() => handleOfferClick(offer)}
                className="mt-6 px-6 py-3 border-2 border-[#c19b76]
                           text-[#c19b76] font-medium
                           transition-all duration-300
                           hover:bg-[#c19b76] hover:text-white"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Floating animation */}
      <style>{`
        @keyframes floatCard {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </section>
  );
}

export default OffersBlock;
