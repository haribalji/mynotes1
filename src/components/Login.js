import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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

    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Login to continue to Mynotebook</h2>
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
            <button type="submit" className="btn btn-primary w-100">
              Submit
            </button>
          </form>
          <div className="d-flex justify-content-center mt-4">
            <button
              type="button"
              onClick={handleonclik}
              className="btn btn-success"
            >
              New User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
