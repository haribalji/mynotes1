// import React, { useState, useEffect } from "react";

// const Footer = () => {
//   // State to determine whether to show the "Scroll to Top" button
//   const [showScroll, setShowScroll] = useState(false);

//   // Check scroll position to determine if the button should be visible
//   const checkScrollTop = () => {
//     if (!showScroll && window.pageYOffset > 400) {
//       setShowScroll(true);
//     } else if (showScroll && window.pageYOffset <= 400) {
//       setShowScroll(false);
//     }
//   };

//   // Scroll smoothly to the top of the page
//   const scrollTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   useEffect(() => {
//     // Attach scroll event listener when component mounts
//     window.addEventListener("scroll", checkScrollTop);
//     // Clean up the listener on unmount
//     return () => window.removeEventListener("scroll", checkScrollTop);
//   }, [showScroll]);

//   return (
//     <footer className="bg-dark text-light py-4 mt-auto">
//       <div className="container text-center">
//         <p className="mb-0">
//           &copy; {new Date().getFullYear()} Mynotebook. All rights reserved.
//         </p>
//       </div>
//       {/* Floating "Scroll to Top" button */}
//       <button
//         onClick={scrollTop}
//         className="btn btn-primary"
//         style={{
//           position: "fixed",
//           bottom: "20px",
//           right: "20px",
//           display: showScroll ? "block" : "none",
//           borderRadius: "50%",
//           padding: "10px 15px",
//           zIndex: 1000,
//         }}
//         aria-label="Scroll to top"
//       >
//         &#8679;
//       </button>
//     </footer>
//   );
// };

// export default Footer;


import React, { useState, useEffect } from "react";

const Footer = () => {
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    setShowScroll(window.pageYOffset > 400);
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);
    return () => window.removeEventListener("scroll", checkScrollTop);
  }, []);

  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <div className="container text-center">
        <p className="mb-0">
          &copy; {new Date().getFullYear()} Mynotebook. All rights reserved.
        </p>
      </div>
      {/* Scroll to Top Button */}
      <button
        onClick={scrollTop}
        className="btn btn-primary"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          display: showScroll ? "block" : "none",
          borderRadius: "50%",
          padding: "10px 15px",
          zIndex: 1000,
        }}
        aria-label="Scroll to top"
      >
        &#8679;
      </button>
    </footer>
  );
};

export default Footer;
