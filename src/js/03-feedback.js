import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = document.querySelector('[name="email"]');
const messageInput = document.querySelector('[name="message"]');
const STORAGE_KEY = 'feedback-form-state';

const saveStateToLocalStorage = throttle(() => {
  const state = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}, 500);

const savedState = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
emailInput.value = savedState.email || '';
messageInput.value = savedState.message || '';

const submitForm = () => {
  const state = {
    email: emailInput.value,
    message: messageInput.value,
  };
  console.log(state);
  localStorage.removeItem(STORAGE_KEY);
  emailInput.value = '';
  messageInput.value = '';
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (emailInput.value.trim() && messageInput.value.trim()) {
    submitForm();
  } else {
    alert('Будь ласка, заповніть обидва поля перед відправкою.');
  }
});

emailInput.addEventListener('input', saveStateToLocalStorage);
messageInput.addEventListener('input', saveStateToLocalStorage);
