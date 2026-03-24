import React from "react";
import {
  FacebookFilled,
  MailFilled,
  PushpinFilled,
  PhoneFilled,
} from "@ant-design/icons";
import "../../styles/CommonStyles.css";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-text">
        "Transformation through Innovation and Excellence"
      </div>

      <div className="contact-item">
        Contact:
        <a
          href="https://www.facebook.com/cetase.uv"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          <FacebookFilled className="footer-icon" />
          facebook
        </a>
      </div>

      <div className="contact-item">
        <MailFilled className="footer-icon" />
        uvcetase@gmail.com
      </div>

      <div className="contact-item">
        <PhoneFilled className="footer-icon" />
        +63 123 456 7890
      </div>

      <div className="contact-item">
        <PushpinFilled className="footer-icon" />
        University of the Visayas - Main
      </div>

    </footer>
  );
};

export default Footer;