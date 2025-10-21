import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
// import axios from "axios";
import { useRef } from "react";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import React, { useState, useEffect } from "react";
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
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    // here i am passing the object to alert variable

    setAlert({
      msg: message,
      type: type,
    });

    // now making the alert to dissapear automatically
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  const booksRef = useRef(null);
  
    useEffect(() => {
      const handleScroll = () => {
        if (booksRef.current) {
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          booksRef.current.style.transform = `translateY(${scrollTop * 0.5}px)`;
        }
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

  return (
    <>
      <div className="app-container">
        <div className="content">
          {/* <Home
    /> */}
          {/* <div className="books-background" ref={booksRef}>
            <div className="book book1"></div>
            <div className="book book2"></div>
            <div className="book book3"></div>

            <div className="pencil pencil1"></div>
            <div className="pen pen1"></div>
            <div className="scissors scissors1"></div>
            <div className="pencil pencil2"></div>
          </div> */}
          <Alert />
          <NoteState>
            <StudentState>
              <Router>
                <Navbar />
                <Alert alert={alert} />
                <AppRoutes showAlert={showAlert} />
              </Router>
            </StudentState>
          </NoteState>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default App;

// small helper component to conditionally render the centered container for non-auth routes
function AppRoutes({ showAlert }) {
  const location = useLocation();
  const isAuthRoute =
    location.pathname === "/login" || location.pathname === "/signup";

  // set a body-level class per route to allow background gradient transitions
  useEffect(() => {
    const route =
      location.pathname === "/"
        ? "home"
        : location.pathname.replace(/[^a-z0-9]/gi, "-").replace(/^-|-$/g, "");
    // remove any previous bg- classes
    document.documentElement.classList.forEach((c) => {
      if (c.indexOf("bg-") === 0) document.documentElement.classList.remove(c);
    });
    // add the new class
    document.documentElement.classList.add(`bg-${route}`);
    return () => {};
  }, [location]);

  return (
    <div>
      {isAuthRoute ? (
        <Routes>
          <Route
            exact
            path="/login"
            element={<Login showAlert={showAlert} />}
          />
          <Route
            exact
            path="/signup"
            element={<Signup showAlert={showAlert} />}
          />
        </Routes>
      ) : (
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert} />} />
            <Route exact path="/FileUpload" element={<FileUpload />} />
            <Route exact path="/admin" element={<Admin />} />
            <Route
              exact
              path="/home"
              element={<Home showAlert={showAlert} />}
            />
            <Route exact path="/about" element={<About />} />
            <Route
              exact
              path="/login"
              element={<Login showAlert={showAlert} />}
            />
            <Route
              exact
              path="/signup"
              element={<Signup showAlert={showAlert} />}
            />
            <Route
              exact
              path="/student"
              element={<Student showAlert={showAlert} />}
            />
            <Route
              exact
              path="/subjectsByClass"
              element={<SubjectsByClass showAlert={showAlert} />}
            />
            <Route
              path="/chapters/:classNumber/:subject"
              element={<Chaptershow />}
            />
            <Route
              path="/notes/:classNumber/:subject/:chapter"
              element={<StudentNote />}
            />
            <Route exact path="/quizzes" element={<QuizApp />} />
          </Routes>
        </div>
      )}
    </div>
  );
}
