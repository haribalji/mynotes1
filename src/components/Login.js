import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = (props) => {
  const navigate = useNavigate();
  const handleonclik = () => {
    navigate("/signup");
  };
  const [credentials, setcredentials] = useState({ email: "", password: "" });
  const handlesubmit = async (e) => {
    e.preventDefault();
    console.log(e.target.email.value); //there the "email" it is the name of the  field
    //   fetch("http://localhost:5000/api/auth/login")
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // when the login is suceess then store the token in local storage
      localStorage.setItem("token", json.authutoken);
      // console.log(localStorage.getItem("token"));
      navigate("/home");
      props.showAlert(" Logged in Successfully  ", "success");
    } else {
      props.showAlert("Invalid Details", "danger");
    }
  };

  const onchange = (e) => {
    setcredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };
  return (
    //     <div className='mt-5'>
    //       <h2>Login to continue to Mynotebook</h2>
    // <form onSubmit={handlesubmit}>
    //   <div className="mb-3">
    //     <label htmlFor="email" className="form-label">Email address</label>
    //     <input type="email" className="form-control" id="email"  onChange={onchange}name="email" value={credentials.email}  aria-describedby="emailHelp" required/>
    //     <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
    //   </div>
    //   <div className="mb-3">
    //     <label htmlFor="password" className="form-label">Password</label>
    //     <input type="password" className="form-control" name="password" value={credentials.password}  id="password"  onChange={onchange} required/>
    //   </div>

    //   <button type="submit" className="btn btn-primary" >Submit</button>
    // </form>
    // <div class=" container d-flex flex-row bd-highlight mb-3 mt-3">

    //   <button type="text" onClick={handleonclik} className="btn btn-primary p-2 bd-highlight mx-3" >   New User
    //   </button>

    // </div>
    // </div>

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
          opacity="0.95"
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
      {/* extra decorative icons */}
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
      {/* more icons to reach 10 total */}
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
      <div className="login-card">
        <h2>Welcome to MyNotebook</h2>
        <p>Enter your details to log in</p>
        <form onSubmit={handlesubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              onChange={onchange}
              name="email"
              value={credentials.email}
              aria-describedby="emailHelp"
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
              value={credentials.password}
              id="password"
              onChange={onchange}
              required
            />
          </div>
          <button type="submit" className="login-submit w-100">
            Submit
          </button>
        </form>
        <div className="d-flex justify-content-center">
          <button
            type="button"
            onClick={handleonclik}
            className="new-user w-100"
          >
            New User
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
