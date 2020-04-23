export const addEventListeners = () => {
  const modalView = document.querySelector('.modal-view');

  const hideModal = document.querySelector('.hide-modal');
  hideModal.addEventListener(
    'click',
    (event) => {
      modalView.classList.remove(['visible']);
    },
    false
  );

  const showModal = document.querySelector('.show-modal');
  showModal.addEventListener(
    'click',
    (event) => {
      modalView.classList.add(['visible']);
    },
    false
  );

  const viewContainer = document.querySelector('.view-container');
  const toggleView = document.querySelector('.toggle-view');

  const onViewChange = (event) => {
    viewContainer.classList.toggle('view-change');
  };

  toggleView.addEventListener('click', onViewChange, false);

  const uploadForm = document.querySelector('#upload-form');

  uploadForm.addEventListener('submit', (event) => {
    event.preventDefault();
    new FormData(uploadForm);
  });

  uploadForm.addEventListener('formdata', (event) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === xhr.DONE) {
        console.log(xhr.response);
      }
    };
    xhr.open('POST', '/upload', true);
    xhr.send(event.formData);
  });
};
