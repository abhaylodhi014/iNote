import React, { useEffect } from 'react'
import  { useContext } from 'react'
import noteContext from '../context/notes/noteContext'


const About = () => {
    // ye about kahi bhi ho hum usecontext ko import kara sakte hai
    // const a = useContext(noteContext);
    //  useEffect(() => {
    //  a.update();
    //  }, [])
     
  return (
    <div>
      this is  about
       {/* {a.state.title} and he is in class {a.state.tag} */}
    </div>
  ) 
}

export default About
