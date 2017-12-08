const normalTimerStart = (normalTimer, display) => {
  console.log('normalCalled')
  normalTimer.startTimer(display);
  $('#stop').show();
  $('#start').hide();
}

const normalTimerStop = normalTimer => {
  normalTimer.stopTimer();
  $('#start').show();
  $('#stop').hide();
}

const normalTimerReset = normalTimer => {
  normalTimer.resetTimer('#time');

  $('#start').show();
  $('#stop').hide();
}

export {
  normalTimerStart,
  normalTimerStop,
  normalTimerReset
}