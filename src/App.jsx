import { useState } from 'react'
import './App.css'
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/login';
import Signup from './components/signup';
function App() {
  const [alert , setAlert] = useState(null);

  const showAlert = (message , type) => {
     setAlert( {
       msg : message,
       types : type
     })
   //mai chata hu ki 2 sec baad ye alert null ho jaye
   setTimeout(()=> {setAlert(null) } , 1500);
  }

  return (
    <>
    <NoteState>
    <Router>
     <Navbar/> 
    
     <Alert  alert={alert}  />     
     
     <div className="container">
      <Routes>
          <Route   path="/about" element={<About/>}></Route>
          
          <Route  path="/"   element={< Home showAlert={showAlert}/> }></Route>
          {/* yaha per hum showalert k0 as a props bhej rahe hai hum chahe tu ise contex ki madad se bhej sakte hai */}
          <Route  path="/login"   element={<Login showAlert={showAlert}/>}></Route>
          <Route  path="/signup"   element={<Signup showAlert={showAlert}/> }></Route>
     </Routes>
     </div>
    </Router>
    </NoteState>
  
      
    </>
  )
}

export default App
