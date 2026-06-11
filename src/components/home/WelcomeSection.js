import React, { useState, useEffect } from "react";
import axios from "axios"; // Make sure to npm install axios
import "./WelcomeSection.css";

function WelcomeSection() {
  const [readMore, setReadMore] = useState(false);
  const [content, setContent] = useState({
    title: "Loading...",
    subTitle: "",
    mainText: "",
    hiddenText: ""
  });

  useEffect(() => {
    // Fetch data from your Spring Boot Backend
    axios.get("http://localhost:8080/api/admin/all-rooms")
      .then(res => {
        // Find the 'main' document from your Firestore screenshot
        const data = res.data.find(item => item.id === "main");
        if (data) {
          setContent({
            title: data.heroTitle || "Welcome To Radha Serenity Resort",
            subTitle: data.subTitle || "Varkala’s Coastal Haven",
            mainText: data.mainText || "",
            hiddenText: data.hiddenText || ""
          });
        }
      })
      .catch(err => console.error("Error fetching welcome data", err));
  }, []);

  return (
    <section className="welcome-section">
      <div className="welcome-container">
        <h2>{content.title}</h2>
        <h3>{content.subTitle}</h3>
        <p>
          {content.mainText}
          {readMore && (
            <>
              <br /><br />
              {content.hiddenText}
            </>
          )}
        </p>
        <button className="read-btn" onClick={() => setReadMore(!readMore)}>
          {readMore ? "Read Less" : "Read More"}
        </button>
      </div>
    </section>
  );
}

export default WelcomeSection;