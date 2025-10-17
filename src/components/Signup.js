import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const navigate = useNavigate();

    const [credentials, setcredentials] = useState({name:"" ,email:"",password:"" , cpassword:""});
    const handlesubmit=async(e)=>{
      e.preventDefault();
      console.log(e.target.email.value)//there the "email" it is the name of the  field
    //   fetch("http://localhost:5000/api/auth/login")
      const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password}),
      });
      const json =await response.json();
   console.log(json);
   if(json.success){
// when the login is suceess then store the token in local storage
// localStorage.setItem("token",json.authutoken);
localStorage.setItem("token",json.authutoken);
console.log(localStorage.getItem("token"))
navigate("/home");
    props.showAlert(" Account Created Successfully  ","success")
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NTdkNGNhMjk5MmMxMjQ3YmE2NGI3YSIsImlhdCI6MTczMzgwOTM1NH0.ik4E5WkAaXukHj-72sJejYTdkabJ7ibOBDui2TGo0nA
   }
   else{
    props.showAlert("Invalid credentials","danger")
   }
    }
    
    const onchange=(e)=>{
        setcredentials({
    ...credentials ,[e.target.name]:e.target.value
})

    }
  return (
    <div className='container mt-5'>
      <h2> Mynotebook:  Join With your Personal Partner</h2>

      <form onSubmit={handlesubmit}>
      <div className="mb-3 mt-3">
    <label htmlFor="name" className="form-label">Name : 5 min character</label>
    <input type="text" className="form-control" name="name" id="name"   onChange={onchange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control"   name="email"  id="email" aria-describedby="emailHelp" onChange={onchange} required/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control"  name="password" id="password" onChange={onchange} minLength={6} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control"  name="cpassword" id="cpassword" onChange={onchange}minLength={6} required/>
  </div>
 
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Signup
