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
    let buttonStop = document.getElementById('button-stop');
    let buttonReset = document.getElementById('button-reset');
    let Interval ;
    let time = document.querySelector(".time");
    let hoursAndTens = document.querySelectorAll("span.hidden");
  
    buttonStart.onclick = function() {
      
        clearInterval(Interval);
        Interval = setInterval(startTimer, 10);
    }
    
    buttonStop.onclick = function() {
        clearInterval(Interval);
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


    // // BAD FIXES

    // Bad fix of the first hover on time
    hoursAndTens.forEach(function(element) {
        element.style.transition = "all 0.4s ease-in-out";
        element.style.color = "#FFFFFF"
    });

    clearInterval(Interval);
    



    
  
}