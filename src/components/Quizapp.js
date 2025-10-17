import React, { useEffect, useMemo, useState } from "react";
import ReactDom from "react-dom";
import "../appp.css";
import Trivia from "../components/Trivia";
import Timer from "../components/Timer";
import axios from "axios"; // Axios for making HTTP requests
// import React, {  useRef,useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";


function App() {
  const [questionnumber, setquestionnumber] = useState(1);
  const [stop, setstop] = useState(false);
  const [earned, setearned] = useState("0");
  const [data, setData] = useState([]); // State for storing quiz data
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  // Fetch data from the backend server
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/quizzes");
        setData(response.data); // Store quiz data in state
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    fetchQuizData();
  }, []);

  const moneypyramid = useMemo(
    () =>
      [
        { id: 1, amount: "100" },
        { id: 2, amount: "200" },
        { id: 3, amount: "400" },
        { id: 4, amount: "800" },
        { id: 5, amount: "1600" },
        { id: 6, amount: "2000" },
        { id: 7, amount: "2200" },
        { id: 8, amount: "2400" },
        { id: 9, amount: "2600" },
        { id: 10, amount: "3000" },
      ].reverse(),
    []
  );

  useEffect(() => {
    if (questionnumber > 1) {
      setearned(moneypyramid.find((m) => m.id === questionnumber - 1).amount);
    }
  }, [questionnumber, moneypyramid]);

  const handleRestart = () => {
    setquestionnumber(1);
    setstop(false);
    setearned("0");
  };

  return (
    <div className="app">
      <div className="main">
        {stop ? (
          <div className="end-screen">
            <h1 className="endtext">You earned: {earned}</h1>
            <button className="restart-button" onClick={handleRestart}>
              Restart
            </button>
          </div>
        ) : (
          <>
            <div className="top">
              <h1 className="heading">CHOOSE THE BEST</h1>
              <div className="timer">
                <Timer setstop={setstop} questionnumber={questionnumber} />
              </div>
            </div>
            <div className="bottom">
              <Trivia
                data={data}
                setstop={setstop}
                questionnumber={questionnumber}
                setquestionnumber={setquestionnumber}
                earned={earned}
              />
            </div>
          </>
        )}
      </div>
      <div className="money">
        <ul className="moneylist">
          {moneypyramid.map((m) => (
            <li
              className={
                questionnumber === m.id
                  ? "moneylistitem active"
                  : "moneylistitem"
              }
              key={m.id}
            >
              <span className="moneylistnumber">{m.id}</span>
              <span className="moneylistamount">{m.amount}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;





