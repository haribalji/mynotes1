import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Signup.css";
import "../styles/Login.css";

const Signup = (props) => {
  const navigate = useNavigate();

  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const handlesubmit = async (e) => {
    e.preventDefault();
    // send create user request
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authutoken);
      navigate("/home");
      props.showAlert("Account Created Successfully", "success");
    } else {
      props.showAlert("Invalid credentials", "danger");
    }
  };

  const onchange = (e) => {
    setcredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="login-wrapper">
      <div className="login-bg-blob blob-a" aria-hidden="true"></div>
      <svg
        className="floating-icon icon-a"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          fill="rgba(255,255,255,0.95)"
          d="M3 5a2 2 0 0 1 2-2h12v14H5a2 2 0 0 1-2-2V5z"
        ></path>
        <path
          fill="rgba(74,44,230,0.95)"
          d="M7 3h10v12H7z"
          opacity="0.14"
        ></path>
      </svg>
      <div className="login-bg-blob blob-b" aria-hidden="true"></div>
      <svg
        className="floating-icon icon-b"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          fill="rgba(255,255,255,0.98)"
          d="M9 21h6v-1a3 3 0 0 0-6 0v1zM12 2a7 7 0 0 0-4 12v1a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-1a7 7 0 0 0-4-12z"
        />
      </svg>
      {/* more icons to reach 10 total */}
      <svg
        className="floating-icon icon-c"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          fill="rgba(255,255,255,0.95)"
          d="M3 5a2 2 0 0 1 2-2h12v14H5a2 2 0 0 1-2-2V5z"
        ></path>
      </svg>
      <svg
        className="floating-icon icon-d"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          fill="rgba(255,255,255,0.95)"
          d="M12 2a7 7 0 0 0-4 12v1a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-1a7 7 0 0 0-4-12z"
        />
      </svg>
      <svg
        className="floating-icon icon-e"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          fill="rgba(255,255,255,0.95)"
          d="M4 4h14v12H4z"
          opacity="0.9"
        ></path>
      </svg>
      <svg
        className="floating-icon icon-f"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          fill="rgba(255,255,255,0.95)"
          d="M3 5a2 2 0 0 1 2-2h12v14H5a2 2 0 0 1-2-2V5z"
        ></path>
      </svg>
      <svg
        className="floating-icon icon-g"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          fill="rgba(255,255,255,0.95)"
          d="M12 2a7 7 0 0 0-4 12v1a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-1a7 7 0 0 0-4-12z"
        />
      </svg>
      <svg
        className="floating-icon icon-h"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          fill="rgba(255,255,255,0.95)"
          d="M4 4h14v12H4z"
          opacity="0.9"
        ></path>
      </svg>
      <svg
        className="floating-icon icon-i"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          fill="rgba(255,255,255,0.95)"
          d="M3 5a2 2 0 0 1 2-2h12v14H5a2 2 0 0 1-2-2V5z"
        ></path>
      </svg>
      <svg
        className="floating-icon icon-j"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          fill="rgba(255,255,255,0.95)"
          d="M12 2a7 7 0 0 0-4 12v1a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-1a7 7 0 0 0-4-12z"
        />
      </svg>
      <div className="signup-card login-card">
        <h2 className="signup-title">Create Account</h2>
        <div className="signup-sub">
          Sign up to access your notes and summaries
        </div>

        <form onSubmit={handlesubmit}>
          <div className="mb-3 mt-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              id="name"
              onChange={onchange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              id="email"
              aria-describedby="emailHelp"
              onChange={onchange}
              required
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              id="password"
              onChange={onchange}
              minLength={6}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              name="cpassword"
              id="cpassword"
              onChange={onchange}
              minLength={6}
              required
            />
          </div>

          <button type="submit" className="login-submit w-100">
            Create Account
          </button>
        </form>

        <a className="login-link" href="/login">
          Already have an account? Log in
        </a>
      </div>
    </div>
  );
};

export default Signup;
