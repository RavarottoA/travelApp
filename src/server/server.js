// Setup empty JS object to act as endpoint for all routes
const projectData = {
    entries: []
};

// Require Express to run server and routes
const express = require("express");
const axios = require("axios")
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
const port = 8081;
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
    entry.latitude = req.body.lat;
    entry.longitude = req.body.lng;
    entry.country = req.body.countryName;
    projectData.entries.push(entry);
}

// Geonames
//http://api.geonames.org/searchJSON?q=london&maxRows=10&username=demo
//http://api.geonames.org/searchJSON?name=${destination}&maxRows=1&username=${geonamesUsername}

const apiURL = "http://api.geonames.org/searchJSON?name=";   
const urlRest = "&maxRows=1&username=";
const userName = "alejandror";

//weatherbit APi => Forecast (fijate bien async!!!!)
const foreCastURL = "http://api.weatherbit.io/v2.0/forecast/daily?";
const lat = "lat=";
const long = "&lon=";
const APIKey = "&key=";
const foreKey = "886fd37c4c9347bdb66e82b67d105eff";

// Pixabay API
//https://pixabay.com/api/?key=17800755-dc3c4db21742e0896a432380f&q=yellow+flowers&image_type=photo
const pixURL = "https://pixabay.com/api/?key=";
const pixKey = "17800755-dc3c4db21742e0896a432380f";
const cityNamePrefix = "&q=";
const pixURLEnd = "&image_type=photo";



let datos = {};

 app.get("/traerDatos", function (req, res){
    const name = req.query.name;
    const geoURL = apiURL + name + urlRest + userName;
    axios.post(geoURL, {})
    .then(function (axiosRes){
        const result = axiosRes.data; 
        //console.log(result);
        const latitude = result.geonames[0].lat; 
        const longitude = result.geonames[0].lng; 
        const country = result.geonames[0].countryName; 
        /*console.log(latitude);
        console.log(longitude);
        console.log(country);*/
        datos["APILat"] = latitude;
        datos["APILong"] = longitude;
        datos["APICountry"] = country;
        console.log(datos);
        //datos["sentence"] = name;
        //datos["subjectivity"]= r.subjectivity; 

        const when = req.query.when;
        const forecastCallURL = foreCastURL + lat + latitude + long + longitude + APIKey + foreKey;
        console.log("this is when txt: " + when);
        axios.get(forecastCallURL, {})
        .then(function (axiosRes){
            const resultado = axiosRes.data.data; 
            for (let i = 0; i < resultado.length ; i++) {
                if (resultado[i].datetime === when) {
                    console.log(resultado[i]);
                    datos["highTemp"] = resultado[i].high_temp;
                    datos["lowTemp"] = resultado[i].low_temp;
                    datos["precip"] = resultado[i].precip;
                    break;
                }
            }


        const pixabayCall = pixURL + pixKey + cityNamePrefix + name + pixURLEnd;

        axios.get(pixabayCall, {})
        .then(function (axiosRes){
            const pixResult = axiosRes.data;
            const imgURL = pixResult.hits[0].webformatURL; 
            console.log(imgURL);
            datos["APIPic"] = imgURL;
            console.log(datos);
            res.json(datos);
            res.end();
            //let imgMaker = document.getElementById("pictures");
            //imgMaker.src = imgURL;
        })

        
    }) 
        })
    .catch (function (error) {
        console.log(error);
        res.end();
    });
})

// -------------Forecast ------------


 // Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

