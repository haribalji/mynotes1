import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/About.css";

const About = () => {
  return (
    <div className="about-hero my-5 position-relative">
      <div className="about-decor" aria-hidden="true">
        <div className="pencil pencil1" />
        <div className="pencil pencil2" />
        <div className="pen pen1" />
        <div className="scissors scissors1" />

        <div className="math" />
        <div className="math1" />
        <div className="biology" />
        <div className="biology1" />
        <div className="computer" />
        <div className="science" />
      </div>

      <div className="container">
        <div className="about-card mx-auto" style={{ maxWidth: 820 }}>
          <h2 className="about-title mb-3 text-center">About Us</h2>
          <p className="about-lead text-center mb-3">
            Welcome to our platform! Our application allows you to effortlessly
            take notes and securely store them wherever you need.
          </p>
          <p className="about-body text-center">
            Whether you're brainstorming ideas, organizing tasks, or saving
            important information, we've got you covered. Start organizing your
            thoughts today and boost your productivity!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
