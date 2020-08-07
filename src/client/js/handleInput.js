const baseURL = "http://localhost:8081/traerDatos";


//------------------------------------------------------------------------------------------

function handleInput(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value;
    const whenText = document.getElementById('when').value;
    
    if (formText && whenText) {
        const query = baseURL + "?name=" + formText + "&when=" + whenText;
        console.log("::: Form Submitted :::")
        console.log(query);
        fetch(query)
        .then(res => res.json())
        .then(function(res) {
            console.log(res);
            document.getElementById('results').innerHTML = "Place: " + formText;
            if (res.APIPic) {
                const picDiv = document.getElementById("toShowPic");
                picDiv.innerHTML = `<img id="pictures" src="${res.APIPic}" alt="Image of your destination"></img>`
            } 
            document.getElementById("forecast").innerHTML = "Forecast: <br/>High Temp: " + res.highTemp + "<br/>"
                                                                        + "Low Temp: " + res.lowTemp + "<br/>"
                                                                        + "Precipitation: " + res.precip;
            //document.getElementById('pictures').innerHTML = <img></img>;
        })

    } else {
        alert('The input "Place" is not valid');
    }
    
    if (whenText) {
        // Set the date we're counting down to
        var countDownDate = new Date(whenText).getTime();

        // Update the count down every 1 second
        var x = setInterval(function() {

        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="demo"
        document.getElementById("departure").innerHTML = "Time left to departure: " + days + "d " + hours + "h "
        + minutes + "m " + seconds + "s ";

        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("demo").innerHTML = "EXPIRED";
        }
        }, 1000);
    } else {
        alert('The input "When?" is not valid');
    }
}

export { handleInput }