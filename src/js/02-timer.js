import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

class Countdown {
  #intervalId = null;
  #onChangeCallback = () => {};
  constructor({ onChange } = {}) {
    if (onChange) {
      this.#onChangeCallback = onChange;
    }
  }
  #calculateData() {
    const delta = choseDate - Date.now();
    if (delta > 0) {
      const { days, hours, minutes, seconds } = convertMs(delta);
      this.#onChangeCallback({
        days: Countdown.addLeadingZero(days),
        hours: Countdown.addLeadingZero(hours),
        minutes: Countdown.addLeadingZero(minutes),
        seconds: Countdown.addLeadingZero(seconds),
      });
      //   console.log(delta);
      //   console.log('текущая дата', Date.now());
      //  console.log(convertMs(delta));
      // convertMs(delta);
    } else {
      this.stop();
    }
  }
  start(choseDate) {
    // console.log('выбранная дата', choseDate);
    this.#calculateData(choseDate);
    this.#intervalId = setInterval(() => this.#calculateData(choseDate), 1000);
  }

  stop() {
    clearInterval(this.#intervalId);
  }
  #convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  }

  static addLeadingZero(value) {
    return value.toString().padStart(2, '0');
  }
}
const countdown = new Countdown({ onChange: onCountdownChange });

const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
let choseDate = 0;

disabledStartBtn();

// console.log(date);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = new Date().getTime();
    if (Number(selectedDates[0]) < currentDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      activeStartBtn();
      choseDate = Number(selectedDates[0]);
      // stop()
      //   console.log(Number(selectedDates[0]));
    }
  },
};

flatpickr('#datetime-picker', options);

refs.startBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
  disabledStartBtn();

  refs.input.disabled = true;

  countdown.start(choseDate);
}

function activeStartBtn() {
  refs.startBtn.removeAttribute('disabled');
}

function disabledStartBtn() {
  refs.startBtn.setAttribute('disabled', '');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function onCountdownChange({ days, hours, minutes, seconds }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
}

/*
    enableTime - Включает выбор времени
    time_24hr - Отображает средство выбора времени в 24-часовом режиме
без выбора AM/PM, если включено.
  defaultDate: new Date() - Устанавливает начальную выбранную дату (даты).
  minuteIncrement - Регулирует шаг ввода минут (включая прокрутку)
*/
// console.log('1', new Date().getTime());
// console.log('2', Date.now());
