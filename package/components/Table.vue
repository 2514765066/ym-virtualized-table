<template>
  <table class="ym-table-content">
    <thead>
      <tr>
        <th style="z-index: 2"></th>
        <th
          v-for="(_, index) of renderData[0]?.length"
          :key="colStartIndex + index"
          :class="{ active: position.col == index }"
        >
          {{ numberToCol(colStartIndex + index + 1) }}
        </th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(row, index) of renderData" :key="rowStartIndex + index + 1">
        <th :class="{ active: position.row == index }">
          {{ rowStartIndex + index + 1 }}
        </th>

        <td
          v-for="(item, index1) of row"
          :key="colStartIndex + index1"
          :class="{ active: position.row == index && position.col == index1 }"
          @mouseover="handleOver(index, index1)"
        >
          {{ item }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { computed, inject, ref } from "vue";
import { rowStartIndex, colStartIndex } from "../hooks/useTable";
import { numberToCol } from "../utils/col";
import { configKey } from "../hooks/useInjectKey";
import { createArray } from "../utils/array";

const props = defineProps<{
  data: any[][];
  rowMaxCount: number;
  colMaxCount: number;
}>();

//传递过来的配置项
const config = inject(configKey)!;

//鼠标悬浮的单元格坐标
const position = ref({
  row: 0,
  col: 0,
});

//补全后的数据
const renderData = computed(() => {
  if (
    props.rowMaxCount <= props.data.length &&
    props.colMaxCount <= props.data[0]?.length
  ) {
    return props.data;
  }

  const res = createArray(props.rowMaxCount, props.colMaxCount);

  for (let i = 0; i < props.data.length; i++) {
    const row = props.data[i];

    res[i] = [...row, ...res[i].slice(row.length)];
  }

  return res;
});

//处理鼠标悬浮
const handleOver = (row: number, col: number) => {
  position.value = {
    row,
    col,
  };
};
</script>

<style scoped lang="scss">
.ym-table-content {
  position: sticky;
  top: 0;
  left: 0;
  border-spacing: 1.5px 1px;
  color: v-bind("config.cellColor");
  font-size: 14px;

  th,
  td {
    height: calc(v-bind("config.cellHeight") * 1px);
    font-weight: initial;
  }

  th {
    min-width: calc(v-bind("config.cellWidth") * 1px);

    position: sticky;
    top: 0;
    left: 0;

    color: v-bind("config.headerColor");
    background-color: v-bind("config.headerBgColor");

    &:first-child {
      min-width: calc(v-bind("config.serialWidth") * 1px);
    }
  }

  td {
    padding: 0 5px;
    background-color: v-bind("config.cellBgColor");
  }

  > tbody {
    th {
      border-left: none;
    }
  }

  .active {
    background-color: v-bind("config.hoverBgColor");
  }
}
</style>
