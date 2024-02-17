import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const radioBtn = document.querySelector('input[type="radio"]');
const inputDelay = document.querySelector('input[name="delay"]');
const formEl = document.querySelector('.form');
const btnEl = document.querySelector('button');

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
        close: true,
        closeOnEscape: true,
        closeOnClick: true,
      });
    });

  formEl.reset();
});

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
