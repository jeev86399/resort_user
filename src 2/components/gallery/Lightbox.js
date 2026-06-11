import React from "react";


function Lightbox({ src, onClose }) {
  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <span className="lightbox-close" onClick={onClose}>×</span>
        <img src={src} alt="" />
      </div>
    </div>
  );
}

export default Lightbox;
