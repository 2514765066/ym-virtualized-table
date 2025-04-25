import { debounce } from "../utils/debounce";
import { onUnmounted } from "vue";
import { containerWidth, containerHeight } from "./useTable";

export const useEvent = (containerRef: HTMLElement) => {
  const resize = debounce(() => {
    containerWidth.value = containerRef.clientWidth;
    containerHeight.value = containerRef.clientHeight;
  });

  const observer = new ResizeObserver(resize);

  observer.observe(containerRef);

  onUnmounted(() => {
    observer.disconnect();
  });
};
