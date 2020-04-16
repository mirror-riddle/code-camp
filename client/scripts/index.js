const modalView = document.querySelector('.modal-view');

const hideModal = document.querySelector('.hide-modal');
hideModal.addEventListener('click', (event) => {
  modalView.classList.remove(['visible']);
}, false);

const showModal = document.querySelector('.show-modal');
showModal.addEventListener('click', (event) => {
  modalView.classList.add(['visible']);
}, false);
