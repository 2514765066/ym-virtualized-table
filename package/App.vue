<template>
  <section class="ym-table" ref="containerRef" @scroll="handleScroll">
    <div>
      <Table
        :data="renderData"
        :rowMaxCount="rowMaxCount"
        :colMaxCount="colMaxCount"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import Table from "./components/Table.vue";
import { computed, provide, ref } from "vue";
import { throttle } from "./utils/throttle";
import { useEvent } from "./hooks/useEvent";
import {
  rowStartIndex,
  colStartIndex,
  containerHeight,
  containerWidth,
} from "./hooks/useTable";
import { configKey } from "./hooks/useInjectKey";
import { formatUnit } from "./utils/unit";

const props = withDefaults(
  defineProps<{
    data?: any[][];
    width?: string | number;
    height?: string | number;
    cellWidth?: number;
    cellHeight?: number;
    serialWidth?: number;
    cellBgColor?: string;
    cellColor?: string;
    borderColor?: string;
    headerBgColor?: string;
    headerColor?: string;
    hoverBgColor?: string;
  }>(),
  {
    data: () => [[]],
    width: "100%",
    height: "100%",
    cellWidth: 100,
    cellHeight: 25,
    serialWidth: 60,
    cellBgColor: "#fff",
    cellColor: "#272727",
    borderColor: "#F0F0F0",
    headerBgColor: "#F6F7F9",
    headerColor: "#616161",
    hoverBgColor: "#E9EFF9",
  }
);

provide(configKey, {
  cellWidth: props.cellWidth,
  cellHeight: props.cellHeight,
  serialWidth: props.serialWidth,
  cellBgColor: props.cellBgColor,
  cellColor: props.cellColor,
  borderColor: props.borderColor,
  headerBgColor: props.headerBgColor,
  headerColor: props.headerColor,
  hoverBgColor: props.hoverBgColor,
});

//容器
const containerRef = ref<HTMLElement>();

useEvent(containerRef);

//计算渲染的最大行数
const rowMaxCount = computed(() => {
  return Math.ceil(
    (containerHeight.value - props.cellHeight) / props.cellHeight
  );
});

//计算结尾索引
const rowEndIndex = computed(() => {
  const end = rowStartIndex.value + rowMaxCount.value;

  return props.data[end] ? end : props.data.length;
});

//计算渲染的最大列数
const colMaxCount = computed(() => {
  return Math.ceil(
    (containerWidth.value - props.serialWidth) / props.cellWidth
  );
});

//计算结尾索引
const colEndIndex = computed(() => {
  const end = colStartIndex.value + colMaxCount.value;

  return props.data[0][end] ? end : props.data[0].length;
});

//实际宽度
const width = computed(() => {
  return props.data[0].length * props.cellWidth + props.serialWidth;
});

//实际高度
const height = computed(() => {
  return (props.data.length + 1) * props.cellHeight;
});

//计算渲染的数据
const renderData = computed(() => {
  const res = props.data.slice(rowStartIndex.value, rowEndIndex.value);

  for (let i = 0; i < res.length; i++) {
    const row = res[i];
    res[i] = row.slice(colStartIndex.value, colEndIndex.value);
  }

  return res;
});

//处理滚动
const handleScroll = throttle(() => {
  if (!containerRef.value) {
    return;
  }

  const { scrollTop, scrollLeft } = containerRef.value;

  rowStartIndex.value = Math.floor(scrollTop / props.cellHeight);
  colStartIndex.value = Math.floor(scrollLeft / props.cellWidth);
});
</script>

<style scoped lang="scss">
.ym-table {
  width: v-bind("formatUnit($props.width)");
  height: v-bind("formatUnit($props.height)");
  position: relative;
  background-color: v-bind("borderColor");
  overflow: auto;

  > div {
    width: calc(v-bind("width") * 1px);
    height: calc(v-bind("height") * 1px);
  }

  * {
    background-color: transparent;
  }
}
</style>
