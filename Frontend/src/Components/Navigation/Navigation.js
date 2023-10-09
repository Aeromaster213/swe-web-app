import React from "react";
import './navigation.css';

export default function Navigation() {
    const scrollAbout = () => {
        let section = document.getElementById("about")
        section.scrollIntoView({behavior: 'smooth'})
    }

    return (
        <nav className="navigation">
            <div className="nav-logo">
                <p className="nav-logo-text"><text style={{color: "#8080D7"}}>T</text>OWER <text style={{color: "#8080D7"}}>O</text>F <text style={{color: "#8080D7"}}>B</text>ABEL</p>
            </div>
            <div className="nav-links">
                <div className="nav-links-item" onClick={scrollAbout}>
                    <p className="nav-links-text">ABOUT</p>
                </div>
                <div className="nav-links-item">
                    <p className="nav-links-text">LOGOUT</p>
                </div>
            </div>
        </nav>
    );
}