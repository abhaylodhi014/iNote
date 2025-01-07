import React from 'react'
import noteContext from '../context/notes/noteContext';
import { useContext } from 'react';
import { useState } from "react";
const AddNote = (props) => {
    const context = useContext( noteContext );
    const {addNote} = context ;
    const [note , setNote] = useState({title:"" , description:"" , tag:"General"})
    const handleclick = (e) =>{
      e.preventDefault();
      addNote(note.title , note.description , note.tag);
      setNote({title:"" , description:"" , tag:""})
      props.showAlert("Added note successfully" , "success");
    }  
    const onchange = (e)=>{
        e.preventDefault();
        // button per click karne se page reload na ho
        // aur ye ek function hai jiska ;syntax is imp ; e-event
      setNote({...note , [e.target.name]: e.target.value});
    }
  return (
    <div>
        <h2>Add notes</h2>
        <div className='my-2'>
        <div className="mb-3">
  <label htmlFor="title" className="form-label">Title</label>
  <input type="text" className="form-control" id="title" name='title' placeholder="type title"  value={note.title} onChange={onchange}/>
</div>
<div className="mb-3">
  <label htmlFor="description" className="form-label"  >description</label>
  <textarea className="form-control" id="description" name='description' rows="2" value={note.description} placeholder='type description' onChange={onchange}></textarea>
 </div>
 <div className="mb-3">
  <label htmlFor="tag" className="form-label">Tag</label>
  <input type="text" value={note.tag} className="form-control" id="tag" name='tag' placeholder="type tag" onChange={onchange}/>
</div>
  <div>
  <button type="submit" className="btn btn-primary mb-3" onClick={handleclick}  disabled={note.title.length<3 || note.description.length<3}>Add Note</button>
</div>
        </div>
    </div>
  )
}

export default AddNote
