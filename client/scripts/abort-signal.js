const controller = new AbortController();

const handleAbortSignal = (reject) => {
  const { signal } = controller;
  const rejectWhenAborted = () => {
    reject(new DOMException('Aborted', 'AbortError'));
  };
  if (signal.aborted) {
    rejectWhenAborted();
  }
  signal.onabort = () => {
    rejectWhenAborted();
  };
};

const abortableExecutorDecorator = (executor) => (resolve, reject) => {
  handleAbortSignal(reject);
  executor(resolve, reject);
};

const useAbortablePromise = (executor) => {
  const abortableExecutor = abortableExecutorDecorator(executor);
  const promise = new Promise(abortableExecutor);
  return { promise, controller };
};

export const testAbortSignal = () => {
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
};
