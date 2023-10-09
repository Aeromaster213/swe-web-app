import React from "react";
import { useUploadContext } from "../../Context/UploadContext";
import './navigation.css';

export default function Navigation() {
    const {showComponent, handleUploadComplete} = useUploadContext();

    const scrollAbout = () => {
        let section = document.getElementById("about")
        section.scrollIntoView({behavior: 'smooth'})
    }

    const goHome = () => {
        handleUploadComplete(false)
    }

    return (
        <nav className="navigation">
            <div className="nav-logo">
                <p className="nav-logo-text"><text style={{color: "#8080D7"}}>T</text>OWER <text style={{color: "#8080D7"}}>O</text>F <text style={{color: "#8080D7"}}>B</text>ABEL</p>
            </div>
            <div className="nav-links">
                { showComponent&&<div className="nav-links-item" onClick={goHome}>
                    <p className="nav-links-text">HOME</p>
                </div>}
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