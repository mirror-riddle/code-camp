import { addEventListeners } from './listeners.js';

addEventListeners();

const xhr = new XMLHttpRequest();
xhr.onreadystatechange = () => {
  switch (xhr.readyState) {
    case xhr.OPENED: {
      xhr.withCredentials = true;
      xhr.setRequestHeader('Authorization', '12345');
      break;
    }
    case xhr.HEADERS_RECEIVED: {
      const headers = xhr.getAllResponseHeaders();
      // console.log(headers);
      break;
    }
    case xhr.DONE: {
      // console.log(xhr.response);
      break;
    }
    default: {
      // pass
    }
  }
};
xhr.open(
  'GET',
  `http://localhost:4001/cors-cookies?cookies=${document.cookie}`,
  true
);
xhr.send();
