// Setup empty JS object to act as endpoint for all routes
const projectData = {
    entries: []
};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("dist"));


// Setup Server
const port = 8000;
const server = app.listen(port, listening);

function listening() {
    console.log("Server Running!")
    console.log(`Running on localHost: ${port}`);
}

app.get("/info", function (req, res) {
    res.send(projectData.entries[projectData.entries.length-1]);
})

app.post("/info", storeData);

function storeData (req, res) {
    const entry = {}; 
    entry.temperature = req.body.temperature;
    entry.date = req.body.date;
    entry.feelings = req.body.feelings;
    projectData.entries.push(entry);
}

