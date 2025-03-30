import { debounce } from "../utils/debounce";
import { onMounted, onUnmounted } from "vue";
import type { Ref } from "vue";
import { containerWidth, containerHeight } from "./useTable";

export const useEvent = (containerRef: Ref<HTMLElement | undefined>) => {
  const resize = debounce(() => {
    if (!containerRef.value) {
      return;
    }

    containerWidth.value = containerRef.value.clientWidth;
    containerHeight.value = containerRef.value.clientHeight;
  });

  onMounted(() => {
    resize();
    window.addEventListener("resize", resize);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", resize);
  });
};
