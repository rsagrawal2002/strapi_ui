import React, { useEffect, useState } from "react";

const Advantages = () => {
  const [advantagesData, setAdvantagesData] = useState(null);

  useEffect(() => {
    // Fetch content from the 'advantages' endpoint
    fetch("http://localhost:1337/api/advantages?populate=*&locale=en")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched Advantages Data:", data);
        if (data.data && data.data.length > 0) {
          setAdvantagesData(data.data[0]); // Assuming there's only one set of advantages
        } else {
          console.error("Unexpected data structure:", data);
        }
      })
      .catch((error) => console.error("Error fetching advantages:", error));
  }, []);

  if (!advantagesData) {
    return <p>Loading Advantages...</p>;
  }

  const { Descriptions } = advantagesData;
  const { ad1, ad2, ad3 } = Descriptions?.[0] || {}; // Extracting ad1, ad2, ad3

  return (
    <section
      style={{
        padding: "50px 20px",
        backgroundColor: "#ffffff",
        textAlign: "center",
      }}
    >
      <h2 style={{ fontSize: "2rem", marginBottom: "40px", color: "#333" }}>
        Our Advantages
      </h2>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
          maxWidth: "1200px",
          margin: "0 auto",
          flexWrap: "wrap",
        }}
      >
        {/* Advantage Cards */}
        {[ad1, ad2, ad3].map((adv, index) => (
          <div
            key={index}
            style={{
              flex: "1 1 30%", // Responsive: 1/3 width on desktop, adjust on smaller screens
              textAlign: "center",
              position: "relative",
              marginBottom: "30px",
              padding: "0 10px",
            }}
          >
            <p
              style={{
                fontSize: "1rem",
                color: "#333",
                lineHeight: "1.6",
                fontWeight: "bold",
                marginBottom: "20px",
              }}
            >
              {adv}
            </p>
            {/* Circle */}
            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                backgroundColor: "rgba(99, 93, 255, 0.1)",
                position: "relative",
                margin: "0 auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  backgroundColor: "#635dff",
                }}
              />
            </div>
          </div>
        ))}
      </div>
      {/* Dashed Connector */}
      <div
        style={{
          position: "relative",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "10%",
            right: "10%",
            width: "80%",
            height: "1px",
            backgroundColor: "#635dff",
            borderStyle: "dashed",
            margin: "0 auto",
          }}
        />
      </div>
      <style>
        {`
          @media (max-width: 768px) {
            div[style*="display: flex"] {
              flex-direction: column;
            }
            div[style*="textAlign: center"][style*="relative"] {
              flex: 1 1 100%;
            }
          }
          @media (max-width: 480px) {
            div[style*="flex: 1 1 30%"] {
              padding: 0 5px;
            }
            h2 {
              font-size: 1.5rem;
            }
            p {
              font-size: 0.9rem;
            }
          }
        `}
      </style>
    </section>
  );
};

export default Advantages;
