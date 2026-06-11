import React, { useState } from "react";
import "./WelcomeSection.css";

function WelcomeSection() {
  const [readMore, setReadMore] = useState(false);

  const toggleReadMore = () => {
    setReadMore(!readMore);
  };

  return (
    <section className="welcome-section">
      <div className="welcome-container">
        <h2>Welcome To Radha Serenity Resort </h2>
        <h3>Varkala’s Coastal Haven</h3>
        <p>
          Nestled along Kerala’s sun-kissed shores near the tranquil cliffs of Varkala, Radha Serenity Resort is where the charm of the Arabian Sea meets timeless luxury. Surrounded by coconut palms and soothing sea breeze, our resort is a sanctuary for travelers who seek peace, comfort, and a deeper connection with nature. Every sunrise here paints the ocean in gold, and every sunset whispers serenity.
          {readMore && (
            <>
              <br />
              <br />
              Designed with a blend of traditional Kerala aesthetics and modern sophistication, each space at Radha Serenity reflects the soul of coastal living. Whether you’re lounging by the infinity pool, savoring local delicacies crafted with love, or simply listening to the rhythm of waves, every moment invites you to slow down and breathe again.
              <br />
              <br />
              At Radha Serenity Resort, we believe true luxury lies in simplicity — in the sound of the sea, the glow of the evening lamps, and the warmth of genuine hospitality. Come, escape the ordinary and let the ocean write your story of calm, beauty, and everlasting memories.
            </>
          )}
        </p>

        <button className="read-btn" onClick={toggleReadMore}>
          {readMore ? "Read Less" : "Read More"}
        </button>
      </div>
    </section>
  );
}

export default WelcomeSection;
