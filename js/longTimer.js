const longTimerStart = (longTimer, display_long) => {
  longTimer.startTimer(display_long);
  $('#long_stop').show();
  $('#long_start').hide();
}

const longTimerStop = longTimer => {
  longTimer.stopTimer();
  $('#long_start').show();
  $('#long_stop').hide();
}

const longTimerReset = longTimer => {
  longTimer.resetTimer('#time_long');
  $('#long_start').show();
  $('#long_stop').hide();
}

export {
  longTimerStart,
  longTimerStop,
  longTimerReset
}