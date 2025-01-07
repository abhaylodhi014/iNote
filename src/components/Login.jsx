import React, { useState , useEffect } from 'react'
import { useNavigate } from "react-router-dom";
 import AddNote from './AddNote';
 import noteContext from '../context/notes/noteContext';
 import NoteState from '../context/notes/NoteState';
import { useContext } from 'react';
const Login = (props) => {
 const [ credentials , setCredential] = useState({email:""  , password:""});
 let navigate = useNavigate();
 const context = useContext( noteContext );
 const { getallNote } = context ;

   // Fetch notes when logged in successfully
   useEffect(() => {
    if (localStorage.getItem('token')) {
        getallNote(); // Get notes after login if token is present
    }
}, [getallNote]); // Depend on getallNote, but it should not be re-triggered unnecessarily

 const handlesubmit = async (e) =>{
  e.preventDefault();
//   ye submit per click karne per page ko reload nahi karene dega
const response = await fetch(`http://localhost:5000/api/auth/loginuser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      
    },
    body: JSON.stringify({email:credentials.email,password : credentials.password}),
  });
  
// sedhe json ko nahi likha kyuki wo await function hai
const json = await response.json();

  console.log(json);
 if(json.success !== false){
    // save the auth token and redirect 
    localStorage.setItem('token' , json.authtoken);
    props.showAlert("Successfully!! logged in" , "success");
    
    // getallNote();// Fetch notes after login
    navigate("/");
 }
 else{
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
    <div className='mt-3'>
    <h2>Login to continue to iNotes</h2>
    <form  onSubmit={handlesubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" aria-describedby="emailHelp"name='email' onChange={onchange} value={credentials.email}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" name='password' id="password1" onChange={onchange} value={credentials.password}/>
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="check" required/>
    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
  {/* JO onsubmit hai wo form per lagta hai */}
</form>
   
    </div>
  )
}

export default Login
