# ym-virtualized-table 库说明

一个简单的 vue3 展示表格数据的虚拟表格

# 使用

安装

```bash
//使用npm安装
npm i ym-virtualized-table@latest

//使用pnpm安装
pnpm i ym-virtualized-table@latest
```

导入

```ts
import { YmVirtualizedTable } from "ym-virtualized-table";
```

# 配置项

组件参数

```ts
{
    //展示数据必须是二维数组
    data?: any[][];

    //表格宽度支持100%，100px，100，calc()
    width?: string | number;

    //表格高度支持100%，100px，100，calc()
    height?: string | number;

    //单元格宽度
    cellWidth?: number;

    //单元格高度
    cellHeight?: number;

    //序号宽度
    serialWidth?: number;

    //单元格背景色
    cellBgColor?: string;

    //单元格字体颜色
    color?: string;

    //单元格之间的距离颜色
    borderColor?: string;

    //序号和列名背景颜色
    headerBgColor?: string;
    
    //序号和列名字体颜色
    headerColor?: string;
    
    //鼠标悬浮在单元格上的颜色
    hoverBgColor?: string;
}
```

默认值

```ts
{
    data: [[]],
    width: "100%",
    height: "100%",
    cellWidth: 100,
    cellHeight: 25,
    serialWidth: 60,
    cellBgColor: "#fff",
    color: "#272727",
    borderColor: "#F0F0F0",
    headerBgColor: "#F6F7F9",
    headerColor: "#616161",
    hoverBgColor: "#E9EFF9",
}
```
