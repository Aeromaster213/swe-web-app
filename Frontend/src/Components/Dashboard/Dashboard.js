import React, {useEffect, useState} from "react";
import "./dashboard.css";
import {useUploadContext} from "../../Context/UploadContext";

export default function Dashboard() {
    const [transcriptions, setTranscriptions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/getDetails?user=${username}");
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

    return (
        <div className={"dashboard-container"}>
            {loading ? (<p>Loading...</p>) :
                (
                    transcriptions.map((item, index) => (
                        <div className={"dashboard-card"}>
                            <div className={"dashboard-name"}>{item.file}</div>
                            <div className={"dashboard-language"}>{item.language}</div>
                            <div className={"dashboard-srt"}>{item.srt}</div>
                            <div className={"dashboard-txt"}>{item.txt}</div>
                        </div>
                    ))
                )
            }

        </div>
    )
}