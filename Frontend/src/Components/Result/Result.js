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
                    {/* <div className="result-box-wrap"> */}
                        <div className="result-box">
                            <div className="thumbnail"></div>
                            <div className="details">
                                <p>FILENAME: LOREM IPSUM</p>
                                <p>FILESIZE: 25MB</p>
                                <p>FILETYPE: AAC</p>
                            </div>
                        </div>
                    {/* </div> */}
                    <div className="result-heading">
                        <p className="result-heading-text">YOUR TRANSCRIPT IS READY</p>
                    </div>
                    <div className="buttons">
                        <div className="result-box txt-box">
                            <button
                                className="copy-button"
                                onClick={() => copyTextToClipboard(strings.txt, "txt")}
                            ></button>
                            <p className="result-txt">COPY TXT</p>
                            {strings.txt}
                        </div>
                        <div className="result-box srt-box">
                            <button
                                className="copy-button"
                                onClick={() => copyTextToClipboard(strings.srt, "srt")}
                            ></button>
                            <p className="result-srt ">COPY SRT</p>
                        </div>
                    </div>
                    <div className="result-display">
                        <div className="copied-txt">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        </div>
                        <div className="icon"></div>
                        <div className="srtied-txt">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
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
