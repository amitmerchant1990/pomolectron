'use strict';
const shell = require('electron').shell;

var timer, minutes = 25, seconds = 60,
    pomodoroIntervalId, pomodoroTime;

var display = document.querySelector('#time');
var display_short = document.querySelector('#time_short');
var display_long = document.querySelector('#time_long');

$(document).on('click', 'a[href^="http"]', function(event) {
    event.preventDefault();
    shell.openExternal(this.href);
});

$('#start').click(() => {
  if(minutes == 25 && seconds == 60){
    pomodoroTime = minutes * seconds;
  }else{
    pomodoroTime = minutes * 60 + seconds;
  }

  startTimer(pomodoroTime, display);
})

$('#stop').click(() => {
  stopTimer();
});

$('#reset').click(() => {
  minutes = 25;
  seconds = 60;
  display.textContent = "25:00";
  resetTimer();
});

$('#short_start').click(() => {
  if(minutes == 5 && seconds == 60){
    pomodoroTime = minutes * seconds;
  }else{
    pomodoroTime = minutes * 60 + seconds;
  }

  startTimer(pomodoroTime, display_short);
})

$('#short_stop').click(() => {
  stopTimer();
});

$('#short_reset').click(() => {
  minutes = 5;
  seconds = 60;
  display_short.textContent = "05:00";
  resetTimer(display_short);
});

$('#long_start').click(() => {
  if(minutes == 10 && seconds == 60){
    pomodoroTime = minutes * seconds;
  }else{
    pomodoroTime = minutes * 60 + seconds;
  }

  startTimer(pomodoroTime, display_long);
})

$('#long_stop').click(() => {
  stopTimer();
});

$('#long_reset').click(() => {
  minutes = 10;
  seconds = 60;
  display_long.textContent = "10:00";
  resetTimer();
});

function startTimer(duration, display) {
  timer = duration;
  clearInterval(pomodoroIntervalId);
  pomodoroIntervalId = setInterval(function(){
    if (--timer < 0) {
        timer = duration;
    }

    minutes = parseInt(timer/60, 10);
    seconds = parseInt(timer%60, 10);

    minutes = minutes < 10 ? '0'+minutes : minutes;
    seconds = seconds < 10 ? '0'+seconds : seconds;

    display.textContent = minutes+ ":" + seconds;

    if(minutes == 0 && seconds == 0){
      notifyUser();
      stopTimer();
    }
  }, 1000);
}

function stopTimer(){
  clearInterval(pomodoroIntervalId);
}

function resetTimer() {
  clearInterval(pomodoroIntervalId);
}

function closeApp(){
  ipc.send('closeApp', 'close');
}

$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    clearInterval(pomodoroIntervalId);

    let activeTab = e.target.toString();
    let nameActiveTab = activeTab.split('#');

    if(nameActiveTab[1]=='pomodoro'){
      minutes = 25, seconds = 60;
      document.querySelector('#time').textContent = "25:00";
    }else if(nameActiveTab[1]=='short'){
      minutes = 5, seconds = 60;
      document.querySelector('#time_short').textContent = "05:00";
    }else {
      minutes = 10, seconds = 60;
      document.querySelector('#time_long').textContent = "10:00";
    }
 })
