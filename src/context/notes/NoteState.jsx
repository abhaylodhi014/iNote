import React from "react";
import noteContext from "./noteContext";
import { useState } from "react";
const NoteState  = (props ) => {
// ye tu bas samjhne ke liye tha how context  work
//   const s1 = {
//     "name":"Harry",
//     "class":"5b",
//   }
//  const [state , setState] = useState(s1);
//  const update =  () =>{
//     setTimeout(()=> {
//       setState({
//         "name":"abhay",
//         "class":"cse"
//       })
//     }, 1000)
//  }

const host = "http://localhost:5000";



const notesintial ={ notes:[]
  // Ensure it's an array
}


const [notes , setNotes] = useState(notesintial)
// get all notes by api call;
const getallNote = async ( ) =>{

  const token = localStorage.getItem('token'); // Retrieve token from localStorage
  if (!token) {
    console.error('No token found. Please log in.');
    return;
  }

  try {
    const response = await fetch(`${host}/api/notes/fetchnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token, // Add token in the header
      },
    });

    // Check if the response is OK (status 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse JSON data
    const json = await response.json();

    // Safely update state with notes or an empty array
    setNotes(json.notes || []);

  } catch (error) {
    console.error("Error fetching notes:", error.message);
  }
};


// add note
const addNote = async (   title , description , tag) =>{
  const response = await fetch(`${host}/api/notes/addnotes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token" : localStorage.getItem('token')
    },
    body: JSON.stringify({title , description , tag }),
  });
  
   const note = await response.json();
setNotes(notes.concat(note)); 

// this function has no need 
//   console.log("adding a new note");
// const note =  {
//   "_id": "676457968c05b6881590c0d9",
// "user": "676422ed915d5c729cb0e403",
// "title": title,
// "description": description,
// "tag": tag,
// "date": "2024-12-19T17:27:50.708Z",
// "__v": 0

// }
// setNotes(notes.push(note));
  //ye ek new array return karega
}

// delete note
const deleteNote = async (id) =>{
  // api call  
  const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "auth-token" : localStorage.getItem('token')
    },
    // body: JSON.stringify({title , description , tag }), 
   });
  
  //  const json =  response.json();



 console.log("deletetint the note with id " + id);
 const newNotes = notes.filter((note) => 
   {return note._id !== id});
//  un notes ko lelo jinki id ye nahi hai
setNotes(newNotes);
}
// edit ntoe

const editNote =  async (id , title , description , tag) =>{
 // api call kar rahe hai 
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token" : localStorage.getItem('token'),
      },
      body: JSON.stringify({title , description , tag }),
    });
    
     const json = await response.json();

  
  // II METHOD
  // if (response.ok) {
  //   // Update the notes in the state immutably

  //   // this is another way to write the same thing and its work 
  //   const updatedNotes = notes.map(note =>
  //     note._id === id ? { ...note, title, description, tag } : note
  //   );

  //   setNotes(updatedNotes);
  // } else {
  //   console.error("Failed to update the note");
  // }


  // I METHOD
  // another method to update the function
  // this is not working bcoz   React state updates are asynchronous
  
  let newNotes = JSON.parse(JSON.stringify(notes));
  // this create a deep copy of notes and then updated original one
  // logic to edit in client
    for(let index = 0  ; index < newNotes.length  ; index++){
      const element = newNotes[index];
      if(element._id === id){
        newNotes[index].title = title ;
        newNotes[index].description = description;
        newNotes[index].tag = tag ; 
        break;
      }
  }

  setNotes(newNotes);
  // yaha pe actualy mai notes set to ho rahe the hai per backend mai wfronted mai nahi ho rahe 
  // tu hum dobra sare  notes ko get kar sakte hai 
  
}


  return (
   <noteContext.Provider value={{notes ,getallNote, setNotes , addNote, deleteNote , editNote}}>
     {/* <noteContext.Provider value={{state , update}}> */}
    {props.children}
   </noteContext.Provider>

  )
}

export default NoteState;
