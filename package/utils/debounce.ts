export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number = 300
): ((...args: Parameters<T>) => void) => {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timer) {
      clearTimeout(timer); // 清除上一次的定时器
    }

    timer = setTimeout(() => {
      func(...args); // 延迟后执行
    }, delay);
  };
};
