import React, { useEffect, useState } from "react";
import "../appp.css";
import usesound from "use-sound";
import play from "../components/assets/play.mp3";
import correct from "../components/assets/correct.mp3";
import wrong from "../components/assets/wrong.mp3";
import wait from "../components/assets/wait.mp3";

export default function Trivia({
  data,
  setstop,
  questionnumber,
  setquestionnumber,
  earned,
  
}) {
  const [question, setquestion] = useState(null);
  const [selectanswer, setselectanswer] = useState(null);
  const [classname, setclassname] = useState("answer");
  const [letsplay] = usesound(play);
  const [correctAnswer] = usesound(correct);
  const [wrongAnswer] = usesound(wrong);
  const [waitAnswer] = usesound(wait);

  useEffect(() => {
    setquestion(data[questionnumber - 1]);
  }, [data, questionnumber]);

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  const handleclick = (a) => {
    setselectanswer(a);
    setclassname("answer active");

    delay(3000, () => setclassname(a.correct ? "answer correct" : "answer wrong"));

    delay(5000, () => {
      if (a.correct) {
        correctAnswer();
        delay(1000, () => {
          setquestionnumber((prev) => prev + 1);
          setselectanswer(null);
        });
      } else {
        wrongAnswer();
        delay(2000, () => {
          setstop(true);
          // Display earned amount and restart the game
          // delay(2000, handleRestart);
        });
      }
    });
  };

  return (
    <div className="trivia">
      <div className="questions">{question?.question}</div>
      <div className="answers">
        {question?.answers?.map((a) => (
          <div
            className={selectanswer === a ? classname : "answer"}
            onClick={() => {
              handleclick(a);
            }}
            key={a.text}
          >
            {a.text}
          </div>
        ))}
      </div>
    </div>
  );
}

