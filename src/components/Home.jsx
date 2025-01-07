import React from 'react'
import Notes from './Notes';
const Home = (props) => {
  return (
    <div className='my-1 container'>
        <h1>iNote- Your personal notes</h1>
      
     <Notes showAlert={props.showAlert}/>   
    </div>
  )
}

export default Home;
