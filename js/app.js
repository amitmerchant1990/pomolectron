'use strict';
const shell = require('electron').shell;

class Timer {
    constructor(minutes, seconds = 60) {
        this.minutes = minutes;
        this.seconds = seconds;
        this.initialMinutes = minutes;
        this.initialSeconds = seconds;
        this.timer;
        this.pomodoroTime;
    }

    startTimer(display) {
        this._initializePomotime();
        this.timer = this.pomodoroTime;
        clearInterval(this.pomodoroIntervalId);

        this.pomodoroIntervalId = setInterval(() => {
            if (--(this.timer) < 0) {
                this.timer = this.pomodoroTime;
            }

            this.minutes = parseInt(this.timer / 60, 10);
            this.seconds = parseInt(this.timer % 60, 10);

            this.minutes = this.minutes < 10 ? '0' + this.minutes : this.minutes;
            this.seconds = this.seconds < 10 ? '0' + this.seconds : this.seconds;

            display.textContent = this.minutes + ":" + this.seconds;

            if (this.minutes == 0 && this.seconds == 0) {
                notifyUser();
                this.stopTimer();
            }
        }, 1000);
    }

    stopTimer() {
        clearInterval(this.pomodoroIntervalId);
    }

    resetTimer(selector) {
        this.minutes = this.initialMinutes;
        this.seconds = this.initialSeconds;
        clearInterval(this.pomodoroIntervalId);
        document.querySelector(selector).textContent = `${this._getDoubleDigit(this.initialMinutes)}:00`;
    }

    _getDoubleDigit(number) {
        const filledNumber = '0' + number.toString();
        return filledNumber.length >= 3 ? filledNumber.slice(1, filledNumber.length) : filledNumber;
    }

    _initializePomotime() {
        if (this.minutes == this.initialMinutes && this.seconds == this.initialSeconds) {
            this.pomodoroTime = this.minutes * this.seconds;
        } else {
            this.pomodoroTime = this.minutes * 60 + this.seconds;
        }
    }
}

var display = document.querySelector('#time');
var display_short = document.querySelector('#time_short');
var display_long = document.querySelector('#time_long');

$(document).on('click', 'a[href^="http"]', function (event) {
    event.preventDefault();
    shell.openExternal(this.href);
});


let normalTimer = new Timer(25);

$('#start').click(() => {

    normalTimer.startTimer(display);
    $('#stop').show();
    $('#start').hide();
})

$('#stop').click(() => {
    normalTimer.stopTimer();
    $('#start').show();
    $('#stop').hide();
});

$('#reset').click(() => {
    normalTimer.resetTimer('#time');

    $('#start').show();
    $('#stop').hide();
});

let shortTimer = new Timer(5);

$('#short_start').click(() => {
    shortTimer.startTimer(display_short);
    $('#short_stop').show();
    $('#short_start').hide();
})

$('#short_stop').click(() => {
    shortTimer.stopTimer();

    $('#short_start').show();
    $('#short_stop').hide();
});

$('#short_reset').click(() => {
    shortTimer.resetTimer('#time_short');

    $('#short_start').show();
    $('#short_stop').hide();
});

let longTimer = new Timer(10);

$('#long_start').click(() => {
    longTimer.startTimer(display_long);

    $('#long_stop').show();
    $('#long_start').hide();
})

$('#long_stop').click(() => {
    longTimer.stopTimer();
    $('#long_start').show();
    $('#long_stop').hide();
});

$('#long_reset').click(() => {
    longTimer.resetTimer('#time_long');

    $('#long_start').show();
    $('#long_stop').hide();
});


function closeApp() {
    ipc.send('closeApp', 'close');
}

$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    let activeTab = e.target.toString();
    let nameActiveTab = activeTab.split('#');

    if (nameActiveTab[1] == 'pomodoro') {
        normalTimer.resetTimer('#time');
    }
    else if (nameActiveTab[1] == 'short') {
        shortTimer.resetTimer('#time_short');
    }
    else {
        longTimer.resetTimer('#time_long');
    }
})
