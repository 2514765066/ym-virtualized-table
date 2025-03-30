export const throttle = (fn: Function) => {
  let enable = true;
  return function (...args: any[]) {
    if (enable) {
      enable = false;

      requestAnimationFrame(() => {
        //@ts-ignore
        fn.apply(this, args);
      });

      enable = true;
    }
  };
};
