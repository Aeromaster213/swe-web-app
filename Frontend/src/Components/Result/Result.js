import React, { useEffect, useState } from "react";
import { useUploadContext } from "../../Context/UploadContext";

export default function Result() {
    const [strings, setStrings] = useState("");
    useEffect(() => {
        async function getResult() {
            const response = await fetch("http://localhost:5001/api/result");
            if (!response.ok) {
                console.error("error occured:", response.statusText);
                return;
            }
            const results = response.json();
            setStrings(results);
        }

        getResult();
        console.log(strings);
        return;
    });

    return (
        <div className="result">
        </div>
    );
}