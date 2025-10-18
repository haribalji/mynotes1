import React, { useRef, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Summarizer.css";
import { useNavigate } from "react-router-dom";

const FileUpload = () => {
  const summaryRef = useRef(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [speechSynthesis, setSpeechSynthesis] = useState(
    window.speechSynthesis
  );
  const [utterance, setUtterance] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("auto"); // Default: Auto-detect
  const [isPaused, setIsPaused] = useState(false);
  const [ispeak, setispeak] = useState("speak");
  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("document", file);
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/summarizes", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      // console.log(data);
      setSummary(data.summary || "Summarization failed.");
    } catch (error) {
      console.error("Error:", error);
      setSummary("An error occurred during summarization.");
    }
    setLoading(false);
  };

  const detectLanguage = (text) => {
    const tamilRegex = /[\u0B80-\u0BFF]/;
    return tamilRegex.test(text) ? "ta" : "en";
  };
  // const pauseSpeech = () => {
  //   if (speechSynthesis.speaking && !speechSynthesis.paused) {
  //     speechSynthesis.pause();
  //     setispeak("speak");

  //     setIsPaused(true);
  //   }
  // };

  // const resumeSpeech = () => {
  //   if (speechSynthesis.paused) {
  //     speechSynthesis.resume();
  //     setispeak("speaking");

  //     setIsPaused(false);
  //   }
  // };

  const stopSpeech = () => {
    if (speechSynthesis.speaking) {
      setispeak("speak");
      speechSynthesis.cancel();
    }
  };
  // This function stops any ongoing speech.
  // speechSynthesis.cancel() immediately halts speech output.

  const speakText = () => {
    if (speechSynthesis.speaking) {
      setispeak("speak");

      speechSynthesis.cancel();
    }
    setispeak("speaking...");

    if (summary) {
      let lang;
      if (selectedLanguage === "auto") {
        lang = detectLanguage(summary);
      } else {
        lang = selectedLanguage;
      }

      let textToSpeak = summary;

      // If Tamil is selected, remove English words to prevent awkward pronunciation
      if (lang === "ta") {
        textToSpeak = summary.replace(/[A-Za-z0-9.,!?;:"'(){}[\]]+/g, ""); // Remove English words and special characters
      } else if (lang === "en") {
        // English mode: Remove unwanted symbols
        textToSpeak = textToSpeak.replace(/[\*\-,—]/g, "");
      }

      const speech = new SpeechSynthesisUtterance(textToSpeak.trim());
      speech.lang = lang === "ta" ? "ta-IN" : "en-US"; // Tamil or English voice
      speech.rate = 1.5;
      speech.pitch = 1;
      speech.volume = 1;
      // setUtterance(speech);
      speechSynthesis.speak(speech);
    }
  };

  return (
    <>
      <div className="container summarizer-container">
        <div className="row w-100 mb-4">
          <div className="col-lg-10 mx-auto">
            <div className="summarizer-card">
              <div className="summarizer-top">
                <div>
                  <div className="summarizer-title">SmartSummarizer</div>
                  <div className="summarizer-sub">
                    Upload a document to get a concise summary.
                  </div>
                </div>
                <div className="file-row">
                  <input
                    type="file"
                    id="document"
                    accept=".txt,.csv,.pdf,.docx,.pptx,.xlsx"
                    onChange={handleFileChange}
                  />
                  <button className="summarize-btn" onClick={handleSubmit}>
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Summarizing...
                      </>
                    ) : (
                      "Summarize Document"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Section */}
      <div className="row w-1200 mt-0">
        <div className="col-lg-10 mx-auto">
          {summary && (
            <div ref={summaryRef} className="summary-card">
              <div className="summary-heading">
                <span className="pin-icon">📌</span>
                Summary
              </div>

              <p className="summary-text">{summary}</p>

              {/* Language Selection */}
              {/* <div className="d-flex justify-content-center mt-3">
                <label className="me-2 fw-bold text-light">🗣️ Speak :</label>
                <select className="form-select w-auto" value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)}>
                  {/* <option value="auto">Auto Detect</option> */}
              {/* <option value="en">English content</option>
                  <option value="ta">Tamil content </option>
                </select>
              // </div> */}
              <div className="divider" />

              <div className="speech-mode">
                <div>Choose Speech Mode</div>
                <div className="d-flex gap-3 mt-3">
                  <button
                    className={`pill-btn ${
                      selectedLanguage === "en" ? "" : "inactive"
                    }`}
                    onClick={() => setSelectedLanguage("en")}
                  >
                    Speak English Content
                  </button>
                  <button
                    className={`pill-btn ${
                      selectedLanguage === "ta" ? "" : "inactive"
                    }`}
                    onClick={() => setSelectedLanguage("ta")}
                  >
                    Speak Tamil Content
                  </button>
                </div>

                <div className="control-row">
                  <button className="btn-start" onClick={speakText}>
                    Start
                  </button>
                  <button className="btn-stop" onClick={stopSpeech}>
                    Stop
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FileUpload;
