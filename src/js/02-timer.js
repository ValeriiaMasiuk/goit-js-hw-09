import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
  timeDays: document.querySelector('[data-days]'),
  timeHours: document.querySelector('[data-hours]'),
  timeMinutes: document.querySelector('[data-minutes]'),
  timeSeconds: document.querySelector('[data-seconds]'),
}

const startBtn = document.querySelector('[data-start]');
startBtn.disabled = true;

let targetTime = null;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const timeToEnd = selectedDates[0].getTime() - defaultDate;

    // console.log(timeToEnd)

    if (timeToEnd < 0) {
      Notiflix.Notify.warning('Please choose a date in the future');
    } else {
      targetTime = selectedDates[0].getTime();
      startBtn.disabled = false;
    }
  },
};

const { enableTime, time_24hr, defaultDate, minuteIncrement } = options;

flatpickr('#datetime-picker', options);

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

function pad(value) {
  return String(value).padStart(2, '0')
}

function addLeadingZero({ days, hours, minutes, seconds }) {
  refs.timeDays.textContent = pad(days);
  refs.timeHours.textContent = pad(hours);
  refs.timeMinutes.textContent = pad(minutes);
  refs.timeSeconds.textContent = pad(seconds);
}

startBtn.addEventListener('click', onStartBtnAction)

function onStartBtnAction(evt) {
  let deadline = (targetTime - defaultDate)

  timerId = setInterval(() => {
    addLeadingZero(convertMs(deadline))
    deadline -= 1000;
    
      if (deadline <= 0) {
    clearInterval(timerId);
    Notiflix.Notify.success('Time is over!');
  }
  }, 1000)
}