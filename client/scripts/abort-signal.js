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

export const useAbortablePromise = (executor) => {
  const abortableExecutor = abortableExecutorDecorator(executor);
  const promise = new Promise(abortableExecutor);
  return { promise, controller };
};
