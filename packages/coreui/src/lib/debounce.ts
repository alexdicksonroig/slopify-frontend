const Debounce = <Args extends unknown[]>(
  callback: (...args: Args) => void,
  delay = 500,
) => {
  let timeout: ReturnType<typeof setTimeout>;

  return (...args: Args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => callback(...args), delay);
  };
};

export default Debounce;
