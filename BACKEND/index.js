const connectTOMongo = require('./db');
const express = require('express');
var cors = require('cors')
// Connect to MongoDB
connectTOMongo();

const app = express();// Create an Express application
const port = 5000;
 
app.use(cors())

// middlewhere
app.use(express.json());

// Example route (optional) ans available routes

app.use('/api/auth' , require('./routes/auth'));
app.use('/api/notes' , require('./routes/notes'));

app.get("/", (req, res) => {
    res.send("API is working!");
});

// Start the server
app.listen(port, () => {
    console.log(`example App listening at http://localhost:${port}`);
});

