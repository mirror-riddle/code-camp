export const startObserver = () => {
  const mutationObserver = new MutationObserver((records, observer) => {
    console.log(records, observer);
  });

  const inputName = document.querySelector('#input-name');

  mutationObserver.observe(inputName, {
    attributes: true,
    attributeOldValue: true,
    characterData: true,
    characterDataOldValue: true,
  });
};
