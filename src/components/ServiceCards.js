import React, { useEffect, useState } from "react";

const ServiceCards = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    // Fetch content from the 'service-cards' endpoint
    fetch("http://localhost:1337/api/service-cards?populate=*")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched Service Cards Data:", data); // Debugging output
        setServices(data.data || []);
      })
      .catch((error) => console.error("Error fetching service cards:", error));
  }, []);

  if (!services || services.length === 0) {
    return <p>No services available. Please check the content in Strapi.</p>;
  }

  return (
    <section className="service-cards">
      <h2>Our Services</h2>
      <div className="cards-container">
        {services.map((service, index) => {
          if (!service) return null; // Safeguard against undefined data

          const { Title, Description, Image } = service;

          // Construct full image URL
          const imageUrl =
            Image &&
            Image.length > 0 &&
            `http://localhost:1337${
              Image[0]?.formats?.medium?.url || Image[0]?.url
            }`;

          return (
            <div key={index} className="service-card">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={Title}
                  className="service-image"
                />
              ) : (
                <div className="placeholder-image">
                  <p>No Image Available</p>
                </div>
              )}
              <div className="service-content">
                <h3>{Title || "Untitled Service"}</h3>
                <p>
                  {Description &&
                    Description[0]?.children?.map((child) => child.text).join("")}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ServiceCards;
