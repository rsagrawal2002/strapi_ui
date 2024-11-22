import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const LatestNews = () => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:1337/api/news-sections?populate=*")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched News Data:", data);
        setNewsData(data.data || []);
      })
      .catch((error) => console.error("Error fetching news:", error));
  }, []);

  if (!newsData || newsData.length === 0) {
    return <p>No news available. Please check the content in Strapi.</p>;
  }

  return (
    <section style={{ margin: "50px auto", maxWidth: "800px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px", fontWeight: "bold" }}>Latest News</h2>
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        dynamicHeight={false}
        interval={4000}
      >
        {newsData.map((news, index) => {
          const { Description, NewsLink, Image } = news;

          const imageUrl =
            Image && Image.length > 0
              ? `http://localhost:1337${Image[0]?.url || Image[0]?.formats?.medium?.url || Image[0]?.formats?.thumbnail?.url}`
              : null;

          return (
            <div key={news.id || index} className="news-item">
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={`News Image ${index + 1}`}
                  style={{ maxWidth: "100%", borderRadius: "8px" }}
                />
              )}
              <p style={{ margin: "15px 0", textAlign: "center" }}>
                {Description && Description[0]?.children[0]?.text}
              </p>
              {NewsLink && (
                <a
                  href={NewsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#007bff",
                    textDecoration: "underline",
                    display: "block",
                    textAlign: "center",
                  }}
                >
                  Read more
                </a>
              )}
            </div>
          );
        })}
      </Carousel>
    </section>
  );
};

export default LatestNews;
