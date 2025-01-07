const mongoose = require('mongoose');
const { Schema } = mongoose;
// this Schema is basicaly a blueprint of data mean how data cantain things
const NotesSchema = new Schema({
    user:{
     type: mongoose.Schema.Types.ObjectId,
     ref:'user'
    },
    title : {
    type : String,
    required : true 
   },
 
   description : {
    type : String ,
    required : false,
    
   },
   tag : {
    type: String,
   default : "general",
   },
   date : {
   type : Date,
   required : false,
   default : Date.now
   }
  });

  module.exports = mongoose.model('notes' , NotesSchema ) ;