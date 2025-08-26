import React from "react";
import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer__copyright">
          &copy; {currentYear} Supersite, Powered by News API
        </p>
        <div className="footer__right-section">
          {" "}
          {/* New wrapper for nav links and social icons */}
          <div className="footer__nav-links">
            <a href="/" className="footer__link">
              Home
            </a>
            <a
              href="https://tripleten.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__link"
            >
              TripleTen
            </a>
          </div>
          <div className="footer__social-icons">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-icon-link footer__social-icon-github"
            >
              {/* GitHub icon will be set via CSS background-image */}
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-icon-link footer__social-icon-facebook"
            >
              {/* Facebook icon will be set via CSS background-image */}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
