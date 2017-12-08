/**
 *  This class handles Timer functionality 
 * @export
 * @class Timer
 */
export default class Timer {
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