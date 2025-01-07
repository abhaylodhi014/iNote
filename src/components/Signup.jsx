import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// import  useHistory from 'react-router-dom'
const Signup = (props) => {

    const [ credentials , setCredential] = useState({name:"" ,email:""  , password:""});
    
     const handlesubmit = async (e) =>{
      e.preventDefault();
    // //   ye submit per click karne per page ko reload nahi karene dega
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          
        },
        body: JSON.stringify({name:credentials.name ,email:credentials.email,password : credentials.password}),
      });
      
    // sedhe json ko nahi likha kyuki wo await function hai

     const navigate = useNavigate();
    const json = await response.json();
     console.log("helo sign in")
      console.log(json);
     if(json.success !== false){
        // save the auth token and redirect 
        props.showAlert("sucessfully!! created account" , "success");
        localStorage.setItem('token' , json.authtoken);
        navigate('/'); 
     }
     else{
        // alert("User alreadey exists");
        props.showAlert("Invalid credentials" , "danger");
     }
     }
     const onchange = (e)=>{
        e.preventDefault();
        // button per click karne se page reload na ho
        // aur ye ek function hai jiska ;syntax is imp ; e-event
      setCredential({...credentials , [e.target.name]: e.target.value});
    }  
  return (
    <div className='container mt-2'>
      <h2>Create an account to use iNotes</h2>
<form onSubmit={handlesubmit}>
<div className="mb-3">
    <label htmlFor="username1" className="form-label">User name</label>
    <input type="text" className="form-control" onChange={onchange} value={credentials.name}  id="name" name='name'/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" value={credentials.email} onChange={onchange} required id="email" name='email' aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name='password' minLength={5} value={credentials.password} onChange={onchange} required/>
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1" required/>
    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form> 
   </div>
  )
}

export default Signup
