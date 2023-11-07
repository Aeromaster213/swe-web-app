import React, {useEffect, useState} from "react";


import "./result.css"; // Import the CSS file



export default function Result() {
    const [strings, setStrings] = useState({}); // Initialize with an empty object
    const [copiedSrt, setCopiedSrt] = useState(false);
    const [copiedTxt, setCopiedTxt] = useState(false);


    async function getResult() {
        try {
            const response = await fetch("http://localhost:5001/api/upload");
            console.log(response);
            return response;
        } catch (error) {
            console.log("Not Uploaded");
            return error;
        }
    }

    // useEffect(() => {
    //     getResult().then((response) => response.json().then((data) => setStrings(data)))
    // }, []);

    useEffect(() => {
        getResult()
            .then((response) => {
                if (response.ok) {
                    return response.json(); // Return the parsed JSON if response is ok
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .then((data) => setStrings(data))
            .catch((error) => console.error(error)); // Handle any errors
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
        return () => {
            setStrings()
        }
    }, [])

    return (
        <div className="result">
            {strings ? (
                <div className="result-container">
                    <div className="result-heading">
                        <p className="result-heading-text">
                            <text style={{color: "#7a7acd"}}>Y</text>
                            our <text style={{color: "#7a7acd"}}>T</text>ranscription <text
                            style={{color: "#7a7acd"}}>I</text>s <text style={{color: "#7a7acd"}}>H</text>ere!
                        </p>
                    </div>
                    <div className="result-box srt-box">
                        <button
                            className="copy-button"
                            onClick={() => copyTextToClipboard(strings.srt, "srt")}
                        >Copy Subtitles!
                        </button>
                        <p className="result-srt ">The SRT Feature will be available shortly</p>
                    </div>
                    <div className="result-box txt-box">
                        <button
                            className="copy-button"
                            onClick={() => copyTextToClipboard(strings.txt, "txt")}
                        >Copy Text!
                        </button>
                        <p className="result-txt">{strings.txt}</p>
                    </div>
                </div>
            ) : (
                <h1 className="result-wait-text">Fetching The Results</h1>
            )
            }
        </div>
    );
}
