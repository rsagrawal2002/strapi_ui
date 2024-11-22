import React, { useEffect, useState } from "react";

const Footer = () => {
  const [footerData, setFooterData] = useState(null);

  useEffect(() => {
    // Fetch data from the API
    fetch("http://localhost:1337/api/footer?populate=*")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setFooterData(data.data || {});
      })
      .catch((error) => console.error("Error fetching footer data:", error));
  }, []);

  if (!footerData) {
    return null;
  }

  const { StaticBanner, ContactInfo } = footerData;

  // Construct image URL for StaticBanner
  const bannerUrl = StaticBanner
    ? `http://localhost:1337${StaticBanner.url || StaticBanner.formats?.large?.url}`
    : null;

  return (
    <footer
      style={{
        backgroundColor: "#002244",
        color: "#ffffff",
        padding: "40px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Static Banner Section */}
      {bannerUrl && (
        <div
          style={{
            background: `url(${bannerUrl}) no-repeat center/cover`,
            height: "150px",
            borderRadius: "8px",
            marginBottom: "30px",
          }}
        ></div>
      )}

      {/* Footer Content Section */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "1200px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        {/* Contacts Section */}
        {ContactInfo && (
          <div
            style={{
              flex: "1 1 100%",
              marginBottom: "20px",
              padding: "0 10px",
            }}
          >
            <h3
              style={{
                marginBottom: "10px",
                fontSize: "1.2rem",
                fontWeight: "bold",
              }}
            >
              Contacts
            </h3>
            <p style={{ margin: "5px 0", fontSize: "1rem" }}>{ContactInfo.Address}</p>
            <p style={{ margin: "5px 0", fontSize: "1rem" }}>
              <strong>Email:</strong>{" "}
              <a
                href={`mailto:${ContactInfo.Email}`}
                style={{ color: "#00bfff", textDecoration: "none" }}
              >
                {ContactInfo.Email}
              </a>
            </p>
            <p style={{ margin: "5px 0", fontSize: "1rem" }}>
              <strong>Phone:</strong> {ContactInfo.PhoneNo}
            </p>
          </div>
        )}

        {/* Company Links */}
        <div
          style={{
            flex: "1 1 100%",
            marginBottom: "20px",
            padding: "0 10px",
          }}
        >
          <h3
            style={{
              marginBottom: "10px",
              fontSize: "1.2rem",
              fontWeight: "bold",
            }}
          >
            Company
          </h3>
          <p style={{ margin: "5px 0", fontSize: "1rem" }}>
            <a
              href="#about-us"
              style={{ color: "#00bfff", textDecoration: "none" }}
            >
              About Us
            </a>
          </p>
          <p style={{ margin: "5px 0", fontSize: "1rem" }}>
            <a
              href="#our-team"
              style={{ color: "#00bfff", textDecoration: "none" }}
            >
              Our Team
            </a>
          </p>
        </div>
      </div>

      {/* Responsive Styling */}
      <style>
        {`
          @media (max-width: 768px) {
            footer {
              padding: 20px;
            }
            div[style*="flex: 1"] {
              flex: 1 1 100%;
              text-align: center;
              padding: 10px 0;
            }
            h3 {
              font-size: 1rem;
              margin-bottom: 5px;
            }
            p {
              font-size: 0.9rem;
            }
          }

          @media (max-width: 480px) {
            footer {
              padding: 10px;
            }
            div[style*="flex: 1"] {
              margin-bottom: 10px;
            }
            p {
              font-size: 0.8rem;
            }
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;
