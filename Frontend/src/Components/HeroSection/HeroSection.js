import React, {useRef, useState} from "react";
import {useUploadContext} from "../../Context/UploadContext";
import './herosection.css';
import LoadingSpinner from "../Loading/Loading";

const heroimage = require('./Images/heroimage.png')

export default function HeroSection() {
    const {handleUploadComplete} = useUploadContext();

    const pickerRef = useRef(null);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile({selectedFile: e.target.files[0]});
        if (selectedFile) {
            console.log("Selected file name:", selectedFile.name);
            // You can now do something with the selected file, such as uploading it.
        } else {
            console.log("No file selected.");
        }
    }

    const handleButtonClick = () => {
        if (pickerRef.current) {
            pickerRef.current.click();
        }
    }

    const handleUpload = async () => {
        if (!file) window.alert("Select A file first")
        else if (file.selectedFile) {
            console.log(file);
            const formData = new FormData();
            const language = document.getElementById("language").value;
            formData.append('file', file.selectedFile, file.selectedFile.name);
            formData.append('language', language);

            try {
                const response = await fetch("http://localhost:5000/api/upload",
                    {
                        method: "POST",
                        body: formData,
                    }
                )
                
                if (response.ok) {
                    setLoading(true);
                    const data = await response.json();
                    console.log("response:", JSON.stringify(data));
                    handleUploadComplete(true, data, file.selectedFile.name);
                    setLoading(false);
                } else {
                    console.error("Failed to upload")
                }
            } catch (error) {
                console.error("Could not upload:", error);
            }
        } else {
            console.log("File not selected");
        }
    }

    return (
        <div className="herosection-container">
            {!loading ? (
                <>
                    <div className="herosection-text translate">
                        <text style={{color: "#8080D7"}}>T</text>
                        RANSLATE
                    </div>
                    <div className="herosection-text transcribe">
                        <text style={{color: "#8080D7"}}>T</text>
                        RANSCRIBE
                    </div>
                    <div className="herosection-image">
                        <img src={heroimage} alt="heroimage"/>
                    </div>
                    <div className="herosection-buttons">
                        <input
                            type="file"
                            accept="audio/mp3 audio/flac audio/hevc audio/wav video/mp4 video/mov video/mkv video/webm"
                            ref={pickerRef}
                            onChange={handleFileChange}
                            style={{display: 'none'}}
                        />
                        <button
                            type="button"
                            className="herosection-button"
                            onClick={handleButtonClick}
                        >{file ? file.selectedFile.name : "Select File"}</button>
                        <select id="language" className="herosection-button">
                            <option value="nl">Native</option>
                            <option value={"en"}>English</option>
                            <option value="de">German</option>
                            <option value="rs">Russian</option>
                        </select>
                        <button
                            type="button"
                            className="herosection-button"
                            onClick={handleUpload}
                        >Upload File
                        </button>
                    </div>
                </>) : (
                <LoadingSpinner/>
            )}
        </div>
    );
}
