import React from 'react'
import noteContext from '../context/notes/noteContext';
import { useContext } from 'react';
const Noteitem = (props ) => {
  const  {note , updateNote} = props;
  const context = useContext( noteContext );
  // yaha se noteContext ko add kara as a context
    const {deleteNote } = context ;
    // or yaha per context mai se deleteNote ko le liya
  const handledelete =()=>{
    console.log("delete the note");
    deleteNote(note._id);
    {props.showAlert("delete note successfully" , "success")}

  } 
  

  return (
    <div className='col-md-3' >
   <div className="card border-success mb-3 my-3 mx-1" style={{maxWidth :"18rem"}} >
    <div className="card-header bg-transparent border-success"> {note.tag}</div>
    <div className="card-body ">
      <h5 className="card-title text-success">{note.title}</h5>
      <p className="card-text">{note.description}</p>
      <i className="fa-solid fa-trash-can mx-2" onClick={handledelete}></i>
      <i className="fa-solid fa-pen-to-square mx-2 "  onClick={ ()=> {updateNote(note)} }></i>
    </div>
  
  </div>
   </div>
  )
}

export default Noteitem
