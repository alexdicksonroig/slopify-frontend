type ThrottledCallback<Args extends unknown[]> = ((...args: Args) => void) & {
  cancel: () => void;
};

const Throttle = <Args extends unknown[]>(
  callback: (...args: Args) => void,
  delay = 500,
): ThrottledCallback<Args> => {
  let shouldWait = false;
  let waitingArgs: Args | undefined;
  let timeout: ReturnType<typeof setTimeout> | undefined;

  const timeoutFunction = () => {
    if (!waitingArgs) {
      shouldWait = false;
      return;
    }

    callback(...waitingArgs);
    waitingArgs = undefined;
    timeout = setTimeout(timeoutFunction, delay);
  };

  const throttledCallback = (...args: Args) => {
    if (shouldWait) {
      waitingArgs = args;
      return;
    }

    callback(...args);
    shouldWait = true;
    timeout = setTimeout(timeoutFunction, delay);
  };

  throttledCallback.cancel = () => clearTimeout(timeout);

  return throttledCallback;
};

export default Throttle;
