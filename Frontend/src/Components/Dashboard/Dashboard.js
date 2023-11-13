import React, {useEffect, useState} from "react";
import "./dashboard.css";
import {useUploadContext} from "../../Context/UploadContext";

export default function Dashboard() {
    const [transcriptions, setTranscriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [copiedSrt, setCopiedSrt] = useState(false);
    const [copiedTxt, setCopiedTxt] = useState(false);
    const {username} = useUploadContext();

    useEffect(() => {
        setCopiedSrt(false);
        setCopiedTxt(false);
    }, [transcriptions]);

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
        console.log(username);
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/getDetails?user=${username}`);
                const data = await response.json();
                const dataArray = Object.values(data);

                console.log("data", JSON.stringify(dataArray));
                setTranscriptions(dataArray);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [])

    return (<div className={"dashboard-container"}>
            {loading ? (<p>Loading...</p>) : (transcriptions.map((item, index) => (<div className={"dashboard-card"}>
                        <div className={"dashboard-name"}>{item.file}</div>
                        <div className={"dashboard-language"}>{item.language}</div>

                        <div className={"dashboard-srt"}>
                            <div
                                className="copy-button"
                                onClick={() => copyTextToClipboard(item.txt, "txt")}
                            >Copy Text
                            </div>
                            {item.srt}
                        </div>

                        <div className={"dashboard-txt"}>
                            <div
                                className="copy-button"
                                onClick={() => copyTextToClipboard(item.srt, "srt")}
                            >Copy Text
                            </div>
                            {item.txt}
                        </div>
                    </div>)))}

        </div>)
}