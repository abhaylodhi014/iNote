
const mongoose = require('mongoose');

// Replace this with your actual MongoDB connection string
const mongoURI = "mongodb://localhost:27017/inote";

const connectTOMongo = async () => {
    try {
        await mongoose.connect(mongoURI, {
            // useNewUrlParser: true,  // Allows MongoDB's new URL parser
            // useUnifiedTopology: true,  // Ensures more stable connection management
        });
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
   
    }
};  

module.exports = connectTOMongo;
 