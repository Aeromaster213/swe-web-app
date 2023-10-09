import React, { useEffect, useState } from "react";
import './about.css';

export default function About() {
    return (
        <div className={"about"}>
            <div className="about-text">
                <p>We use <span className="magic">AI-Powered</span> Tools</p>
                <p>to convert media files </p>
                <p>into text</p>
            </div>
        </div>
    );
}    
