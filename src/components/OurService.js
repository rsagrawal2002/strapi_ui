import React, { useEffect, useState } from "react";

const OurService = () => {
  const [service, setService] = useState(null);

  useEffect(() => {
    fetch("http://localhost:1337/api/our-service?populate=*")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched Our Service Data:", data);
        if (data.data) {
          setService(data.data);
        } else {
          console.error("Unexpected data structure:", data);
        }
      })
      .catch((error) => console.error("Error fetching Our Service data:", error));
  }, []);

  if (!service) {
    return <p>Loading Our Service...</p>;
  }

  const {
    Title: title,
    Description: descriptionArray,
    RedirectionText: redirectionText,
    RedirectionURL: redirectionURL,
    Image: imageArray,
  } = service;

  // Parse description
  const description = descriptionArray
    ?.map((desc) => desc?.children?.map((child) => child.text).join(" "))
    .join("\n");

  // Extract image URL
  const imageUrl =
    imageArray?.[0]?.url ||
    imageArray?.[0]?.formats?.medium?.url ||
    imageArray?.[0]?.formats?.thumbnail?.url
      ? `http://localhost:1337${imageArray?.[0]?.url}`
      : null;

  return (
    <section
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "linear-gradient(90deg, rgba(99,93,255,0.9), rgba(131,119,247,0.9))",
        padding: "30px 20px",
        borderRadius: "16px",
        margin: "20px auto",
        color: "#ffffff",
        maxWidth: "1400px",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        style={{
          flex: "1 1 60%",
          paddingRight: "20px",
        }}
      >
        {/* Left Section */}
        <h2
          style={{
            fontSize: "2rem",
            marginBottom: "20px",
            fontWeight: "bold",
            lineHeight: "1.2",
          }}
        >
          {title}
        </h2>
        <p
          style={{
            fontSize: "1rem",
            lineHeight: "1.6",
            marginBottom: "20px",
            whiteSpace: "pre-wrap",
          }}
        >
          {description}
        </p>
        {redirectionText && redirectionURL && (
          <a
            href={redirectionURL}
            style={{
              fontSize: "1rem",
              color: "#ffffff",
              textDecoration: "underline",
              fontWeight: "bold",
              display: "inline-block",
              marginTop: "10px",
            }}
          >
            {redirectionText}
          </a>
        )}
      </div>

      {/* Right Section */}
      <div
        style={{
          flex: "1 1 40%",
          textAlign: "center",
          position: "relative",
        }}
      >
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Our Service"
            style={{
              maxWidth: "100%",
              height: "auto",
              borderRadius: "8px",
              boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
              transform: "translateY(-10px)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-20px)";
              e.target.style.boxShadow = "0px 16px 30px rgba(0, 0, 0, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(-10px)";
              e.target.style.boxShadow = "0px 8px 20px rgba(0, 0, 0, 0.2)";
            }}
          />
        )}
      </div>

      {/* Responsive Styling */}
      <style>
        {`
          @media (max-width: 1024px) {
            section {
              flex-direction: column;
              text-align: center;
              padding: 20px;
            }
            div[style*="flex: 1 1 60%"] {
              flex: 1 1 100%;
              padding-right: 0;
            }
            div[style*="flex: 1 1 40%"] {
              flex: 1 1 100%;
            }
            h2 {
              font-size: 1.8rem;
              margin-bottom: 10px;
            }
          }

          @media (max-width: 768px) {
            h2 {
              font-size: 1.5rem;
            }
            p {
              font-size: 1rem;
            }
            img {
              max-width: 80%;
            }
          }

          @media (max-width: 480px) {
            h2 {
              font-size: 1.2rem;
            }
            p {
              font-size: 0.9rem;
            }
            img {
              max-width: 70%;
            }
          }
        `}
      </style>
    </section>
  );
};

export default OurService;
