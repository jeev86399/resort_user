// Lightbox.js
import React, { useEffect } from "react";
import "../home/Weddings.css";
 // re-use same css file for lightbox styles

export default function Lightbox({ photos = [], startIndex = 0, onClose }) {
  const [index, setIndex] = React.useState(startIndex);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % photos.length);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + photos.length) % photos.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [photos.length, onClose]);

  if (!photos || photos.length === 0) return null;

  return (
    <div className="ls-lightbox-backdrop" role="dialog" aria-modal="true" onClick={onClose}>
      <div
        className="ls-lightbox"
        onClick={(e) => e.stopPropagation()}
        aria-label="Wedding photo viewer"
      >
        <button className="ls-close" onClick={onClose} aria-label="Close">&times;</button>

        <div className="ls-media-wrap">
          <button
            className="ls-nav ls-nav-left"
            onClick={() => setIndex((i) => (i - 1 + photos.length) % photos.length)}
            aria-label="Previous"
          >
            ‹
          </button>

          <img
            src={photos[index].src}
            alt={photos[index].alt || `Wedding image ${index + 1}`}
            className="ls-image"
            draggable="false"
          />

          <button
            className="ls-nav ls-nav-right"
            onClick={() => setIndex((i) => (i + 1) % photos.length)}
            aria-label="Next"
          >
            ›
          </button>
        </div>

        <div className="ls-caption">
          <div className="ls-caption-inner">
            <h4>{photos[index].title || ""}</h4>
            <p>{photos[index].desc || ""}</p>
            <span className="ls-counter">{index + 1} / {photos.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
