import React, { useRef } from "react";
import './herosection.css';

const heroimage = require('./Images/heroimage.png')

export default function HeroSection() {
    const pickerRef = useRef(null);

    const handleButtonClick = () => {
        if (pickerRef.current)
            pickerRef.current.click();
    }

    return (
        <div className="herosection-container">
            <div className="herosection-text translate"><text style={{ color: "#8080D7" }}>T</text>RANSLATE</div>
            <div className="herosection-text transcribe"><text style={{ color: "#8080D7" }}>T</text>RANSCRIBE</div>
            <div className="herosection-image">
                <img src={heroimage} alt="heroimage" />
            </div>
            <input
                className="herosection-button-hidden"
                type="file"
                accept="audio/mp3 audio/flac audio/hevc audio/wav video/mp4 video/mov video/mkv video/webm"
                ref={pickerRef}
            />
            <button
                type="button"
                className="herosection-button"
                onClick={handleButtonClick}
            >UPLOAD FILE</button>
        </div>
    );
}