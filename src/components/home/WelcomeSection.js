// src/components/home/WelcomeSection.js
import React, { useEffect, useState } from "react";
import "./WelcomeSection.css";

// 1. Firebase Imports
import { db } from "../../services/firebase";
import { doc, getDoc } from "firebase/firestore";

function WelcomeSection() {
  const [readMore, setReadMore] = useState(false);
  
  // 2. States for dynamic content
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  const toggleReadMore = () => {
    setReadMore(!readMore);
  };

  // 3. Fetch data from siteSettings/welcome
  useEffect(() => {
    const fetchWelcomeData = async () => {
      try {
        const docRef = doc(db, "siteSettings", "welcome");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setContent(docSnap.data());
        } else {
          console.log("No such document in Firebase!");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching welcome data:", error);
        setLoading(false);
      }
    };

    fetchWelcomeData();
  }, []);

  if (loading) return null; // Or a small spinner
  if (!content) return null;

  return (
    <section className="welcome-section">
      <div className="welcome-container">
        {/* Using dynamic data from Firebase */}
        <h2>{content.title}</h2>
        <h3>{content.subtitle}</h3>
        
        <p>
          {content.mainText}
          
          {readMore && (
            <>
              <br /><br />
              {/* This text is now pulled from the 'hiddenText' field in Firebase */}
              {content.hiddenText}
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
