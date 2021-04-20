// Colours:
//     white:  #FFFFFF
//     black:  #222222
//     yellow: #FFCC02
//     red:    #EE0000

window.onload = function () {
    let hours = "0o";
    let minutes = "0o";
    let seconds = "0o"; 
    let tens = "0o"; 
    let appendTens = document.getElementById("tens")
    let appendSeconds = document.getElementById("seconds")
    let appendMinutes = document.getElementById("minutes");
    let appendHours = document.getElementById("hours");
    let buttonStart = document.getElementById('button-start');
    let buttonReset = document.getElementById('button-reset');
    let buttonLap = document.getElementById('button-lap');
    let Interval ;
    let time = document.querySelector(".time");
    let hoursAndTens = document.querySelectorAll("span.hidden");
    let startClicked = false;
    let lapsCounter = 0;
    

    // After you finish with this, you'll need to change the name of the Start button to Start-Reset button (in your code)
  
    // Start/Stop button
    buttonStart.onclick = function() {

        if(!startClicked) {
            clearInterval(Interval);
            Interval = setInterval(startTimer, 10);
            startClicked = true;

            buttonStart.style.background = "#222222";
            buttonStart.style.color = "#FFFFFF";
            buttonStart.innerHTML = "Stop";
        } 
        else if(startClicked) {
            clearInterval(Interval);
            startClicked = false;

            buttonStart.style.background = "#FFCC02";
            buttonStart.style.color = "#222222";
            buttonStart.innerHTML = "Start";
            
        }
    }


    buttonReset.onclick = function() {
        clearInterval(Interval);
        hours = "00";
        minutes = "00";
        tens = "00";
        seconds = "00";
    
        appendMinutes.innerHTML = minutes;
        appendTens.innerHTML = tens;
        appendSeconds.innerHTML = seconds;
        appendHours.innerHTML = hours;

        lapsCounter = 0;
    }
    
    // Lap button
    buttonLap.onclick = function() {
        let timeArrLaps = [hours, minutes, seconds, tens];
    
        for(let i = 0; i < timeArrLaps.length; i++) {
            if(timeArrLaps[i].toString().length === 1) {
                timeArrLaps[i] = "0" + timeArrLaps[i].toString();
            }
        } 

        // create a new div element
        const newLapDiv = document.createElement("p");
        newLapDiv.classList.add("lap");

        // and give it some content
        const newContent = document.createTextNode("Lap " + lapsCounter + " - " + timeArrLaps[0] + ":" + timeArrLaps[1] + ":" + timeArrLaps[2] + ":" + timeArrLaps[3]);

        // add the text node to the newly created div
        newLapDiv.appendChild(newContent);

        // add the newly created element and its content into the DOM
        const currentDiv = document.querySelector("laps");
        document.querySelector(".laps p").parentElement.prepend(newLapDiv);

        ++lapsCounter;

        // styling
        lapsStyling();

    }

    
    function startTimer () {
        tens++; 
      
        if(tens <= 9){
            appendTens.innerHTML = "0" + tens;
        }
      
        if (tens > 9){
            appendTens.innerHTML = tens;
        
        } 
      
        if (tens > 99) {
            seconds++;
            appendSeconds.innerHTML = "0" + seconds;
            tens = 0;
            appendTens.innerHTML = "0" + 0;
        }
      
        if (seconds > 9){
            appendSeconds.innerHTML = seconds;
        }

        if (seconds > 59) {
            minutes++;
            appendMinutes.innerHTML = "0" + minutes;
            seconds = 0;
            appendSeconds.innerHTML = "0" + 0;
        }

        if (minutes > 59) {
            hours++;
            appendHours.innerHTML = "0" + hours;
            minutes = 0;
            appendMinutes.innerHTML = "0" + 0;
            hoursAndTens[0].style.color = "#222222";
            hoursAndTens[1].style.color = "#222222";
        }
    
    }

    // Changing hours and tens appearance (color) on hover
    time.onmouseover = function() {
        hoursAndTens.forEach(function(element) {
            element.style.transition = "all 0.3s ease-in-out;";
            element.style.color = "#222222"
        });
    }

    time.onmouseout = function() {
        hoursAndTens.forEach(function(element) {
            element.style.transition = "all 0.4s ease-in-out";
            element.style.color = "#FFFFFF"
        });
    }

    // On hover for Start/Stop button
    buttonStart.onmouseover = function() { 
        if(!startClicked) {
            buttonStart.style.transition = "all 0.1s ease-in-out;";
            buttonStart.style.background = "#FFDE5C"  // Lighter yellow
        }
        if(startClicked) {
            buttonStart.style.transition = "all 0.1s ease-in-out;";
            buttonStart.style.background = "#3D3D3D"  // Lighter black
        }
    }
    
    buttonStart.onmouseout = function() {
        if(!startClicked) {
            buttonStart.style.transition = "all 0.4s ease-in-out";
            buttonStart.style.background = "#FFCC02"  // Yellow
        }
        if(startClicked) {
            buttonStart.style.transition = "all 0.4s ease-in-out";
            buttonStart.style.background = "#222222"  // Black
        }
    }

    // styling of laps
    const lapsStyling = function () {
        const laps = document.querySelectorAll(".lap");
        
        
    }
    

    // // BAD FIXES

    // Bad fix of the first hover on time
    hoursAndTens.forEach(function(element) {
        element.style.transition = "all 0.4s ease-in-out";
        element.style.color = "#FFFFFF"
    });

    // Bad fix. My stopwatch wouldn't start without resetting it first. So I added these few lines from reset from the reset button
    hours = "00";
    minutes = "00";
    tens = "00";
    seconds = "00";
    



    
  
}