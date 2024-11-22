import React, { useEffect, useState } from "react";
import { fetchContent } from "../services/api";

const ContactUs = () => {
  const [contact, setContact] = useState(null);

  useEffect(() => {
    fetchContent("contact-us").then((data) => setContact(data.attributes));
  }, []);

  if (!contact) return null;

  return (
    <section
      className="contact-us"
      style={{
        backgroundImage: `url(${contact.banner_image.data.attributes.url})`,
        backgroundSize: "cover",
        padding: "50px",
        color: "white",
        textAlign: "center",
      }}
    >
      <div className="contact-card">
        <h2>Contact</h2>
        <p>{contact.contact_number}</p>
        <a href={contact.redirection_link_url}>{contact.redirection_link_text}</a>
      </div>
    </section>
  );
};

export default ContactUs;
