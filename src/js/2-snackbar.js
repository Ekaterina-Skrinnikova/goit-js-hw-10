import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const radioBtn = document.querySelector('input[type="radio"]');
const inputDelay = document.querySelector('input[name="delay"]');
const formEl = document.querySelector('.form');
const btnEl = document.querySelector('button');
const stepUp = document.querySelector('.step-up');
const stepDown = document.querySelector('.step-down');

// реалізація дії при натисканні кнопки
formEl.addEventListener('submit', e => {
  e.preventDefault();

  const delay = Number(formEl.delay.value);
  const valueRadioBtn = formEl.state.value;

  const promise = createPromise(valueRadioBtn, delay);

  promise
    .then(delay => {
      iziToast.show({
        message: `✅ Fulfilled promise in ${delay}ms`,
        messageColor: 'white',
        messageSize: '20',
        backgroundColor: '#59A10D',
        theme: 'light',
        position: 'topRight',
        close: true,
        closeOnEscape: true,
        closeOnClick: true,
      });
    })
    .catch(delay => {
      iziToast.show({
        message: `❌ Rejected promise in ${delay}ms`,
        messageColor: 'white',
        messageSize: '20',
        backgroundColor: '#EF4040',
        theme: 'light',
        position: 'topRight',
        close: true,
        closeOnEscape: true,
        closeOnClick: true,
      });
    });

  formEl.reset();
});

// створення проміса
function createPromise(valueBtn, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (valueBtn === 'fulfilled') {
        resolve(delay);
      }
      reject(delay);
    }, delay);
  });
}

// кнопки для input[type="number"]
formEl.addEventListener('click', e => {
  if (
    e.target.classList.value === 'step-up' ||
    e.target.classList.value === 'step-up-use'
  ) {
    inputDelay.stepUp();
    stepUp.classList.add('active');
    stepDown.classList.remove('active');
  }
});

formEl.addEventListener('click', e => {
  if (
    e.target.classList.value === 'step-down' ||
    e.target.classList.value === 'step-down-use'
  ) {
    inputDelay.stepDown();
    stepDown.classList.add('active');
    stepUp.classList.remove('active');
  }
});
