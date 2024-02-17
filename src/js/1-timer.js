import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import convertMs from './convertDate';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const inputEl = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const valueDays = document.querySelector('span[data-days]');
const valueHours = document.querySelector('span[data-hours]');
const valueMinutes = document.querySelector('span[data-minutes]');
const valueSeconds = document.querySelector('span[data-seconds]');

let deltaDate = 0;
let intervalId = null;

startBtn.setAttribute('disabled', true);

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    startDeltaDate(selectedDates[0]);
  },
});

startBtn.addEventListener('click', onBtnClick);

function onBtnClick() {
  const intervalId = setInterval(() => {
    startBtn.setAttribute('disabled', true);
    inputEl.setAttribute('disabled', true);

    deltaDate -= 1000;

    if (deltaDate <= 0) {
      clearInterval(intervalId);
      startBtn.removeAttribute('disabled');
      inputEl.removeAttribute('disabled');
      return;
    } else {
      updateClockFace(convertMs(deltaDate));
    }
  }, 1000);
}

function startDeltaDate(selectedDate) {
  const currentDate = Date.now();

  if (selectedDate < currentDate) {
    startBtn.setAttribute('disabled', true);
    return iziToast.error({
      message: 'Please choose a date in the future',
      messageColor: '',
      messageSize: '25',
      backgroundColor: '#EF4040',
      balloon: true,
      theme: 'light',
      close: true,
      closeOnEscape: true,
      closeOnClick: true,
      overlay: true,
      overlayClose: true,
    });
  }

  deltaDate = selectedDate.getTime() - currentDate;
  updateClockFace(convertMs(deltaDate));
  startBtn.removeAttribute('disabled');
}

function updateClockFace(components) {
  valueDays.textContent = components.days;
  valueHours.textContent = components.hours;
  valueMinutes.textContent = components.minutes;
  valueSeconds.textContent = components.seconds;
}
