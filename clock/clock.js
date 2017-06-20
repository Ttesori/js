var runClock = setInterval(tick, 1000);

function tick() {
    var date;
    var hour;
    var min;
    var sec;
    var am;

    // Grab elements to manipulate
    var timeOutput = document.querySelector(".time");

    // Get the current time
    date = new Date();
    hour = date.getHours();
    min = date.getMinutes();
    sec = date.getSeconds();
    am = getPM(hour);

    // Update the clock readout
    if (hour > 12) {
        hour = hour - 12;
    }
    timeOutput.textContent = addLeadingZero(hour) + ':' + addLeadingZero(min) + ':' + addLeadingZero(sec) + ' ' + am;

    // Update the hour, minutes, and second hands
    updateHourHand(hour);
    updateMinHand(min);
    updateSecHand(sec);
}

function updateHourHand(hour) {
    var hourHand = document.querySelector(".hour");
    var newPos = Math.floor((360 / 12) * hour);
    hourHand.style.transform = toCSSDeg(newPos);   
}

function updateMinHand(min) {
    var minHand = document.querySelector(".min");
    var newPos = Math.floor((360 / 60) * min);
    minHand.style.transform = toCSSDeg(newPos);   
}

function updateSecHand(sec) {
    var secHand = document.querySelector(".sec");
    var newPos = Math.floor((360 / 60) * sec);
    secHand.style.transform = toCSSDeg(newPos);   
}

function toCSSDeg(amt) {
    amt += 90
    return 'rotate(' + amt + 'deg)';
}

function addLeadingZero(amt) {
    if (amt < 10) {
        amt = '0' + amt;
    }
    return amt;
}

function getPM(hour) {
    if (hour < 12) {
        return 'AM';
    } else {
        return 'PM';
    }
}
