var display = {
    hourHand: document.querySelector(".hour"),
    minHand: document.querySelector(".min"),
    secHand: document.querySelector(".sec"),
    timeOutput: document.querySelector(".time"),
    updateHourHand: function (hour) {
        var newPos = Math.floor((360 / 12) * hour);
        this.hourHand.style.transform = this.toCSSDeg(newPos);
    },
    updateMinHand: function (min) {
        var newPos = Math.floor((360 / 60) * min);
        this.minHand.style.transform = this.toCSSDeg(newPos);
    },
    updateSecHand: function (sec) {
        var newPos = Math.floor((360 / 60) * sec);
        this.secHand.style.transform = this.toCSSDeg(newPos);
    },
    updateClock: function (hour,min,sec) {
        var am = this.getPM(hour);

        // Update the clock readout
        if (hour > 12) {
            hour = hour - 12;
        }
        
        this.timeOutput.textContent = this.addLeadingZero(hour) + ':' + this.addLeadingZero(min) + ':' + this.addLeadingZero(sec) + ' ' + am;
    },
    updateDisplay: function(hour,min,sec) {
        // Update digital clock readout
        this.updateClock(hour,min,sec);

        // Update the hour, minutes, and second hands
        this.updateHourHand(hour);
        this.updateMinHand(min);
        this.updateSecHand(sec);
    },
    toCSSDeg: function(amt) {
        amt += 90;
        return 'rotate(' + amt + 'deg)';
    },
    addLeadingZero: function(amt) {
        if (amt < 10) {
            amt = '0' + amt;
        }
        return amt;
    },
    getPM: function(hour) {
        if (hour < 12) {
            return 'AM';
        } else {
            return 'PM';
        }
    }
};

var clock = {
    tick: function() {
        var date = new Date();
        var hour = date.getHours();
        var min = date.getMinutes();
        var sec = date.getSeconds();
        
        display.updateDisplay(hour,min,sec);
    }       
};

var runClock = setInterval(clock.tick, 1000);