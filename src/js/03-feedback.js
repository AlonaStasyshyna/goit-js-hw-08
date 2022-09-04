import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');
const emailInput = document.querySelector('input[name="email"]');
const messageTextarea = document.querySelector('textarea[name="message"]');

const ENTEREDDATA_KEY = 'feedback-form-state';
const enteredData = {};

updatePage();

feedbackForm.addEventListener('input', throttle(onInput, 500));
feedbackForm.addEventListener('submit', onFormSubmit);

function onInput(event) {
  const value = event.target.value;

  if (event.target === emailInput) {
    enteredData.email = value;
  }
  if (event.target === messageTextarea) {
    enteredData.message = value;
  }

  localStorage.setItem(ENTEREDDATA_KEY, JSON.stringify(enteredData));
}

function onFormSubmit(event) {
  event.preventDefault();

  console.log(enteredData);

  event.currentTarget.reset();
  localStorage.removeItem(ENTEREDDATA_KEY);
  enteredData.email = '';
  enteredData.message = '';
}

function updatePage() {
  const savedData = localStorage.getItem(ENTEREDDATA_KEY);

  if (savedData) {
    const { email, message } = JSON.parse(savedData);
    emailInput.value = email;
    messageTextarea.value = message;
  }
}
