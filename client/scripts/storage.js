export const listenStorageEvent = () => {
  document.addEventListener('storage', (event) => {
    console.log('--------', event);
  });

  const setSessionStorageItem = (key, value) => {
    try {
      const oldValue = sessionStorage.getItem(key);
      sessionStorage.setItem(key, value);
      const storageEvent = new StorageEvent('storage', {
        oldValue,
        newValue: value,
        storageArea: sessionStorage,
        key,
        url: document.URL,
      });
      document.dispatchEvent(storageEvent);
    } catch (error) {
      // pass
    }
  };

  setTimeout(() => {
    setSessionStorageItem('name', 'hejin123');
  }, 1000);

  setTimeout(() => {
    // sessionStorage.removeItem('name');
  }, 2000);
};

listenStorageEvent();
