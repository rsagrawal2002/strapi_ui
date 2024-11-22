import React, { useEffect, useState } from "react";
import { fetchContent } from "../services/api";

const SafetyMonitoringSystem = () => {
  const [system, setSystem] = useState(null);

  useEffect(() => {
    fetchContent("safety-monitoring-system").then((data) => setSystem(data.attributes));
  }, []);

  if (!system) return null;

  return (
    <section
      className="safety-monitoring"
      style={{
        padding: "50px 20px",
        backgroundColor: "#f9f9f9",
        textAlign: "center",
      }}
    >
      <h2
        style={{
          fontSize: "2rem",
          marginBottom: "40px",
          color: "#333",
        }}
      >
        {system.section_title}
      </h2>
      <div
        className="features"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: "20px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {system.features.map((feature, index) => (
          <div
            key={index}
            className="feature"
            style={{
              flex: "1 1 30%", // Adjust to fit three items per row
              backgroundColor: "#ffffff",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
              transition: "transform 0.3s ease",
            }}
          >
            <img
              src={feature.image.data.attributes.url}
              alt={feature.title}
              style={{
                width: "100%",
                maxWidth: "200px",
                height: "auto",
                marginBottom: "20px",
                borderRadius: "5px",
              }}
            />
            <h3
              style={{
                fontSize: "1.2rem",
                marginBottom: "10px",
                color: "#635dff",
              }}
            >
              {feature.title}
            </h3>
            <p
              style={{
                fontSize: "1rem",
                lineHeight: "1.6",
                color: "#555",
              }}
            >
              {feature.description}
            </p>
          </div>
        ))}
      </div>
      <style>
        {`
          @media (max-width: 1024px) {
            .features {
              flex-direction: row;
              gap: 10px;
            }
            .feature {
              flex: 1 1 45%; /* Two items per row */
            }
          }

          @media (max-width: 768px) {
            .features {
              flex-direction: column;
              gap: 20px;
            }
            .feature {
              flex: 1 1 100%; /* Single item per row */
              padding: 15px;
            }
            h2 {
              font-size: 1.8rem;
            }
          }

          @media (max-width: 480px) {
            h2 {
              font-size: 1.5rem;
            }
            .feature h3 {
              font-size: 1rem;
            }
            .feature p {
              font-size: 0.9rem;
            }
            .feature img {
              max-width: 150px;
            }
          }
        `}
      </style>
    </section>
  );
};

export default SafetyMonitoringSystem;
