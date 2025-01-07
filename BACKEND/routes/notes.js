const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const router = express.Router();
// here we import our notes model
const Notes = require('../models/Notes');
// ROUTES-1 : GET ALL THE NOTES USING: GET "/api/notes/fetchnots" login is required
router.get('/fetchnotes' ,fetchuser, async (req , res) => {
    try { 
         const notes = await Notes.find({user : req.user.id});
    res.json(notes)   
    } catch (error) {
        console.error(error);
        res.status(500).send("some error occur");
    }
  
  
})

// ROUTES-2 : adding new notes using post:  "/api/notes/addnotes" login is required
router.post('/addnotes' , fetchuser,[
    // jitne bhi check hai wo is array mai se pass ho jayge yaha per khud ki coustom error bhi lekh sakte hai
  body('title' , 'enter a title ').isLength({min : 3}),
  body('description' , 'description must be atleast 5 characters').isLength({min : 5}),
], async (req , res) => {
    try {
       const {title , description , tag } = req.body ;
    // if any ocur in validation then send this error 
    const errors = validationResult(req); 
    if(!errors.isEmpty()){
      return res.status(400).json({errors : errors.array()});
    }
    const note = new Notes({
     title , description , tag , user : req.user.id 
    })
    const savednote = await note.save()
    res.json(savednote)
     
    } catch (error) {
        console.error(error);
        res.status(500).send("some error occur");
    }
    
  
})
// ROUTES-3 : update notes using put:  "/api/notes/updatenotes" login is required
router.put('/updatenotes/:id' , fetchuser, async (req , res) => {
    // yaha per ek check hai user ko us particular note ki id(jo mongoodb ne allocate kari hai) provide karne padegi jisko wo update karna hai and ya it must be loged in

    try {
       const {title , description , tag } = req.body ;
    // if any ocur in validation then send this error 
    
    const newNote = { };
    // its means agar req body se kuch particluar element a raha hai tu use udate kardo 
     if(title){newNote.title = title}
    if(description){newNote.description = description}
    if(tag){newNote.tag = tag}
    // find the note to be updated and update it
    // yaha per siddhi findbyidandupdate nahi lagayge due some security issue
    let note = await Notes.findById(req.params.id);
    if(!note){
        return res.status(404).send("not found")
    }
    if(note.user.toString() !== req.user.id){
        return res.status(404).send("not allowed ") 
    }
    note = await Notes.findByIdAndUpdate(req.params.id , {$set : newNote} , {new:true} )
    res.json(note)
     
    } catch (error) {
        console.error(error);
        res.status(500).send("some error occur");
    }
    
  
})
// ROUTES-4 : DELETE notes using DELETE:  "/api/notes/deletenotes" login is required
router.delete('/deletenotes/:id' , fetchuser, async (req , res) => {
    // yaha per ek check hai user ko us particular note ki id(jo mongoodb ne allocate kari hai) provide karne padegi jisko wo update karna hai and ya it must be loged in

    try {
    
   //find the note to be deleted to be delet it
    let note = await Notes.findById(req.params.id);
    if(!note){
        return res.status(404).send("not found")
    }
    // allow deletion only if user owns this note
    if(note.user.toString() !== req.user.id){
        return res.status(404).send("not allowed ") 
    }

    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({"successfully":"note has been deleted" , note})
     
    } catch (error) { 
        console.error(error);
        res.status(500).send("some error occur");
    }
    
  
})
module.exports  = router;