import React, { useEffect, useState } from "react";
import "./result.css"; // Import the CSS file

export default function Result() {
    const [strings, setStrings] = useState(); // Initialize with an empty object
    const [copiedSrt, setCopiedSrt] = useState(false);
    const [copiedTxt, setCopiedTxt] = useState(false);


    async function getResult() {
        let retries = 8; // Maximum number of retries
        try {
            const response = await fetch("http://localhost:5001/api/results");
            if (!response.ok) {
                console.log("error");
                console.error("error occurred:", response.statusText);
                if (retries > 0) {
                    // Retry the fetch after a delay (e.g., 3 seconds)
                    setTimeout(() => {
                        getResult();
                    }, 3000);
                    retries--;
                } else {
                    // Handle maximum retries exceeded
                    console.error("Maximum retries exceeded");
                }
                return;
            }
            const results = await response.json();
            console.log(response);
            console.log(results);

            setStrings(results);
        } catch (error) {
            console.error(error);
            if (retries > 0) {
                // Retry the fetch after a delay (e.g., 3 seconds)
                setTimeout(() => {
                    getResult();
                }, 3000);
                retries--;
            } else {
                // Handle maximum retries exceeded
                console.error("Maximum retries exceeded");
            }
        }
    }

    useEffect(() => {
        getResult();
    }, []);


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

    useEffect(() => {
        return () => { setStrings() }
    }, [])

    return (
        <div className="result">
            {strings ? (
                <div className="result-container">
                    <div className="result-heading">
                        <p className="result-heading-text"><text style={{ color: "#7a7acd" }}>Y</text>our <text style={{ color: "#7a7acd" }}>T</text>ranscription <text style={{ color: "#7a7acd" }}>I</text>s <text style={{ color: "#7a7acd" }}>H</text>ere!</p>
                    </div>
                    <div className="result-box srt-box">
                        <button
                            className="copy-button"
                            onClick={() => copyTextToClipboard(strings.srt, "srt")}
                        >Copy Subtitles!</button>
                        <p className="result-srt ">The SRT Feature will be available shortly</p>
                    </div>
                    <div className="result-box txt-box">
                        <button
                            className="copy-button"
                            onClick={() => copyTextToClipboard(strings.txt, "txt")}
                        >Copy Text!</button>
                        <p className="result-txt">{strings.txt}</p>
                    </div>
                </div>
            ) : (
                <h1 className="result-wait-text">Fetching The Results</h1>
            )
            }
        </div >
    );
}
