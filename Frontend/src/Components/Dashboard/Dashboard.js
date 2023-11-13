import React, { useEffect, useState } from "react";
import "./dashboard.css";
import { useUploadContext } from "../../Context/UploadContext";

export default function Dashboard() {
  const [transcriptions, setTranscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedSrt, setCopiedSrt] = useState(false);
  const [copiedTxt, setCopiedTxt] = useState(false);
  const { username } = useUploadContext();

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
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/getDetails?user=${username}`
        );
        const data = await response.json();
        const dataArray = Object.values(data);

        console.log("data", JSON.stringify(dataArray));
        setTranscriptions(dataArray);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  return (
    <div className={"dashboard-container"}>
      {loading ? (
        <p className={"dashboard-loading"}>Loading...</p>
      ) : transcriptions.length > 0 ? (
        transcriptions.map((item, index) => (
          <div className={"dashboard-card"} key={index}>
            <div className={"dashboard-name dashboard-heading"}>
              {item.file}
            </div>
            <div className={"dashboard-language dashboard-heading"}>
              {(() => {
                switch (item.language) {
                  case "en":
                    return "English";
                  case "nl":
                    return "Native";
                  case "de":
                    return "German";
                  case "fr":
                    return "French";
                  default:
                    return "Unknown";
                }
              })()}
            </div>

            <div className={"transcription-container"}>
              <div className={"dashboard-srt"}>
                <div
                  className="copy-button"
                  onClick={() => copyTextToClipboard(item.txt, "txt")}
                >
                  Copy Text
                </div>
                <div className="transcription-scroll">{item.srt}</div>
              </div>

              <div className={"dashboard-txt"}>
                <div
                  className="copy-button"
                  onClick={() => copyTextToClipboard(item.srt, "srt")}
                >
                  Copy Text
                </div>
                <div className="transcription-scroll">{item.txt}</div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className={"dashboard-notrans"}>No Previous Transcriptions</p>
      )}
    </div>
  );
}
