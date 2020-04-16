const modal = document.querySelector('.modal-view');
modal.addEventListener('click', (event) => {
  modal.classList.remove(['visible']);
}, false);
setTimeout(() => {
  modal.classList.add(['visible']);
}, 1000);
