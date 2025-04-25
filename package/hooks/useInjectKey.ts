import type { InjectionKey } from "vue";

export type Config = {
  cellWidth: number;
  cellHeight: number;
  serialWidth: number;
  cellBgColor: string;
  cellColor: string;
  borderColor: string;
  headerBgColor: string;
  headerColor: string;
  selectBgColor: string;
};

export const configKey = Symbol() as InjectionKey<Config>;
