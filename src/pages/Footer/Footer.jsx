import React from "react";
import logo from "/images/logo.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer bg-light text-dark py-2">
      <div className="container text-center">
        <div className="footer-logo mb-3">
          <img
            src={logo}
            alt="Kahve Dükkanı Logo"
            className="footer-logo-img"
          />
        </div>
        <div className="footer-about mb-3">
          <h5>Hakkımızda</h5>
          <p>
            En sevdiğiniz kahveler, tek tıkla kapınızda. Kaliteli çekirdeklerden
            hazırlanan taptaze kahvelerle gününüze lezzet katın.
          </p>
        </div>
        <div className="footer-contact">
          <h5>İletişim</h5>
          <p>
            E-posta: <a href="mailto:bilgi@coffeely.com">bilgi@coffeely.com</a>
          </p>
          <p>Telefon: +90 212 xxx xx xx</p>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Coffeely. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
