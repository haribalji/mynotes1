
import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
// import jwtDecode from "jwt-decode"; // Install with: npm install jwt-decode
import { jwtDecode } from "jwt-decode"; // Use named import

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const initialIsAdmin = token ? jwtDecode(token).isAdmin : false;//for ensure the admin as earlier as possible

  const [isAdmin, setIsAdmin] = useState(initialIsAdmin);

  useEffect(() => {
    // Check if user is admin
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setIsAdmin(decoded.isAdmin); // Extract isAdmin from token and // Ensure admin status is updated if needed

      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, [token]);

  const handleLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem("token");

    navigate("/login");
  };

  const handleNavCollapse = () => {
    const navbar = document.getElementById("navbarSupportedContent");
    if (navbar.classList.contains("show")) {
      navbar.classList.remove("show");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Mynotebook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/home" ? "active" : ""}`} to="/home" onClick={handleNavCollapse}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about" onClick={handleNavCollapse}>
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/student" ? "active" : ""}`} to="/student" onClick={handleNavCollapse}>
                Student
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/FileUpload" ? "active" : ""}`} to="/FileUpload" onClick={handleNavCollapse}>
                SmartSummarizer
              </Link>



            </li>

            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/quizzes" ? "active" : ""}`} to="/quizzes" onClick={handleNavCollapse}>
                Quizzes
              </Link>
              </li>



            {/* Show Admin Button if the user is admin */}
            {isAdmin && (
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/admin" ? "active" : ""}`} to="/admin" onClick={handleNavCollapse}>
                  Admin Panel
                </Link>
              </li>
            )}
          </ul>

          {localStorage.getItem("token") ? (
            <button onClick={() => { handleLogout(); handleNavCollapse(); }} className="btn btn-primary">
              Logout
            </button>
          ) : (
            <form className="d-flex" role="search">
              <Link className="btn btn-primary mx-1" to="/login" role="button" onClick={handleNavCollapse}>
                Login
              </Link>
              <Link className="btn btn-primary mx-1" to="/signup" role="button" onClick={handleNavCollapse}>
                Signup
              </Link>
            </form>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;









// // handleLogout this is the purpose for logout