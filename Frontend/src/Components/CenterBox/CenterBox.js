import React from "react";
import './centerbox.css';

const wave = require("./Images/wave.png");
const play = require("./Images/play.png");

export default function CenterBox() {
    return (
        <div className="centerbox">
            <div className="centerbox-container">
                <div className="centerbox-title">
                    Supported Formats
                </div>
                <div className="centerbox-video">
                    <img src={play} alt="Play Button Icon"></img>
                    <p className="centerbox-text">MP4, MOV, MKV, WEBM</p>
                </div>
                <div className="centerbox-audio">
                    <img src={wave} alt="Audio Wave Icon"></img>
                    <p className="centerbox-text">MP3, WAV, FLAC, HEVC</p>
                </div>
            </div>
        </div>
    );
} 