// Weddings.js
import React from "react";
import "./Weddings.css";
import LightboxWedding from '../gallery/LightboxWedding';




const features = [
  {
    title: "Vibrant, Diverse Venues",
    desc:
      "From intimate gatherings to grand celebrations — banquet halls, lakeside lawns and scenic outdoor spaces for unforgettable moments.",
    img: "https://prod.olyhols.com/76669/night-view-of-swimming-pool-at-paralos-venue-suites.png?rmode=max&width=800&height=800&quality=100&v=1da970bdb9bb4a0"
  },
  {
    title: "Award-Winning Cuisines",
    desc:
      "Custom menus and curated feasts — our chefs craft signature experiences inspired by local and global flavours.",
    img: "https://images.unsplash.com/photo-1555243896-c709bfa0b564"
  },
  {
    title: "Perfectly Crafted Weddings",
    desc:
      "Complete planning: décor, entertainment, stage design and guest hospitality — everything tailored to your dream.",
    img: "https://assets.simplotel.com/simplotel/image/upload/x_0,y_26,w_500,h_281,r_0,c_crop,q_80,fl_progressive/w_500,f_auto,c_fit/digantaa-resort/photo-1587271407850-8d438ca9fdf2_jmsi6d"
  },
  {
    title: "Picture-Perfect Moments",
    desc:
      "Cinematic photography & videography teams capture every memory against our scenic backdrops.",
    img: "https://images.venuebookingz.com/36512-1746179785-wm-ideal-5.jpg"
  }
];

// 12 images used for gallery (you already provided many links — using those)
const galleryPhotos = [
  { src: "https://imagewedz.oyoroomscdn.com/medium/photologue/images/sports-club-of-jabalpur-tilhari-jabalpur.png", alt: "Indian wedding hands", title: "Rituals & Texture" },
  { src: "https://www.dpolohotels.com/wp-content/uploads/2025/01/Why-Choose-a-Wedding-Resort-in-Dharamshala.jpg", alt: "Hindu wedding ritual", title: "Sacred Vows" },
  { src: "https://image.wedmegood.com/resized/720X/uploads/member/750981/1701346935_justa_brij_bhoomi_nathdwara.jpg?crop=84,64,1079,607", alt: "Wedding venue", title: "Royal Venues" },
  { src: "https://www.tourmyindia.com/blog//wp-content/uploads/2016/04/Luxury-Wedding-Destination.jpg", alt: "Luxury wedding destination", title: "Destination Moments" },
  { src: "https://cdn0.weddingwire.in/vendor/2022/3_2/960/png/wedding-resorts-brahmi-wellness-retreat-spa-poolside_15_432022-166971982719719.jpeg", alt: "Poolside wedding", title: "Poolside Romance" },
  { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF-Ccj1miy4C-Sri7dV5fG215m7hwQZm_Suw&s", alt: "Bride groom closeup", title: "Couple Closeup" },
  { src: "https://wedclick.in/wp-content/uploads/2022/07/15-Most-Important-Wedding-Photos-In-An-Indian-Wedding-Album-2.jpg", alt: "Wedding album shot", title: "Album Classics" },
  { src: "https://www.dellaresorts.com/images/della-wedding-bn2.webp", alt: "Della wedding", title: "Resort Celebrations" },
  { src: "https://images.squarespace-cdn.com/content/v1/6627d116ba2358384fb2b475/1736908397113-D46HGHNE5N20D3VH432S/213332734.jpg", alt: "Romantic couple", title: "Romantic Portraits" },
  { src: "https://weddingsutra.com/images/wedding-images/blog-images/kerala-destination-weddings/kerala-dw-img1.jpg", alt: "Kerala wedding", title: "Kerala Charm" },
  { src: "https://weddingsutra.com/images/wedding-images/blog-images/kerala-destination-weddings/kerala-dw-img3.jpg", alt: "Kerala ceremony", title: "Traditional Touch" },
  { src: "https://bcdn.la-mirage.in/wp-content/uploads/2023/01/Destination-Wedding-Venue-in-Kerala.png.webp", alt: "Banquet setup", title: "Grand Setups" }
];

export default function Weddings() {
  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const [startIndex, setStartIndex] = React.useState(0);

  // reveal animation (parallax-ish)
  React.useEffect(() => {
    const handleScroll = () => {
      const rows = document.querySelectorAll(".wed-feature-row, .gallery-card");
      rows.forEach((el, idx) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0) scale(1)";
        } else {
          el.style.opacity = "0";
          el.style.transform = "translateY(30px) scale(0.995)";
        }
      });
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // card tilt handler (mouse move)
  const handleTilt = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2); // -1 .. 1
    const dy = (e.clientY - cy) / (rect.height / 2); // -1 .. 1
    const rx = dy * 6; // rotateX
    const ry = dx * -6; // rotateY
    el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
    el.style.boxShadow = `${-ry * 4}px ${rx * 4 + 12}px 30px rgba(0,0,0,0.18)`;
  };

  const resetTilt = (e) => {
    const el = e.currentTarget;
    el.style.transform = "";
    el.style.boxShadow = "";
  };

  const openLightbox = (i) => {
    setStartIndex(i);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "";
  };

  return (
    <div className="wed-page">

      {/* HERO */}
      <div className="wed-hero">
        <video autoPlay loop muted playsInline className="wed-video">
          <source src="https://assets.mixkit.co/videos/5224/5224-720.mp4" type="video/mp4" />
        </video>
        <div className="wed-overlay" />
        <div className="wed-hero-text">
          <h1>Our Wedding Memories</h1>
          <p>Moments of love, laughter & celebration</p>
          <div className="scroll-hint" aria-hidden>↓</div>
        </div>
      </div>

      {/* Intro */}
      <section className="wed-intro">
        <h2>Our Moment, Your Way</h2>
        <h3>Weddings Crafted by Radha Serenity Resort</h3>
        <p>
          At Radha Serenity Resort, weddings are crafted with elegance, warmth and cinema-grade hospitality.
          Choose from scenic lawns, serene lakeside spaces and opulent indoor halls.
        </p>
      </section>

      {/* Feature rows */}
      <section className="wed-features">
        {features.map((f, i) => (
          <div className={`wed-feature-row ${i % 2 === 1 ? "reverse" : ""}`} key={i}>
            <div className="wed-feature-text">
              <h2>{f.title}</h2>
              <p>{f.desc}</p>
            </div>
            <div className="wed-feature-img">
              <img src={f.img + "?auto=format&fit=crop&w=1200&q=60"} alt={f.title} />
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <div className="wed-cta">
        <h2>Plan Your Dream Wedding With Us</h2>
        <p>Your fairytale celebration starts here.</p>
        <a href="/booking" className="wed-btn">Get in touch</a>
      </div>

      {/* 3D Gallery Grid */}
      <section className="wed-gallery-section">
        <h2 className="gallery-title">Great Weddings — Modern + Traditional</h2>

        <div className="gallery-grid">
          {galleryPhotos.map((p, idx) => (
            <figure
              key={idx}
              className="gallery-card"
              onMouseMove={handleTilt}
              onMouseLeave={resetTilt}
              onClick={() => openLightbox(idx)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter") openLightbox(idx); }}
              aria-label={`Open image ${idx + 1}`}
            >
              <div className="card-media">
                <img src={p.src} alt={p.alt || `Wedding photo ${idx + 1}`} />
              </div>
              <figcaption className="card-caption">
                <h4>{p.title}</h4>
                <p>{p.alt}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {lightboxOpen && (
        <LightboxWedding photos={galleryPhotos} startIndex={startIndex} onClose={closeLightbox} />
      )}
    </div>
  );
}
