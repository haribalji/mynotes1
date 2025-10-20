import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import "../styles/Layout.css";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  const getInitialAdmin = () => {
    if (!token) return false;
    try {
      return Boolean(jwtDecode(token).isAdmin);
    } catch {
      return false;
    }
  };

  const [isAdmin, setIsAdmin] = useState(getInitialAdmin());
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setIsAdmin(getInitialAdmin());
  }, [token, location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAdmin(false);
    setMobileOpen(false);
    navigate("/login");
  };

  const toggleMobile = () => setMobileOpen((s) => !s);

  const handleNavCollapse = () => {
    setMobileOpen(false);
  };

  const isAuthRoute =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <header className={`site-header ${isAuthRoute ? "auth" : ""}`}>
      <div className="site-nav">
        <div className="brand">
          <Link to="/" className="brand-link">
            MyNotebook
          </Link>
        </div>

        <button
          className={`mobile-toggle ${mobileOpen ? "open" : ""}`}
          onClick={toggleMobile}
          aria-label="Toggle navigation"
        >
          <span className="hamburger" />
        </button>

        <nav className={`main-nav ${mobileOpen ? "open" : ""}`}>
          <Link
            className={`nav-link ${
              location.pathname === "/home" ? "active" : ""
            }`}
            to="/home"
            onClick={handleNavCollapse}
          >
            Home
          </Link>

          <Link
            className={`nav-link ${
              location.pathname === "/student" ? "active" : ""
            }`}
            to="/student"
            onClick={handleNavCollapse}
          >
            Student
          </Link>

          <Link
            className={`nav-link ${
              location.pathname === "/FileUpload" ? "active" : ""
            }`}
            to="/FileUpload"
            onClick={handleNavCollapse}
          >
            SmartSummarizer
          </Link>
          <Link
            className={`nav-link ${
              location.pathname === "/quizzes" ? "active" : ""
            }`}
            to="/quizzes"
            onClick={handleNavCollapse}
          >
            Quizzes
          </Link>

          <Link
            className={`nav-link ${
              location.pathname === "/about" ? "active" : ""
            }`}
            to="/about"
            onClick={handleNavCollapse}
          >
            About
          </Link>

          {isAdmin && (
            <Link
              className={`nav-link ${
                location.pathname === "/admin" ? "active" : ""
              }`}
              to="/admin"
              onClick={handleNavCollapse}
            >
              Admin
            </Link>
          )}
        </nav>

        <div className="nav-actions">
          {token ? (
            <button
              onClick={() => {
                handleLogout();
                handleNavCollapse();
              }}
              className="btn-logout"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                className="btn-outline"
                to="/login"
                onClick={handleNavCollapse}
              >
                Login
              </Link>
              <Link
                className="btn-logout"
                to="/signup"
                onClick={handleNavCollapse}
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
