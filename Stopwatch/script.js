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
    let firstLapHovered = false;
    const secColor = document.querySelector("#seconds");
    const runningLapSeconds = document.querySelector("#secondsLaps");
    let bestWorstLapArr = [];
    let worstLap;
    let bestLap;
    // let previousLapHover;
    let stopWatchCounter = 1;
    let lapsColorToggle = false;
    

    // After you finish with this, you'll need to change the name of the Start button to Start-Stop button (in your code)
  
    // Start/Stop button
    buttonStart.onclick = function() {

        // Create new 
        if (mainTimerStartOrContinue) {
            let divStopwatch = document.createElement("div");
            divStopwatch.classList.add("stopWatch" + stopWatchCounter);
            divStopwatch.classList.add("allStopWatches");
            document.querySelector(".laps").prepend(divStopwatch);
            // document.querySelector(".stopWatch" + stopWatchCounter).innerHTML = "This is the testing div";
        }
        // Start button
        if(!startClicked) {
            buttonLapResetStyling();
            clearInterval(Interval);
            Interval = setInterval(startTimer, 10);
            clearInterval(flashSecInterval);
            secColor.style.transition = "all 0.2s ease-in-out";
            secColor.style.color = "#EE0000";

            // Laps
            lapsTimer();

            // Styling
            startStopButtonStyling();

            startClicked = true;
            mainTimerStartOrContinue = false;

            lapsStyling();               
        } 
        // Stop button
        else if(startClicked) {
            clearInterval(Interval);

            // Laps
            clearInterval(IntervalLaps);

            // Styling
            startStopButtonStyling();
            buttonLapResetStyling();
            lapsStyling();

            // secColor.style.color = "#222222";
            flashSecInterval = setInterval(flashSec, 1000);

            startClicked = false;
        }

        

    }
  
    // Lap/Reset button
    buttonLapReset.onclick = function() {
        // Lap button
        if(startClicked) {

            // Changing number from 1 to 2 digits format
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
            newLapDiv.classList.add("stopWatch" + stopWatchCounter);
    
            newLapDiv.innerHTML = `<span class="lapWord${lapsCounter} allLapWords">Lap ${lapsCounter}</span> <span class="lapDash">-</span> <span class="hoursAndDotsLaps">${timeArrLaps[0]}:</span>${timeArrLaps[1]}:${timeArrLaps[2]}.${timeArrLaps[3]}`;
            
            // add the newly created element and its content into the DOM
            // const currentDiv = document.querySelector("laps");
            document.querySelector(".stopWatch" + stopWatchCounter).prepend(newLapDiv);
    
            mainTimerStartOrContinue = true;
            lapsTimer();
            mainTimerStartOrContinue = false;
    

            // styling
            lapsStyling();

            // Calculating best and worst lap
            let currentLapTime = timeArrLaps[0].toString() + timeArrLaps[1].toString() + timeArrLaps[2].toString() + timeArrLaps[3]
            bestWorstLap(currentLapTime, lapsCounter);

            ++lapsCounter;
            appendLapsCounter.innerHTML = lapsCounter;
        } 
        // Reset button
        else if(!startClicked) {
            
            // Creating array with reset timer number with 2 digits format
            let timeArrMain = [hours, minutes, seconds, tens];
        
            for(let i = 0; i < timeArrMain.length; i++) {
                if(timeArrMain[i].toString().length === 1) {
                    timeArrMain[i] = "0" + timeArrMain[i].toString();
                }
            }
            
            // Save the Main Time below (with laps)
            if(!mainTimerStartOrContinue) {
                const newStopWDiv = document.createElement("h3");
                newStopWDiv.classList.add("stopwatch");
                newStopWDiv.innerHTML = `${timeArrMain[0]}:${timeArrMain[1]}:${timeArrMain[2]}.${timeArrMain[3]}`;
                document.querySelector(".stopWatch" + stopWatchCounter).prepend(newStopWDiv);
            }


            // Add line breaks between stopwatches
            if(!mainTimerStartOrContinue) {
                const newLineBreak = document.createElement("hr");
                newLineBreak.classList.add("lineBreak");
                document.querySelector(".stopWatch" + stopWatchCounter).prepend(newLineBreak);
            }

            // Save Best/Worst time for each Stopwatch
            if (lapsCounter > 2) {
                document.querySelector(".stopWatch" + stopWatchCounter + " .lapNum" + bestLap).classList.add("bestLap");
                document.querySelector(".stopWatch" + stopWatchCounter + " .lapNum" + worstLap).classList.add("worstLap");
            }

            // Reset Main Timer
            clearInterval(Interval);
            hours = "00";
            minutes = "00";
            seconds = "00";
            tens = "00";

            appendMinutes.innerHTML = minutes;
            appendTens.innerHTML = tens;
            appendSeconds.innerHTML = seconds;
            appendHours.innerHTML = hours;

            clearInterval(flashSecInterval);
            secColor.style.transition = "all 0.4s ease-in-out";
            secColor.style.color = "#222222";

            // Reset Laps Timer
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

            bestWorstLapArr = [];

            mainTimerStartOrContinue = true;
            stopWatchCounter++;
            lapColorOnStart();
            stopwatchStyling();
            lapsStyling();             
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


    ////////////////////////////////////////////
    // Best/Worst Lap
    ///////////////////////////////////////////
    const bestWorstLap = function (currentLapTime, lapNum) {
        bestWorstLapArr.push(currentLapTime);

        if(bestWorstLapArr.length === 2) {
            if (parseInt(bestWorstLapArr[0]) > parseInt(bestWorstLapArr[1])) {
                worstLap = 1;
                document.querySelector(".stopWatch" + stopWatchCounter + " .lapNum" + 1).classList.toggle("worstLap");
                bestLap = 2;
                document.querySelector(".stopWatch" + stopWatchCounter + " .lapNum" + 2).classList.toggle("bestLap");
            } else {
                worstLap = 2;
                document.querySelector(".stopWatch" + stopWatchCounter + " .lapNum" + 2).classList.toggle("worstLap");
                bestLap = 1;
                document.querySelector(".stopWatch" + stopWatchCounter + " .lapNum" + 1).classList.toggle("bestLap");

            }
        }

        if(parseInt(currentLapTime) > bestWorstLapArr[worstLap - 1]) {
            document.querySelector(".stopWatch" + stopWatchCounter + " .worstLap").classList.toggle("worstLap");
            worstLap = lapNum;
            document.querySelector(".stopWatch" + stopWatchCounter + " .lapNum" + lapNum).classList.toggle("worstLap");
        } else if (parseInt(currentLapTime) < bestWorstLapArr[bestLap - 1]) {
            document.querySelector(".stopWatch" + stopWatchCounter + " .bestLap").classList.toggle("bestLap");
            bestLap = lapNum;
            document.querySelector(".stopWatch" + stopWatchCounter + " .lapNum" + lapNum).classList.toggle("bestLap");
        }

        lapsStyling();
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


    //////////////////////////////////////////////////////////////////////////////
    // STYLING
    /////////////////////////////////////////////////////////////////////////////

    // Changing hours and tens appearance (color) on hover
    time.onmouseover = function() {
        hoursAndTens.forEach(function(element) {
            element.style.transition = "all 0.2s ease-in-out;";
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

        secColor.style.transition = "none";

        const flashSecColor = ["#222222", "#EE0000"];
        secColor.style.color = flashSecColor[i];

        if(firstLapHovered) {
            runningLapSeconds.style.transition = "none";
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
        }
        if(startClicked) {      // Stop button
            buttonStart.style.background = "#F5F5F5";
            buttonStart.style.border = "solid 3px #FFCC00";
        }
    });

    buttonStart.addEventListener('mouseup', e => {
        if(!startClicked) {     // Start button
            buttonStart.style.background = "#FFCC00";
            buttonStart.style.border = "solid 3px #FFDB4D";
        }
        if(startClicked) {      // Stop button
            buttonStart.style.background = "#ffffff";
            buttonStart.style.border = "solid 3px #FFDB4D";
        }
    });

    // Button Lap/Reset on mousedown/mouseup
    buttonLapReset.addEventListener('mousedown', e => {
        if(!mainTimerStartOrContinue) {
            if(!startClicked) {     // Start button
                buttonLapReset.style.background = "#FFCC00";
                buttonLapReset.style.border = "solid 3px #FFCC00";
            }
            if(startClicked) {      // Stop button
                buttonLapReset.style.background = "#F5F5F5";
                buttonLapReset.style.border = "solid 3px #FFCC00";
            }
        }
    });

    buttonLapReset.addEventListener('mouseup', e => {
        if(!mainTimerStartOrContinue) {
            if(!startClicked) {     // Start button
                buttonLapReset.style.background = "#FFCC00";
                buttonLapReset.style.border = "solid 3px #FFDB4D";
            }
            if(startClicked) {      // Stop button
                buttonLapReset.style.background = "#ffffff";
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

            document.querySelector(".runningLap").style.color = "#ffffff";
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
        const laps = document.querySelectorAll("p.lap");

        // Check, maybe these need to be moved down (or removed)
        if (!lapsColorToggle) {
            document.querySelector(".laps").style.color = "#A3A3A3";   // grey for laps
            document.querySelector(".runningLap").style.color = "#A3A3A3";

            if (laps.length > 1) {
                document.querySelector(".hoursAndDotsLaps").style.color = "#ffffff"; 
            }

            //  White color for hours in laps on page load and for dashes, starting with second lap
            runningLapHours.style.color = "#ffffff";
            runningLapHoursDots.style.color = "#ffffff";
            document.querySelector(".lapDash").style.color = "#ffffff";
        } else {
            document.querySelector(".laps").style.color = "#222222";
            console.log("#222222");
        }

                    // Calculating current element's lap number (currentLapNum)
                    const currElementNum = function (element) {
                        let currentLapClasses = element.getAttribute("class");  // returns a string
                        console.log(currentLapClasses);
                        let currentLapNumTempArr = currentLapClasses.split("lapNum");
                        let currentLapNum = "";
                        do {
                            currentLapNum = currentLapNum + currentLapNumTempArr[1].toString().charAt(0);
                            currentLapNumTempArr[1] = currentLapNumTempArr[1].toString().substring(1);
                        } while(currentLapNumTempArr[1].toString().charAt(0) == parseInt(currentLapNumTempArr[1].toString().charAt(0)));
                        currentLapNum = parseInt(currentLapNum);
                        return currentLapNum;
                    }
        
                    // Calculating current element's Stopwatch number (currentLapNum)
                    const currElementSWNum = function (element) {
                        console.log(element);
                        let currentLapClasses = element.getAttribute("class");  // returns a string
                        console.log(currentLapClasses);
                        let currentLapNumTempArr = currentLapClasses.split("stopWatch");
                        let currentLapNum = "";
                        do {
                            currentLapNum = currentLapNum + currentLapNumTempArr[1].toString().charAt(0);
                            currentLapNumTempArr[1] = currentLapNumTempArr[1].toString().substring(1);
                        } while(currentLapNumTempArr[1].toString().charAt(0) == parseInt(currentLapNumTempArr[1].toString().charAt(0)));
                        currentLapNum = parseInt(currentLapNum);
                        return currentLapNum;
                    }

        laps.forEach(element => {
        
            if (!lapsColorToggle) {
                element.onmouseover = function() {
                    element.style.transition = "all 0.2s ease-in-out";
                    element.style.color = "#222222"  // Black
    
    
                    let currentLapNum = currElementNum(element);
                    let currentSWNum = currElementSWNum(element);
                    
                    // Changing hours color on hover
                    document.querySelector(".stopWatch" + currentSWNum + " .lapNum" + currentLapNum + " .hoursAndDotsLaps").style.transition = "all 0.2s ease-in-out";
                    document.querySelector(".stopWatch" + currentSWNum + " .lapNum" + currentLapNum + " .hoursAndDotsLaps").style.color = "#222222";
                    document.querySelector(".stopWatch" + currentSWNum + " .lapNum" + currentLapNum + " .lapDash").style.color = "#222222";
                    document.querySelector(".stopWatch" + currentSWNum + " .lapNum" + currentLapNum + " .lapDash").style.transition = "all 0.2s ease-in-out";
    
                    // Best/Worst Laps on hover
                    document.querySelector(".stopWatch" + currentSWNum + " .lapWord" + currentLapNum).style.transition = "all 0.2s ease-in-out";
                    if(element.classList.contains("bestLap")) {
                        document.querySelector(".stopWatch" + currentSWNum + " .lapWord" + currentLapNum).style.color = "#68A357";
                        document.querySelector(".stopWatch" + currentSWNum + " .lapWord" + currentLapNum).style.transition = "all 0.1s ease-out";
                        document.querySelector(".stopWatch" + currentSWNum + " .lapWord" + currentLapNum).style.borderBottom = "solid 2px #68A357";
                    } else if(element.classList.contains("worstLap")) {
                        document.querySelector(".stopWatch" + currentSWNum + " .lapWord" + currentLapNum).style.color = "#EE0000";
                        document.querySelector(".stopWatch" + currentSWNum + " .lapWord" + currentLapNum).style.transition = "all 0.1s ease-out";
                        document.querySelector(".stopWatch" + currentSWNum + " .lapWord" + currentLapNum).style.borderBottom = "solid 2px #EE0000";
                    } else {
                        document.querySelector(".stopWatch" + currentSWNum + " .lapWord" + currentLapNum).style.color = "#222222";
                    }
    
                    // COMBINED, NEED TO DELETE     
                    // For the laps of timer that didn't finish yet (try to combine them with the ones that finished)
                    // if(currentSWNum === stopWatchCounter) {
                    //     if (bestLap === parseInt(currentLapNum)) {
                    //         document.querySelector(".lapWord" + bestLap).style.transition = "all 0.2s ease-in-out";
                    //         document.querySelector(".lapWord" + bestLap).style.color = "#68A357";
                    //         document.querySelector(".lapWord" + bestLap).style.transition = "all 0.1s ease-out";
                    //         document.querySelector(".lapWord" + bestLap).style.borderBottom = "solid 2px #68A357";
                    //     } else if (worstLap === parseInt(currentLapNum)) {
                    //         document.querySelector(".lapWord" + worstLap).style.transition = "all 0.2s ease-in-out";
                    //         document.querySelector(".lapWord" + worstLap).style.color = "#EE0000";
                    //         document.querySelector(".lapWord" + worstLap).style.transition = "all 0.1s ease-out";
                    //         document.querySelector(".lapWord" + worstLap).style.borderBottom = "solid 2px #EE0000";
                    //     } else {
                    //         // All the other laps are (the Lap word itself)
                    //         document.querySelector(".lapWord" + currentLapNum).style.transition = "all 0.2s ease-in-out";
                    //         document.querySelector(".lapWord" + currentLapNum).style.color = "#222222";
                    //     }
                    // }
                }
    
                element.onmouseout = function() {
                    element.style.transition = "all 0.4s ease-in-out";
                    element.style.color = "#A3A3A3";  // Grey for laps
    
                    // Changing hours color out hover
                    let currentLapNum = currElementNum(element);
                    let currentSWNum = currElementSWNum(element);
                    document.querySelector(".stopWatch" + currentSWNum + " .lapNum" + currentLapNum + " .hoursAndDotsLaps").style.transition = "all 0.4s ease-in-out";
                    document.querySelector(".stopWatch" + currentSWNum + " .lapNum" + currentLapNum + " .hoursAndDotsLaps").style.color = "#ffffff";
                    document.querySelector(".stopWatch" + currentSWNum + " .lapNum" + currentLapNum + " .lapDash").style.transition = "all 0.4s ease-in-out";
                    document.querySelector(".stopWatch" + currentSWNum + " .lapNum" + currentLapNum + " .lapDash").style.color = "#ffffff";
                    
                    // Best/Worst Laps out hover
                    document.querySelector(".stopWatch" + currentSWNum + " .lapWord" + currentLapNum).style.transition = "all 0.4s ease-in-out";
                    document.querySelector(".stopWatch" + currentSWNum + " .lapWord" + currentLapNum).style.color = "#A3A3A3";
                    document.querySelector(".stopWatch" + currentSWNum + " .lapWord" + currentLapNum).style.transition = "all 0.1s ease-in-out";
                    document.querySelector(".stopWatch" + currentSWNum + " .lapWord" + currentLapNum).style.borderBottom = "none";
                }
            } else {    // If clicked show all the laps permanently (rename it)

                let hoursColor = document.querySelectorAll(".hoursAndDotsLaps");
                hoursColor.forEach(hour => {
                    hour.style.transition = "all 0.2s ease-in-out";
                    hour.style.color = "#222222";
                });

                let dashesColor = document.querySelectorAll(".lapDash");
                dashesColor.forEach(dash => {
                    dash.style.transition = "all 0.2s ease-in-out";
                    dash.style.color = "#222222";
                });

                let allSW = document.querySelectorAll(".allStopWatches");
                allSW.forEach(elementAllSW => {
                    let currentSW = currElementSWNum(elementAllSW);
                    // let currentLapNum = 
                    document.querySelector(".stopWatch" + currentSW + " .bestLap" + " .allLapWords").style.color = "#68A357";
                    document.querySelector(".stopWatch" + currentSW + " .bestLap" + " .allLapWords").style.transition = "all 0.1s ease-out";
                    document.querySelector(".stopWatch" + currentSW + " .bestLap" + " .allLapWords").style.borderBottom = "solid 2px #68A357";

                    document.querySelector(".stopWatch" + currentSW + " .worstLap" + " .allLapWords").style.color = "#EE0000";
                    document.querySelector(".stopWatch" + currentSW + " .worstLap" + " .allLapWords").style.transition = "all 0.1s ease-out";
                    document.querySelector(".stopWatch" + currentSW + " .worstLap" + " .allLapWords").style.borderBottom = "solid 2px #EE0000";
                });              
                
                element.onmouseover = function() {


                    // element.style.transition = "all 0.2s ease-in-out";
                    // element.style.color = "#222222"  // Black

                    // console.log(element);
                    // let currentLapNum = currElementNum(element);
                    // let currentSWNum = currElementSWNum(element);

                    // console.log(currentLapNum);
                    // console.log(currentSWNum);
                    

                }
                element.onmouseout = function() {
                    // let currentLapNum = currElementNum(element);
                    // let currentSWNum = currElementSWNum(element);
                    // element.style.color = "#222222";
                }
            }

            // Toggle laps color onclick
            element.onclick = function() {
                if(lapsColorToggle) {
                    lapsColorToggle = false;
                    console.log("false");
                } else {
                    lapsColorToggle = true;
                    console.log("true");
                }
                lapsStyling();
            }


        });  



        
        ///////////////////////////////////////////////
        // Show laps on click
        ////////// This is a working function, but I need to add some transition to it and some nice design and I don't want to do it now
        ////////// because I want to move on to the next project. 
        /////////////////////////////////////////////
        // let lapsToggle = document.querySelectorAll(".stopwatch");
        // console.log(lapsToggle);

        // lapsToggle.forEach(element => {

        //     element.onclick = function() {
        //         // element.classList.toggle("active");
        //         // let content = document.querySelectorAll

        //         let currentSWNum = currElementSWNum(element.nextElementSibling);
        //         console.log(currentSWNum);

        //         if (element.nextElementSibling.style.display === "block") {
        //             // element.style.display = "none";
        //             let temp = document.querySelectorAll("p.lap.stopWatch" + currentSWNum);
        //             temp.forEach(elemenTemp => {
        //                 elemenTemp.style.transition = "all 0.4s ease-in-out";
        //                 elemenTemp.style.display = "none";
        //             });
        //         } else {
        //             // element.nextElementSibling.style.display = "block";
        //             let temp = document.querySelectorAll("p.lap.stopWatch" + currentSWNum);
        //             temp.forEach(elemenTemp => {
        //                 elemenTemp.style.transition = "all 0.4s ease-in-out";
        //                 elemenTemp.style.display = "block";
        //             });                
        //         }
        //     }
        // });


        // The top (running) lap
        laps.item(0).onmouseover = function() {
            laps.item(0).style.transition = "all 0.2s ease-in-out";
            laps.item(0).style.color = "#222222"  // Black
            document.querySelector(".lapDash").style.transition = "all 0.2s ease-in-out";
            document.querySelector(".lapDash").style.color = "#222222";

            // Red for seconds
            runningLapSeconds.style.transition = "all 0.2s ease-in-out";
            runningLapSeconds.style.color = secColor.style.color;
            firstLapHovered = true;

            runningLapHours.style.transition = "all 0.2s ease-in-out";
            runningLapHours.style.color = "#222222";
            runningLapHoursDots.style.transition = "all 0.2s ease-in-out";
            runningLapHoursDots.style.color = "#222222";
        }
        laps.item(0).onmouseout = function() {
            firstLapHovered = false;

            laps.item(0).style.transition = "all 0.4s ease-in-out";
            laps.item(0).style.color = "#A3A3A3";  // Grey for laps
            document.querySelector(".lapDash").style.transition = "all 0.4s ease-in-out";
            document.querySelector(".lapDash").style.color = "#ffffff";

            runningLapSeconds.style.transition = "all 0.4s ease-in-out";
            runningLapSeconds.style.color = "#A3A3A3";  // Grey for laps

            runningLapHours.style.transition = "all 0.4s ease-in-out";
            runningLapHours.style.color = "#ffffff";
            runningLapHoursDots.style.transition = "all 0.4s ease-in-out";
            runningLapHoursDots.style.color = "#ffffff";
        }
    }


    // Styling of Stopwatches (h3)
    const stopwatchStyling = function () {
        const stopwatches = document.querySelectorAll("h3.stopwatch");

        stopwatches.forEach(element => {
            element.onmouseover = function() {
                element.style.transition = "all 0.2s ease-in-out";
                element.style.color = "#222222"  // Black
            }
            element.onmouseout = function() {
                element.style.transition = "all 0.4s ease-in-out";
                element.style.color = "#A3A3A3"  // Black
            }
        });

    }



    

   
    



    
  
}


