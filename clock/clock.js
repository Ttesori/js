var display = {
    timeOutput: document.querySelector(".time"),
    cssOffset: 90,
    updateHourHand: function (hour) {
        var hourHand = document.querySelector(".hour");
        var newPos = Math.floor((360 / 12) * hour) + this.cssOffset;
        this.checkTransform(newPos,hourHand);
        hourHand.style.transform = 'rotate(' + newPos + 'deg)';
    },
    updateMinHand: function (min) {
        var minHand = document.querySelector(".min");
        var newPos = Math.floor((360 / 60) * min) + this.cssOffset;
        this.checkTransform(newPos,minHand);
        minHand.style.transform = 'rotate(' + newPos + 'deg)';
    },
    updateSecHand: function (sec) {
        var secHand = document.querySelector(".sec");
        var newPos = Math.floor((360 / 60) * sec)+this.cssOffset;
        this.checkTransform(newPos,secHand);
        secHand.style.transform = 'rotate(' + newPos + 'deg)';
    },
    updateClock: function (hour,min,sec,am) {
        this.timeOutput.textContent = this.addLeadingZero(hour) + ':' + this.addLeadingZero(min) + ':' + this.addLeadingZero(sec) + ' ' + am;
    },
    updateDisplay: function(hour,min,sec) {      
        
        // Update digital clock readout
        var am = this.getPM(hour);
        hour = this.fix12Hr(hour);
        
        this.updateClock(hour,min,sec,am);

        // Update the hour, minutes, and second hands
        
        this.updateHourHand(hour);
        this.updateMinHand(min);
        this.updateSecHand(sec);
    },
    addLeadingZero: function(amt) {
        if (amt < 10) {
            amt = '0' + amt;
        }
        return amt;
    },
    fix12Hr: function(hour) {
        if (hour > 12) {
            hour = hour - 12;
        }
        return hour;
    },
    getPM: function(hour) {
        if (hour < 12) {
            return 'AM';
        } else {
            return 'PM';
        }
    },
    checkTransform: function(newPos,hand) {
        // Correct for blip that happens between 59-0-1 
        if (newPos === 444) {
            hand.classList.add("transition-fix");
        } else if (newPos === 96) {
            hand.classList.remove("transition-fix");
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
    },
    init: function() {
        setInterval(this.tick, 1000);
    }
};
clock.init();
