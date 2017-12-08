const shortTimerStart = (shortTimer ,display_short) => {
  shortTimer.startTimer(display_short);
  $('#short_stop').show();
  $('#short_start').hide();
}

const shortTimerStop = shortTimer => {
  shortTimer.stopTimer();
  $('#short_start').show();
  $('#short_stop').hide();
}

const shortTimerReset = shortTimer => {
  shortTimer.resetTimer('#time_short');
  $('#short_start').show();
  $('#short_stop').hide();
}

export {
  shortTimerStart,
  shortTimerStop,
  shortTimerReset
}
