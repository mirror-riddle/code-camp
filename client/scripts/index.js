(() => {
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
  const viewList = document.querySelector('.view-list');
  const viewDetail = document.querySelector('.view-detail');

  const onViewChange = (event) => {
    viewContainer.classList.toggle('view-change');
  };

  [viewList, viewDetail].map((view) => {
    view.addEventListener('click', onViewChange, false);
  });

  const clickCall = document.querySelector('.click-call');
  clickCall.addEventListener('click', (event) => {
    event.stopPropagation();
  }, true);
})();
