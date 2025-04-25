<template>
  <table class="ym-table-content">
    <thead>
      <tr>
        <th style="z-index: 2"></th>
        <th
          v-for="(_, index) of renderData[0]?.length"
          :key="index"
          :class="{ active: position.col == index }"
        >
          {{ numberToCol(index + 1) }}
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
          @click="handleClick(index, index1)"
          :title="item"
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
import { containerWidth } from "../hooks/useTable";

const props = defineProps<{
  data: any[][];
  rowMaxCount: number;
  colMaxCount: number;
}>();

//传递过来的配置项
const config = inject(configKey)!;

//鼠标悬浮的单元格坐标
const position = ref({
  row: -1,
  col: -1,
});

//补全后的数据
const renderData = computed(() => {
  const res = createArray(props.rowMaxCount, props.colMaxCount);

  for (let i = 0; i < props.data.length; i++) {
    const row = props.data[i];

    res[i] = [...row, ...res[i].slice(row.length)];
  }

  return res;
});

//处理鼠标悬浮
const handleClick = (row: number, col: number) => {
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
  border-collapse: separate;
  border-spacing: 1px;
  font-size: 14px;
  color: v-bind("config.cellColor");
  background-color: v-bind("config.borderColor");

  th,
  td {
    height: calc(v-bind("config.cellHeight") * 1px);
    font-weight: unset;
  }

  th {
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
    min-width: calc(v-bind("config.cellWidth") * 1px);
    max-width: calc(v-bind("containerWidth / 3") * 1px);

    background-color: v-bind("config.cellBgColor");
    padding: 0 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  > tbody {
    th {
      border-left: none;
    }
  }

  .active {
    background-color: v-bind("config.selectBgColor");
  }
}
</style>
