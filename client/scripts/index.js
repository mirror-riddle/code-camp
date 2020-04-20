import { addEventListeners } from './listeners.js';

addEventListeners();

const xhr = new XMLHttpRequest();
xhr.open('GET', `http://localhost:4001/cors-cookies?cookies=${document.cookie}`, true);
xhr.withCredentials = true;
xhr.onload = () => {
  console.log(xhr.response);
};
xhr.send();
