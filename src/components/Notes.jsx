import React, { useEffect , useRef } from 'react'
import { useContext , useState } from 'react';
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import {  useNavigate } from "react-router-dom";
const Notes = (props) => {
  

    const context = useContext( noteContext );
    const {notes , getallNote , editNote } = context ;
     const navigate = useNavigate();
    // useHistory react ke updated version mai nahi hai uski jagah usenavigate hai
  useEffect(() => {
    if(localStorage.getItem('token')){
       getallNote();
      //  agar token null nahi hai tu
    }
    else{
      // history.push("/login")
      navigate("/login")
    }
      
 },[] )
  // KHALI array diya kyuki ye sirf ek bar karna hai

   const [note , setNote] = useState({id:"" ,etitle:"" , edescription:"" , etag:""})

  const updateNote =(currentNote) =>{
      ref.current.click();
      setNote({id:currentNote._id, etitle:currentNote.title , edescription:currentNote.description , etag: currentNote.tag})
  
  }
  const ref = useRef(null);
  const refclose = useRef(null);

  const handleclick = (e) =>{
    refclose.current.click();
    console.log("updating the note");
    editNote(note.id , note.etitle , note.edescription , note.etag);
    e.preventDefault();
    props.showAlert("update note successfully" , "success");
  }

  const onchange = (e)=>{
    e.preventDefault();
    // button per click karne se page reload na ho
    // aur ye ek function hai jiska ;syntax is imp ; e-event
  setNote({...note , [e.target.name]: e.target.value});
}
const notesArray = Array.isArray(notes) ? notes : []; // Safely access the notes array

  return (
    <>
    <AddNote showAlert={props.showAlert}/>
<button type="button" className="btn btn-primary  d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
  Launch demo modal
</button>

<div className="modal fade" id="exampleModal"  tabIndex="-1" aria-labelledby="exampleModalLabel"   >
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit your note</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div className='my-2'>
        <div className="mb-3">
  <label htmlFor="title" className="form-label">Title</label>
  <input type="text" className="form-control" value={note.etitle} id="etitle" name='etitle' placeholder="etype title" onChange={onchange} minLength={3} required/>
</div>
<div className="mb-3">
  <label htmlFor="edescription" className="form-label"  >description</label>
  <textarea className="form-control" id="edescription" name='edescription' rows="2" value={note.edescription} placeholder='type description' onChange={onchange} minLength={3} required></textarea>
 </div>
 <div className="mb-3">
  <label htmlFor="etag" className="form-label">Tag</label>
  <input type="text" className="form-control" value={note.etag} id="etag" name='etag' placeholder="type tag"  onChange={onchange}/>
</div>
 
        </div>
      </div>
      <div className="modal-footer">
        <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick={handleclick} disabled={note.etitle.length<3 || note.edescription.length<3}>Update Note</button>
      </div>
    </div>
  </div>
</div>
    <div className='row my-3'>
        
      <h1>Your Notes</h1>
      <div className='container '>
        <h4> {notesArray.length === 0 && "Create a new Note ...."}</h4>
      </div>
       {notesArray.map ( (note => (
         <Noteitem key={note._id} showAlert={props.showAlert} updateNote={updateNote} note={note}/>
       )))}
    </div>
    </>
  )
}

export default Notes
