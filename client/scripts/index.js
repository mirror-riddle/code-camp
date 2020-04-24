import { addEventListeners } from './listeners.js';
import { sendCorsCookies } from './cors-cookies.js';
import { testAbortSignal } from './abort-signal.js';
import { startObserver } from './mutation-observer.js';

addEventListeners();
sendCorsCookies();
testAbortSignal();
startObserver();
