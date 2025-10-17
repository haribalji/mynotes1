
import React, { useRef, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

const FileUpload = () => {
  const summaryRef = useRef(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [speechSynthesis, setSpeechSynthesis] = useState(window.speechSynthesis);
  const [utterance, setUtterance] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('auto'); // Default: Auto-detect
  const [isPaused, setIsPaused] = useState(false);
const [ispeak,setispeak]=useState("speak")
  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('document', file);
    setLoading(true);
   
    try {
      const response = await fetch('http://localhost:5000/api/summarizes', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      // console.log(data);
      setSummary(data.summary || 'Summarization failed.');
    } catch (error) {
      console.error('Error:', error);
      setSummary('An error occurred during summarization.');
    }
    setLoading(false);
  };

  const detectLanguage = (text) => {
    const tamilRegex = /[\u0B80-\u0BFF]/;
    return tamilRegex.test(text) ? 'ta' : 'en';
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
      if (selectedLanguage === 'auto') {
        lang = detectLanguage(summary);
      } else {
        lang = selectedLanguage;
      }
  
      let textToSpeak = summary;
  
      // If Tamil is selected, remove English words to prevent awkward pronunciation
      if (lang === 'ta') {
        textToSpeak = summary.replace(/[A-Za-z0-9.,!?;:"'(){}[\]]+/g, ''); // Remove English words and special characters
      }
      else if (lang === 'en') {
        // English mode: Remove unwanted symbols
        textToSpeak = textToSpeak.replace(/[\*\-,—]/g, ''); 
      }
  
      const speech = new SpeechSynthesisUtterance(textToSpeak.trim());
      speech.lang = lang === 'ta' ? 'ta-IN' : 'en-US'; // Tamil or English voice
      speech.rate = 1.5;
      speech.pitch = 1;
      speech.volume = 1;
      // setUtterance(speech);
      speechSynthesis.speak(speech);
    }
  };
  
  return (
    <>
      <div className="container vh-10 d-flex flex-column justify-content-center align-items-center mt-5">
        {/* File Upload Section */}
        <div className="row w-100 mb-5">
          <div className="col-lg-6 mx-auto">
            <div className="card p-4 rounded-4 shadow-lg text-white w-100"
              style={{
                background: "rgba(255, 255, 255, 0.15)",
                border: "1px solid rgba(255, 255, 255, 0.3)"
              }}>
              <div className="p-3 rounded text-center mx-auto"
                style={{ background: "rgba(0, 0, 0, 0.6)", display: "inline-block", maxWidth: "90%", padding: "1.2rem" }}>
                <h2 className="fw-bold text-uppercase text-light" style={{ fontSize: "clamp(1.2rem, 2vw, 2rem)", marginBottom: "0.5rem" }}>📄 Upload Document</h2>
                <span className="text-lowercase text-warning" style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.2rem)", fontWeight: "bold" }}>
                  Provide a TXT, CSV, or PDF file
                </span>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="document" className="form-label fw-bold fs-5">Select File</label>
                  <input type="file" className="form-control bg-dark text-white border-light" id="document"
                    accept=".txt,.csv,.pdf,.docx,.pptx,.xlsx"
                    onChange={handleFileChange}
                  />
                </div>

                {file && (
                  <div className="alert alert-light py-2 text-dark rounded-3">
                    📂 <strong>Selected:</strong> {file.name}
                  </div>
                )}

                <button type="submit" className="btn btn-light w-100 fw-bold fs-5">
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span> Summarizing...
                    </>
                  ) : (
                    "Summarize Document"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Section */}
      <div className="row w-1200 mt-0">
        <div className="col-lg-10 mx-auto">
          {summary && (
            <div ref={summaryRef} className="card p-5 rounded-4 shadow-lg text-white w-100"
              style={{
                background: "rgba(30, 30, 30, 0.85)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                minHeight: "350px",
                marginBottom: "80px",
              }}>
              <h3 className="text-warning fw-bold text-center">📌 Summary</h3>

              <p className="p-4 rounded"
                style={{
                  maxHeight: "400px",
                  overflowY: "auto",
                  fontSize: "clamp(14px, 1.2vw, 1.3rem)",
                  lineHeight: "1.9",
                  fontFamily: "Georgia, serif",
                  whiteSpace: "pre-line",
                  wordWrap: "break-word",
                  textAlign: "justify",
                  color: "#f8f9fa",
                  padding: "20px",
                  letterSpacing: "0.5px",
                  wordSpacing: "1px",
                  borderRadius: "10px",
                }}>
                {summary}
              </p>

              {/* Language Selection */}
              {/* <div className="d-flex justify-content-center mt-3">
                <label className="me-2 fw-bold text-light">🗣️ Speak :</label>
                <select className="form-select w-auto" value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)}>
                  {/* <option value="auto">Auto Detect</option> */}
                  {/* <option value="en">English content</option>
                  <option value="ta">Tamil content </option>
                </select>
              // </div> */} 
              <div className="d-flex flex-column align-items-center mt-4">
  <h5 className="fw-bold text-light"> Choose Speech Mode</h5>

  <div className="d-flex gap-3 mt-3">
    {/* Speak English Content */}
    <button 
      className={`btn ${selectedLanguage === 'en' ? 'btn-light' : 'btn-outline-light'} fw-bold px-4 py-2`}
      onClick={() => setSelectedLanguage('en')}
    >
      🎙️ Speak English Content
    </button>

    {/* Speak Tamil Content */}
    <button 
      className={`btn ${selectedLanguage === 'ta' ? 'btn-warning' : 'btn-outline-warning'} fw-bold px-4 py-2`}
      onClick={() => setSelectedLanguage('ta')}
    >
      🎙️ Speak Tamil Content
    </button>
  </div>
</div>


              {/* Speak & Stop Buttons */}
              <div className="d-flex justify-content-center mt-3">
              {/* <button onClick={pauseSpeech} disabled={!speechSynthesis.speaking || speechSynthesis.paused}>⏸️ Pause</button> */}
              {/* <button onClick={resumeSpeech} disabled={!isPaused}>▶️ Resume</button> */}
                <button className="btn btn-success me-3" onClick={speakText}>🔊 {ispeak}</button>
                <button className="btn btn-danger" onClick={stopSpeech}>⏹ Stop</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FileUpload;
