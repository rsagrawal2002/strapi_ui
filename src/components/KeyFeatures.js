import React, { useEffect, useState } from "react";

const KeyFeatures = () => {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    // Fetch data from the 'key-features' endpoint
    fetch("http://localhost:1337/api/key-features?populate=*")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setFeatures(data.data || []);
      })
      .catch((error) => console.error("Error fetching key features:", error));
  }, []);

  if (!features || features.length === 0) {
    return <p>No key features available. Please check the content in Strapi.</p>;
  }

  return (
    <section
      style={{
        padding: "60px 20px",
        backgroundColor: "#f9f9f9",
        textAlign: "center",
      }}
    >
      <h2 style={{ color: "#333", marginBottom: "40px", fontSize: "2.5rem" }}>Key Features</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {features.map((feature, index) => {
          const { Title, Image, Icon } = feature;

          // Construct image URLs
          const imageUrl =
            Image &&
            `http://localhost:1337${Image.url || Image.formats?.medium?.url || Image.formats?.thumbnail?.url}`;
          const iconUrl = Icon && `http://localhost:1337${Icon.url}`;

          return (
            <div
              key={index}
              style={{
                position: "relative",
                padding: "50px",
                borderRadius: "16px",
                background:
                  "linear-gradient(90deg, rgba(99,93,255,1) 0%, rgba(131,119,247,1) 100%)",
                color: "#fff",
                textAlign: "center",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              {imageUrl && (
                <div style={{ marginBottom: "20px" }}>
                  <img
                    src={imageUrl}
                    alt={Title}
                    style={{
                      width: "80px",
                      height: "auto",
                      display: "block",
                      margin: "0 auto",
                      borderRadius: "8px",
                    }}
                  />
                </div>
              )}
              <h3 style={{ fontSize: "1.2rem", marginBottom: "40px" }}>{Title}</h3>
              {iconUrl && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "#fff",
                    borderRadius: "50%",
                    padding: "10px",
                    width: "50px",
                    height: "50px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <img
                    src={iconUrl}
                    alt={`${Title} Icon`}
                    style={{
                      width: "30px",
                      height: "30px",
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default KeyFeatures;
