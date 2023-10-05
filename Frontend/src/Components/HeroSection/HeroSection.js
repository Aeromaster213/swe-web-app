import React from "react";
import './herosection.css';

const heroimage = require('./Images/heroimage.png')

export default function HeroSection() {
    return (
        <div className="herosection-container">
            <div className="herosection-text translate"><text style={{ color: "#8080D7" }}>T</text>RANSLATE</div>
            <div className="herosection-text transcribe"><text style={{ color: "#8080D7" }}>T</text>RANSCRIBE</div>
            <div className="herosection-image">
                <img src={heroimage} alt="heroimage" />
            </div>
            <div className="herosection-button">UPLOAD FILE</div>
        </div>
    );
}