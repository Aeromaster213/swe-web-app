import React, { useState } from "react";
import { useUploadContext } from "../../Context/UploadContext";
import "./navigation.css";

export default function Navigation() {
  const { showComponent, handleUploadComplete, handleLoginContext } = useUploadContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollAbout = () => {
    let section = document.getElementById("about");
    section.scrollIntoView({ behavior: "smooth" });
    closeMobileMenu();
  };

  const goHome = () => {
    handleUploadComplete(false);
    closeMobileMenu();
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
const handleLogout = () => {
  handleLoginContext(false);
}

  return (
    <nav className="navigation">
      <div className="nav-logo">
        <p className="nav-logo-text">
          <text style={{ color: "#8080D7" }}>T</text>OWER{" "}
          <text style={{ color: "#8080D7" }}>O</text>F{" "}
          <text style={{ color: "#8080D7" }}>B</text>ABEL
        </p>
      </div>
      <div className={`nav-links ${isMobileMenuOpen ? "open" : ""}`}>
        {showComponent && (
          <div className="nav-links-item" onClick={goHome}>
            <p className="nav-links-text">HOME</p>
          </div>
        )}
        <div className="nav-links-item" onClick={scrollAbout}>
          <p className="nav-links-text">ABOUT</p>
        </div>
        <div className="nav-links-item" onClick={handleLogout}>
          <p className="nav-links-text">LOGOUT</p>
        </div>
      </div>
      <div className="hamburger-menu" onClick={toggleMobileMenu}>
        <div className={`bar ${isMobileMenuOpen ? "open" : ""}`}></div>
        <div className={`bar ${isMobileMenuOpen ? "open" : ""}`}></div>
        <div className={`bar ${isMobileMenuOpen ? "open" : ""}`}></div>
      </div>
    </nav>
  );
}

