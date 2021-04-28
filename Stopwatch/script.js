// Colours:
//     white:           #FFFFFF
//     black:           #222222
//     yellow:          #FFCC02
//     red:             #EE0000
//     grey for laps:   #A3A3A3
// 

//     colors for buttons:
//     yellow button :          #FFDB4D
//     yellow button on hover : #FFD633
//     yellow button on press : #FFCC00

window.onload = function () {
    let hours = "0o";
    let minutes = "0o";
    let seconds = "0o"; 
    let tens = "0o"; 
    const appendTens = document.getElementById("tens")
    const appendSeconds = document.getElementById("seconds")
    const appendMinutes = document.getElementById("minutes");
    const appendHours = document.getElementById("hours");
    const buttonStart = document.getElementById('button-start');
    const buttonLapReset = document.getElementById('button-lap-reset');
    let Interval ;
    const time = document.querySelector(".time");
    const hoursAndTens = document.querySelectorAll("span.hidden");
    let startClicked = false;
    const appendLapsCounter = document.querySelector("#lapsCounter");
    let lapsCounter = 1;
    let mainTimerStartOrContinue = true;        // true if the main timer just starts from zero (bug fix, start button was causing laps timer to reset)
    let flashSecInterval;
    // let flashSecLapInterval;
    let firstLapHovered = false;
    const secColor = document.querySelector("#seconds");
    const runningLapSeconds = document.querySelector("#secondsLaps");
    

    // After you finish with this, you'll need to change the name of the Start button to Start-Stop button (in your code)
  
    // Start/Stop button
    buttonStart.onclick = function() {

        // Start button
        if(!startClicked) {
            buttonLapResetStyling();
            clearInterval(Interval);
            Interval = setInterval(startTimer, 10);
            clearInterval(flashSecInterval);
            secColor.style.color = "#EE0000";

            // Laps
            lapsTimer();

            // Styling
            startStopButtonStyling();

            lapsStyling();             

            startClicked = true;
            mainTimerStartOrContinue = false;

            
        } 
        // Stop button
        else if(startClicked) {
            clearInterval(Interval);

            // Laps
            clearInterval(IntervalLaps);

            // Styling
            startStopButtonStyling();
            buttonLapResetStyling();

            // secColor.style.color = "#222222";
            flashSecInterval = setInterval(flashSec, 1000);

            startClicked = false;
        }

        

    }
  
    // Lap/Reset button
    buttonLapReset.onclick = function() {
        // Lap button
        if(startClicked) {
            let timeArrLaps = [hoursLaps, minutesLaps, secondsLaps, tensLaps];
        
            for(let i = 0; i < timeArrLaps.length; i++) {
                if(timeArrLaps[i].toString().length === 1) {
                    timeArrLaps[i] = "0" + timeArrLaps[i].toString();
                }
            } 
    
            // create a new div element
            const newLapDiv = document.createElement("p");
            newLapDiv.classList.add("lap");
            newLapDiv.classList.add("lapNum" + lapsCounter);
    
    
            newLapDiv.innerHTML = `Lap ${lapsCounter} - <span class="hoursAndDotsLaps">${timeArrLaps[0]}:</span>${timeArrLaps[1]}:${timeArrLaps[2]}.${timeArrLaps[3]}`;
    
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
        // Reset button
        else if(!startClicked) {
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

            clearInterval(flashSecInterval);
            secColor.style.color = "#EE0000";

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

            lapColorOnStart();
        }
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

            // If hours num > 0, show hour time permanently (main timer)
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

    // Flashing red seconds when Stop is pressed
    let i = 0;
    const flashSec = function() {

        const flashSecColor = ["#222222", "#EE0000"];
        secColor.style.color = flashSecColor[i];

        if(firstLapHovered) {
            runningLapSeconds.style.color = flashSecColor[i];
        }

        i = (i + 1) % flashSecColor.length;
    }
    
    // Start/Stop button
    const startStopButtonStyling = function () {
        if(!startClicked) {     // Start button
            buttonStart.style.background = "#FFFFFF";
            buttonStart.innerHTML = "Stop";
            buttonStart.style.border = "solid 3px #FFDB4D"
            buttonStart.style.color = "#EE0000";
        }
        if(startClicked) {      // Stop button
            buttonStart.style.background = "#FFDB4D";
            buttonStart.innerHTML = "Start";
            buttonStart.style.border = "solid 3px #FFDB4D";
            buttonStart.style.color = "#222222";

        }
    }

    // On hover for Start/Stop button
    buttonStart.onmouseover = function() { 
        if(!startClicked) {     // Start button
            buttonStart.style.transition = "all 0.1s ease-in-out";
            buttonStart.style.background = "#FFD633"
            buttonStart.style.border = "solid 3px #FFD633"
        }
        if(startClicked) {      // Stop button
            buttonStart.style.transition = "all 0.1s ease-in-out";
            buttonStart.style.background = "#ffffff" 
            buttonStart.style.color = "#EE0000";
            buttonStart.style.border = "solid 3px #FFD633"
        }
    }
    
    buttonStart.onmouseout = function() {
        if(!startClicked) {     // Start button
            buttonStart.style.transition = "all 0.4s ease-in-out";
            buttonStart.style.background = "#FFDB4D" 
            buttonStart.style.border = "solid 3px #FFDB4D"
            buttonStart.style.color = "#222222";
            buttonStart.style.fontSize = "1.2em";
        }
        if(startClicked) {      // Stop button
            buttonStart.style.transition = "all 0.4s ease-in-out";
            buttonStart.style.background = "#ffffff" 
            buttonStart.style.color = "#222222";
            buttonStart.style.border = "solid 3px #FFDB4D"
        }
    }

    // Button Start/Stop on mousedown/mouseup
    buttonStart.addEventListener('mousedown', e => {
        if(!startClicked) {     // Start button
            buttonStart.style.background = "#FFCC00";
            buttonStart.style.border = "solid 3px #FFCC00";
            buttonStart.style.fontSize = "1.18em";
        }
        if(startClicked) {      // Stop button
            buttonStart.style.background = "#F5F5F5";
            buttonStart.style.fontSize = "1.21em";
            buttonStart.style.border = "solid 3px #FFCC00";
        }
    });

    buttonStart.addEventListener('mouseup', e => {
        if(!startClicked) {     // Start button
            buttonStart.style.background = "#FFCC00";
            buttonStart.style.border = "solid 3px #FFDB4D";
            buttonStart.style.fontSize = "1.2em";
        }
        if(startClicked) {      // Stop button
            buttonStart.style.background = "#ffffff";
            buttonStart.style.fontSize = "1.2em";
            buttonStart.style.border = "solid 3px #FFDB4D";
        }
    });

    // Button Lap/Reset on mousedown/mouseup
    buttonLapReset.addEventListener('mousedown', e => {
        if(!mainTimerStartOrContinue) {
            if(!startClicked) {     // Start button
                buttonLapReset.style.background = "#FFCC00";
                buttonLapReset.style.border = "solid 3px #FFCC00";
                buttonLapReset.style.fontSize = "1.18em";
            }
            if(startClicked) {      // Stop button
                buttonLapReset.style.background = "#F5F5F5";
                buttonLapReset.style.fontSize = "1.21em";
                buttonLapReset.style.border = "solid 3px #FFCC00";
            }
        }
    });

    buttonLapReset.addEventListener('mouseup', e => {
        if(!mainTimerStartOrContinue) {
            if(!startClicked) {     // Start button
                buttonLapReset.style.background = "#FFCC00";
                buttonLapReset.style.border = "solid 3px #FFDB4D";
                buttonLapReset.style.fontSize = "1.2em";
            }
            if(startClicked) {      // Stop button
                buttonLapReset.style.background = "#ffffff";
                buttonLapReset.style.fontSize = "1.2em";
                buttonLapReset.style.border = "solid 3px #FFDB4D";
            }
        }
    });
    


    // Lap/Reset button on load (before the Start button clicked for the first time)
    const lapColorOnStart = function () {
        if (mainTimerStartOrContinue) {
            buttonLapReset.style.background = "#ffffff";
            buttonLapReset.style.color = "#EBEBEB";
            buttonLapReset.innerHTML = "Lap";
            buttonLapReset.style.border = "solid 3px #EBEBEB";
            buttonLapReset.style.cursor = "default";
        } 
    }
    lapColorOnStart();

    // Lap/Reset button styling (after Start button is pressed)
    const buttonLapResetStyling = function () {
        if(!startClicked) {     // Lap button
            buttonLapReset.style.background = "#ffffff";
            buttonLapReset.style.color = "#222222";
            buttonLapReset.innerHTML = "Lap";
            buttonLapReset.style.cursor = "pointer";
            buttonLapReset.style.border = "solid 3px #FFDB4D";
        }
        else {                  // Reset button
            buttonLapReset.style.background = "#FFDB4D";
            buttonLapReset.style.color = "#222222";
            buttonLapReset.innerHTML = "Reset";
            buttonLapReset.style.cursor = "pointer";
            buttonLapReset.style.border = "solid 3px #FFDB4D";
            // buttonLapReset.onmouseover();
        }
    }
    
    // On hover for Lap/Reset button
    buttonLapReset.onmouseover = function() { 
        if(!mainTimerStartOrContinue) {
            if(!startClicked) {     // Reset button
                buttonLapReset.style.transition = "all 0.1s ease-in-out";
                buttonLapReset.style.background = "#FFCC00"
                buttonLapReset.style.border = "solid 3px #FFCC00"
            }
            if(startClicked) {      // Lap button
                buttonLapReset.style.transition = "all 0.1s ease-in-out";
                buttonLapReset.style.background = "#ffffff" 
                buttonLapReset.style.color = "#EE0000";
            }
        }   
    }
    
    // Lap/Reset button out hover
    buttonLapReset.onmouseout = function() {
        if(!mainTimerStartOrContinue) {
            if(!startClicked) {     // Reset button
                buttonLapReset.style.transition = "all 0.4s ease-in-out";
                buttonLapReset.style.background = "#FFDB4D" 
                buttonLapReset.style.border = "solid 3px #FFDB4D"
                buttonLapReset.style.color = "#222222";
            }
            if(startClicked) {      // Lap button
                buttonLapReset.style.transition = "all 0.4s ease-in-out";
                buttonLapReset.style.background = "#ffffff" 
                buttonLapReset.style.color = "#222222";
            }
        }
    }


    // styling of laps
    const lapsStyling = function () {

        let runningLapHours = document.querySelector(".hiddenHoursLaps");
        let runningLapHoursDots = document.querySelector(".dotsLaps");

        document.querySelector(".laps").style.color = "#A3A3A3";   // grey for laps

        const laps = document.querySelectorAll("p.lap");


        //  White color for hours in laps on page load, starting with second lap
        runningLapHours.style.color = "#ffffff";
        runningLapHoursDots.style.color = "#ffffff";
        if (laps.length > 1) {
            document.querySelector(".hoursAndDotsLaps").style.color = "#ffffff"; 
        }

        
        // All the other laps (except the top one)
        laps.forEach(element => {

            element.onmouseover = function() {
                element.style.transition = "all 0.1s ease-in-out";
                element.style.color = "#222222"  // Black

                // Changing hours color on hover
                let currentLapNum = currElementNum();
                document.querySelector(".lapNum" + currentLapNum + " .hoursAndDotsLaps").style.transition = "all 0.1s ease-in-out";
                document.querySelector(".lapNum" + currentLapNum + " .hoursAndDotsLaps").style.color = "#222222";

            }
            element.onmouseout = function() {
                element.style.transition = "all 0.4s ease-in-out";
                element.style.color = "#A3A3A3";  // Grey for laps

                // Changing hours color out hover
                let currentLapNum = currElementNum();
                document.querySelector(".lapNum" + currentLapNum + " .hoursAndDotsLaps").style.transition = "all 0.4s ease-in-out";
                document.querySelector(".lapNum" + currentLapNum + " .hoursAndDotsLaps").style.color = "#ffffff";
            }

            // Calculating current element's lap number (currentLapNum)
            const currElementNum = function () {
                let currentLapClasses = element.getAttribute("class");  // returns a string
                let currentLapNumTempArr = currentLapClasses.split("lapNum");
                let currentLapNum = currentLapNumTempArr[1].toString().charAt(0);
                return currentLapNum;
            }
        });

        // The top (running) lap
        laps.item(0).onmouseover = function() {
            laps.item(0).style.transition = "all 0.1s ease-in-out";
            laps.item(0).style.color = "#222222"  // Black

            // Red for seconds
            runningLapSeconds.style.transition = "all 0.1s ease-in-out";
            runningLapSeconds.style.color = secColor.style.color;
            firstLapHovered = true;

            runningLapHours.style.transition = "all 0.1s ease-in-out";
            runningLapHours.style.color = "#222222";
            runningLapHoursDots.style.transition = "all 0.1s ease-in-out";
            runningLapHoursDots.style.color = "#222222";
        }
        laps.item(0).onmouseout = function() {
            // clearInterval(flashSecLap, 1000);
            firstLapHovered = false;

            laps.item(0).style.transition = "all 0.4s ease-in-out";
            laps.item(0).style.color = "#A3A3A3";  // Grey for laps

            runningLapSeconds.style.transition = "all 0.4s ease-in-out";
            runningLapSeconds.style.color = "#A3A3A3";  // Grey for laps

            runningLapHours.style.transition = "all 0.4s ease-in-out";
            runningLapHours.style.color = "#ffffff";
            runningLapHoursDots.style.transition = "all 0.4s ease-in-out";
            runningLapHoursDots.style.color = "#ffffff";
        }
        
        
    }
    

    ////////////////////////////////////////////
    // Laps functionality
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


