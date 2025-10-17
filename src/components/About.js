// import React from 'react'

// const About = () => {
//   return (
//     <div>
// this id nabout
//     </div>
//   )
// }

// export default About
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const About = () => {
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <h2 className="mb-4">About Us</h2>
          <p className="lead">
            Welcome to our platform! Our application allows you to effortlessly take notes and securely store them wherever you need.
          </p>
          <p>
            Whether you're brainstorming ideas, organizing tasks, or saving important information, we've got you covered. 
            Start organizing your thoughts today and boost your productivity!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
