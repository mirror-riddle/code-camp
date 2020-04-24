import { addEventListeners } from './listeners.js';
import { sendCorsCookies } from './cors-cookies.js';
import { useAbortablePromise } from './abort-signal.js';

addEventListeners();
sendCorsCookies();

console.time('promise-timelog');

const { promise, controller } = useAbortablePromise((resolve, reject) => {
  setTimeout(() => {
    resolve('time up');
  }, 2000);
});

// console.timeLog('promise-timelog', 'aborted before promise is created...');
// controller.abort();

promise
  .then((value) => {
    console.timeLog('promise-timelog', value);
  })
  .catch((error) => {
    console.error('error catched:', error);
  });

setTimeout(() => {
  console.timeLog('promise-timelog', 'aborted when promise is working...');
  controller.abort();
}, 3000);
