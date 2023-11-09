import React, { useEffect, useState } from "react";
import { useUploadContext } from "../../Context/UploadContext";


import "./result.css"; // Import the CSS file
const graphic = require("./assets/graphic.png");


export default function Result() {
    const { strings, fileName } = useUploadContext();
    const [copiedSrt, setCopiedSrt] = useState(false);
    const [copiedTxt, setCopiedTxt] = useState(false);
    const [data, setData] = useState({ srt: "srt", txt: "txt" });

    useEffect(() => {
        console.log("Result component mounted");
        console.log("strings:", strings);
        if (strings) {
            setData(strings);
        }
    }, [strings]);

    useEffect(() => {
        console.log("Result component mounted");
    }, [strings]);


    useEffect(() => {
        setCopiedSrt(false);
        setCopiedTxt(false);
    }, [strings]);

    function copyTextToClipboard(text, type) {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        type === "txt" ? setCopiedTxt(true) : setCopiedSrt(false);
    }

    useEffect(() => {
        if (copiedSrt) {
            const timer = setTimeout(() => {
                setCopiedSrt(false);
            }, 3000);

            return () => clearTimeout(timer);

        }
    }, [copiedSrt]);

    useEffect(() => {
        if (copiedTxt) {
            const timer = setTimeout(() => {
                setCopiedTxt(false);
            }, 3000);
            return () => clearTimeout(timer);

        }
    }, [copiedTxt]);


    return (
        <div className="result">
            {data ? (
                <div className="result-container">
                    <div className="result-info">
                        <div className="infobox">
                            <div className="info-thumbnail"></div>
                            <div className="info-details">
                                <p>FILENAME: {fileName}</p>
                                {/* <p>FILESIZE: 25MB</p>
                                <p>FILETYPE: AAC</p> */}
                            </div>
                        </div>

                        <div className="result-heading">
                            <p className="result-heading-text">
                                Your Translation is ready!
                            </p>
                        </div>
                    </div>
                    <div className="result-section">
                        <div className="result-box result-srt">
                            <div
                                className="copy-button"
                                onClick={() => copyTextToClipboard(data.srt, "srt")}
                            >Copy Subtitle
                            </div>
                            <div className="result-res">
                                <p className="result-text ">{data.srt}</p>
                            </div>
                        </div>
                        <div className="result-graphic">
                            <img src={graphic} alt="Graphic"></img>
                        </div>
                        <div className="result-box result-txt">
                            <div
                                className="copy-button"
                                onClick={() => copyTextToClipboard(data.txt, "txt")}
                            >Copy Text
                            </div>
                            <div className="result-res">
                                <p className="result-text">{data.txt}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <h1 className="result-wait-text">Fetching The Results</h1>
            )
            }
        </div >
    );
}