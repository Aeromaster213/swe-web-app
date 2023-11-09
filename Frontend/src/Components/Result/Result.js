import React, {useEffect, useState} from "react";
import { useUploadContext } from "../../Context/UploadContext";


import "./result.css"; // Import the CSS file



export default function Result() {
    const {strings} = useUploadContext();
    const [copiedSrt, setCopiedSrt] = useState(false);
    const [copiedTxt, setCopiedTxt] = useState(false);
    const [data, setData] = useState(null);

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
                            onClick={() => copyTextToClipboard(data.srt, "srt")}
                        >Copy Subtitles!
                        </button>
                        <p className="result-srt ">{data.srt}</p>
                    </div>
                    <div className="result-box txt-box">
                        <button
                            className="copy-button"
                            onClick={() => copyTextToClipboard(data.txt, "txt")}
                        >Copy Text!
                        </button>
                        <p className="result-txt">{data.txt}</p>
                    </div>
                </div>
            ) : (
                <h1 className="result-wait-text">Fetching The Results</h1>
            )
            }
        </div>
    );
}
