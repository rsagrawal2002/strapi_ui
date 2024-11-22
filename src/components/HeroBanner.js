import React, { useEffect, useState } from "react";

const HeroBanner = () => {
  const [heroSections, setHeroSections] = useState([]); // Store all hero sections
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current section index
  const [isTransitioning, setIsTransitioning] = useState(false); // Smooth transition state

  useEffect(() => {
    // Fetch content from the 'hero-sections' endpoint
    fetch("http://localhost:1337/api/hero-sections?populate=*")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.data && data.data.length > 0) {
          setHeroSections(data.data); // Store all hero sections
        } else {
          console.warn("No hero sections data found!");
        }
      })
      .catch((error) => console.error("Error fetching hero sections:", error));
  }, []);

  // Set up automatic carousel
  useEffect(() => {
    if (heroSections.length > 0) {
      const interval = setInterval(() => {
        triggerNextSlide();
      }, 5000); // Change slide every 5 seconds
      return () => clearInterval(interval); // Clean up on unmount
    }
  }, [heroSections]);

  const triggerNextSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroSections.length); // Loop back to the start
      setIsTransitioning(false);
    }, 500); // Transition duration matches CSS animation
  };

  const handleDotClick = (index) => {
    if (index !== currentIndex) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(index);
        setIsTransitioning(false);
      }, 500);
    }
  };

  if (heroSections.length === 0) {
    return <p>Loading Hero Banner...</p>; // Placeholder while loading
  }

  const currentHero = heroSections[currentIndex];
  const { Headline, Description, BackgroundImage } = currentHero;

  // Parse background image URL
  const backgroundImageUrl =
    BackgroundImage?.url ||
    BackgroundImage?.formats?.large?.url ||
    BackgroundImage?.formats?.medium?.url ||
    BackgroundImage?.formats?.small?.url;

  // Extract description text
  const descriptionText =
    Description && Description.length > 0
      ? Description[0]?.children[0]?.text
      : "Default description";

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "450px", // Banner height
        marginBottom: "100px", // Space between this and next section
      }}
    >
      <section
        style={{
          backgroundImage: `linear-gradient(rgba(98, 0, 238, 0.7), rgba(98, 0, 238, 0.7)), url(http://localhost:1337${backgroundImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          padding: "100px 20px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "400px",
          position: "relative",
          opacity: isTransitioning ? 0 : 1,
          transition: "opacity 0.5s ease-in-out",
        }}
      >
        <style>
          {`
            @media (max-width: 768px) {
              section {
                padding: 50px 15px;
                height: auto;
              }
              h1 {
                font-size: 2rem;
              }
              p {
                font-size: 1rem;
                line-height: 1.5;
              }
            }
            @media (max-width: 480px) {
              section {
                padding: 30px 10px;
                height: auto;
              }
              h1 {
                font-size: 1.8rem;
              }
              p {
                font-size: 0.9rem;
              }
            }
          `}
        </style>
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            marginBottom: "20px",
            lineHeight: "1.2",
            textShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
          }}
        >
          {Headline || "Default Headline"}
        </h1>
        <p
          style={{
            fontSize: "1.2rem",
            lineHeight: "1.8",
            maxWidth: "800px",
            textShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
          }}
        >
          {descriptionText}
        </p>
      </section>

      {/* Carousel Dots */}
      <div
        style={{
          position: "absolute",
          bottom: "-100px", // Moves bubbles lower, avoiding interference with banner content
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "10px",
          zIndex: 1, // Ensures dots stay on top
        }}
      >
        {heroSections.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: currentIndex === index ? "white" : "rgba(255, 255, 255, 0.5)",
              border: "none",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;
