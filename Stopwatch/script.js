// Colours:
//     white:           #FFFFFF
//     black:           #222222
//     yellow:          #FFCC02
//     red:             #EE0000
//     grey for laps:   #A3A3A3

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
    let appendLapsCounter = document.querySelector("#lapsCounter");
    let lapsCounter = 1;
    let mainTimerStartOrContinue = true;        // true if the main timer just starts from zero (bug fix, start button was causing laps timer to reset)
    

    // After you finish with this, you'll need to change the name of the Start button to Start-Reset button (in your code)
  
    // Start/Stop button
    buttonStart.onclick = function() {

        // Start button
        if(!startClicked) {
            clearInterval(Interval);
            Interval = setInterval(startTimer, 10);
            startClicked = true;

            buttonStart.style.background = "#222222";
            buttonStart.style.color = "#FFFFFF";
            buttonStart.innerHTML = "Stop";

            // Laps
            lapsTimer();
            mainTimerStartOrContinue = false;

            // Laps styling
            lapsStyling();  
        } 
        // Stop button
        else if(startClicked) {
            clearInterval(Interval);
            startClicked = false;

            buttonStart.style.background = "#FFCC02";
            buttonStart.style.color = "#222222";
            buttonStart.innerHTML = "Start";

            // Laps
            clearInterval(IntervalLaps);
        }

        

    }

    // Reset button
    buttonReset.onclick = function() {
        // Reset Main Timer
        clearInterval(Interval);
        hours = "00";
        minutes = "00";
        tens = "00";
        seconds = "00";
    
        appendMinutes.innerHTML = minutes;
        appendTens.innerHTML = tens;
        appendSeconds.innerHTML = seconds;
        appendHours.innerHTML = hours;

        // Reset Laps
        clearInterval(IntervalLaps);
        hoursLaps = "00";
        minutesLaps = "00";
        tensLaps = "00";
        secondsLaps = "00";
    
        appendMinutesLaps.innerHTML = minutesLaps;
        appendTensLaps.innerHTML = tensLaps;
        appendSecondsLaps.innerHTML = secondsLaps;
        appendHoursLaps.innerHTML = hoursLaps;

        lapsCounter = 1;
        appendLapsCounter.innerHTML = lapsCounter;

        mainTimerStartOrContinue = true;

    }
    
    // Lap button
    buttonLap.onclick = function() {

        let timeArrLaps = [hoursLaps, minutesLaps, secondsLaps, tensLaps];
        

    
        for(let i = 0; i < timeArrLaps.length; i++) {
            if(timeArrLaps[i].toString().length === 1) {
                timeArrLaps[i] = "0" + timeArrLaps[i].toString();
            }
        } 

        // create a new div element
        const newLapDiv = document.createElement("p");
        newLapDiv.classList.add("lap");

        // and give it some content
        const newContent = document.createTextNode("Lap " + lapsCounter + " - " + timeArrLaps[0] + ":" + timeArrLaps[1] + ":" + timeArrLaps[2] + "." + timeArrLaps[3]);
        // timeArrLaps[0].classList.add("testClass");

        console.log(newContent);

        // add the text node to the newly created div
        newLapDiv.appendChild(newContent);

        // add the newly created element and its content into the DOM
        const currentDiv = document.querySelector("laps");
        document.querySelector("#forPrependLaps").prepend(newLapDiv);

        mainTimerStartOrContinue = true;
        lapsTimer();
        mainTimerStartOrContinue = false;

        ++lapsCounter;
        appendLapsCounter.innerHTML = lapsCounter;

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


    ///////////////////////////////////////
    // Styling
    //////////////////////////////////////

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
        document.querySelector(".laps").style.color = "#A3A3A3";   // grey for laps
        let hoursAndDotsLaps = [document.querySelector("#hoursLaps"), document.querySelector("#hoursDotsLaps")];
        // hoursAndDotsLaps.forEach(element => {
        //     element.style.color = "#ffffff";
        // });

        document.querySelector("#hoursLaps").style.color = "#ffffff"
        document.querySelector("#hoursDotsLaps").style.color = "#ffffff"
        const laps = document.querySelectorAll("p.lap");

        console.log(laps.item(0));

        
        // All the other laps (except the top one)
        laps.forEach(element => {
            element.onmouseover = function() {
                element.style.transition = "all 0.4s ease-in-out";
                element.style.color = "#222222"  // Black
            }
            element.onmouseout = function() {
                element.style.transition = "all 0.4s ease-in-out";
                element.style.color = "#A3A3A3";  // Grey for laps
            }
        });

        // The top (running) lap
        let runningLapSeconds = document.querySelector("#secondsLaps");

        laps.item(0).onmouseover = function() {
            laps.item(0).style.transition = "all 0.4s ease-in-out";
            laps.item(0).style.color = "#222222"  // Black

            runningLapSeconds.style.transition = "all 0.4s ease-in-out";
            runningLapSeconds.style.color = "#EE0000";  // Red
        }
        laps.item(0).onmouseout = function() {
            laps.item(0).style.transition = "all 0.4s ease-in-out";
            laps.item(0).style.color = "#A3A3A3";  // Grey for laps

            runningLapSeconds.style.transition = "all 0.4s ease-in-out";
            runningLapSeconds.style.color = "#A3A3A3";  // Grey for laps
        }
        
        
    }
    

    ////////////////////////////////////////////
    // Laps funcitonality
    ///////////////////////////////////////////

    let hoursLaps = "0o";
    let minutesLaps = "0o";
    let secondsLaps = "0o"; 
    let tensLaps = "0o"; 
    let IntervalLaps ;
    let appendTensLaps = document.getElementById("tensLaps");
    let appendSecondsLaps = document.getElementById("secondsLaps")
    let appendMinutesLaps = document.getElementById("minutesLaps");
    let appendHoursLaps = document.getElementById("hoursLaps");

    const lapsTimer = function () {

        // Set lap timer to zeroes (reset lap timer)
        if(mainTimerStartOrContinue) {
            clearInterval(IntervalLaps);
            hoursLaps = "00";
            minutesLaps = "00";
            secondsLaps = "00";
            tensLaps = "00";

            appendHoursLaps.innerHTML = hoursLaps;
            appendMinutesLaps.innerHTML = minutesLaps;
            appendSecondsLaps.innerHTML = secondsLaps;
            appendTensLaps.innerHTML = tensLaps;
        }
        
        // Start lap timer
        clearInterval(IntervalLaps);
        IntervalLaps = setInterval(startTimerForLaps, 10);

    };
     
    function startTimerForLaps () {
        tensLaps++; 
      
        if(tensLaps <= 9){
            appendTensLaps.innerHTML = "0" + tensLaps;
        }
      
        if (tensLaps > 9){
            appendTensLaps.innerHTML = tensLaps;
        
        } 
      
        if (tensLaps > 99) {
            secondsLaps++;
            appendSecondsLaps.innerHTML = "0" + secondsLaps;
            tensLaps = 0;
            appendTensLaps.innerHTML = "0" + 0;
        }
      
        if (secondsLaps > 9){
            appendSecondsLaps.innerHTML = secondsLaps;
        }

        if (secondsLaps > 59) {
            minutesLaps++;
            appendMinutesLaps.innerHTML = "0" + minutesLaps;
            secondsLaps = 0;
            appendSecondsLaps.innerHTML = "0" + 0;
        }

        if (minutesLaps > 59) {
            hoursLaps++;
            appendHoursLaps.innerHTML = "0" + hoursLaps;
            minutesLaps = 0;
            appendMinutesLaps.innerHTML = "0" + 0;

        }
    }


    ///////////////////////////////////////
    // BAD FIXES
    //////////////////////////////////////

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


