import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import axios from "axios";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import React,{useState} from 'react'
import Student from "./components/Studentdata";
import StudentState from "./context/students/StudentState";
import SubjectsByClass from "./components/SubjectsByClass";
import Chaptershow from "./components/Chaptershow";
import StudentNote from "./components/StudentNote";
import Footer from "./components/Footer";
import FileUpload from "./components/FileUpload";
import Admin from "./components/Admin";
import QuizApp from "./components/Quizapp";


function App() {
  const[alert,setAlert]=useState(null);

  const showAlert=(message,type)=>{
    // here i am passing the object to alert variable
    
    setAlert({
      msg:message,
      type:type
    })
  
    // now making the alert to dissapear automatically
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  
  return (
    <>
        <div className="app-container">
        <div className="content">
      {/* <Home
    /> */}
<Alert/>
<NoteState>
  <StudentState> {/* Move StudentState outside of Routes */}
    <Router>
      <Navbar />
      <Alert alert={alert} />
      <div className="container">
        <Routes>
          <Route exact path="/" element={<Home showAlert={showAlert} />} />
          <Route exact path="/FileUpload" element={ <FileUpload />} />
          <Route exact path="/admin" element={<Admin/>} />

          <Route exact path="/home" element={<Home showAlert={showAlert} />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/login" element={<Login showAlert={showAlert} />} />
          <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
          <Route exact path="/student" element={<Student showAlert={showAlert}/>} /> {/* Student route inside Routes */}
          <Route exact path="/subjectsByClass" element={<SubjectsByClass  showAlert={showAlert}/>} /> {/* Student route inside Routes */}
          <Route path="/chapters/:classNumber/:subject" element={<Chaptershow />} />
          <Route path="/notes/:classNumber/:subject/:chapter" element={ <StudentNote/>} />
          <Route exact path="/quizzes" element={<QuizApp />} /> New route for quizzes 
        </Routes>
      </div>


    </Router>
  </StudentState> {/* Closing StudentState */}
</NoteState>

</div>

<Footer />


</div>
 
    </>
  );
}

export default App;
