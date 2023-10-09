import React, { useRef, useState } from "react";
import './herosection.css';

const heroimage = require('./Images/heroimage.png')

export default function HeroSection() {
    const pickerRef = useRef(null);
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        if (selectedFile) {
            console.log("Selected file name:", selectedFile.name);
            // You can now do something with the selected file, such as uploading it.
        } else {
            console.log("No file selected.");
        }
    }

    const handleButtonClick = () => {
        if (pickerRef.current) {
            pickerRef.current.click();
        }
    }

    return (
        <div className="herosection-container">
            <div className="herosection-text translate"><text style={{ color: "#8080D7" }}>T</text>RANSLATE</div>
            <div className="herosection-text transcribe"><text style={{ color: "#8080D7" }}>T</text>RANSCRIBE</div>
            <div className="herosection-image">
                <img src={heroimage} alt="heroimage" />
            </div>
            <input
                type="file"
                accept="audio/mp3 audio/flac audio/hevc audio/wav video/mp4 video/mov video/mkv video/webm"
                ref={pickerRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />
            <button
                type="button"
                className="herosection-button"
                onClick={handleButtonClick}
            >UPLOAD FILE</button>
        </div>
    );
}
