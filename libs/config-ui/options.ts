import type { Node, Scheme } from "./types";
import { theme } from "@bc/config";

export const createScheme = (mapType: "fieldCategory" | "recordCategory") => {
  const mapOptions = [
    {
      label: "以字段为类别，以记录聚合为系列",
      key: "fieldCategory",
      value: [
        {
          label: "类别",
          field: "cates",
          type: "field-list",
          options: {
            list: [],
            // list: [
            //   {
            //     label: "字段1",
            //     value: "field1",
            //     select: "max",
            //   },
            //   {
            //     label: "字段2",
            //     value: "field2",
            //     select: "max",
            //   },
            //   {
            //     label: "字段3",
            //     value: "field3",
            //     select: "max",
            //   },
            //   {
            //     label: "字段4",
            //     value: "field4",
            //     select: "max",
            //   },
            //   {
            //     label: "字段5",
            //     value: "field5",
            //     select: "max",
            //   },
            // ],
          },
          default: [
            // {
            //   value: "field1",
            //   select: "max",
            // },
          ],
        },
        {
          label: "系列",
          field: "series",
          type: "select",
          options: [],
          // options: [
          //   {
          //     label: "字段1",
          //     value: "field1",
          //   },
          //   {
          //     label: "字段2",
          //     value: "field2",
          //   },
          //   {
          //     label: "字段3",
          //     value: "field3",
          //   },
          //   {
          //     label: "字段4",
          //     value: "field4",
          //   },
          //   {
          //     label: "字段5",
          //     value: "field5",
          //   },
          // ],
          default: [],
        },
        {
          portal: "#series-right",
          label: "计算方式",
          field: "calc",
          type: "down-select",
          options: [
            {
              label: "最大值",
              value: "MAX",
            },
            {
              label: "最小值",
              value: "MIN",
            },
            {
              label: "求和",
              value: "SUM",
            },
            {
              label: "平均值",
              value: "AVERAGE",
            },
          ],
          default: "MAX",
        },
      ],
    },
    {
      label: "以记录聚合为类别，以字段为系列",
      key: "recordCategory",
      value: [
        {
          label: "类别",
          field: "cate",
          type: "select",
          // default: "field2",
          // options: [
          //   {
          //     label: "字段1",
          //     value: "field1",
          //   },
          //   {
          //     label: "字段2",
          //     value: "field2",
          //   },
          //   {
          //     label: "字段3",
          //     value: "field3",
          //   },
          //   {
          //     label: "字段4",
          //     value: "field4",
          //   },
          //   {
          //     label: "字段5",
          //     value: "field5",
          //   },
          // ],
        },
        {
          label: "系列",
          field: "series",
          type: "field-list",
          // options: {
          //   list: [
          //     {
          //       label: "字段1",
          //       value: "field1",
          //       select: "max",
          //     },
          //     {
          //       label: "字段2",
          //       value: "field2",
          //       select: "max",
          //     },
          //     {
          //       label: "字段3",
          //       value: "field3",
          //       select: "max",
          //     },
          //     {
          //       label: "字段4",
          //       value: "field4",
          //       select: "max",
          //     },
          //     {
          //       label: "字段5",
          //       value: "field5",
          //       select: "max",
          //     },
          //   ],
          //   itemSelectOptions: [
          //     {
          //       label: "最大值",
          //       value: "max",
          //     },
          //     {
          //       label: "最小值",
          //       value: "min",
          //     },
          //     {
          //       label: "求和",
          //       value: "sum",
          //     },
          //     {
          //       label: "平均值",
          //       value: "avg",
          //     },
          //   ],
          // },
          // default: [
          //   {
          //     value: "field1",
          //     select: "max",
          //   },
          // ],
        },
      ],
    },
  ];
  return {
    field: "root",
    type: "object",
    properties: [
      {
        field: "tableId",
        label: "数据源",
        type: "select",
        options: [],
        // tip: "这是一个标题",
      },
      {
        field: "dataRange",
        label: "数据范围",
        type: "select",
        options: [],
        // tip: "这是一个标题",
      },
      {
        field: "selectTheme",
        label: "主题色",
        type: "select-theme",
        default: "p1",
        // tip: "这是一个标题",
        options: theme.light,
      },
      {
        label: "图表选项",
        field: "chartOptions",
        type: "checkboxes",
        options: [
          {
            label: "图例",
            value: "showLegend",
          },
          {
            label: "数据标签",
            value: "showDataLabel",
          },
        ],
        default: ["showLegend", "showDataLabel"],
        // tip: "添加一个表格组件",
      },
      {
        field: "",
        type: "line",
      },
      {
        label: "数据映射",
        field: "mapType",
        type: "select",
        options: mapOptions.map((item) => ({
          label: item.label,
          value: item.key,
        })),
        default: "fieldCategory",
      },
      {
        field: "mapOptions",
        // label: "数据映射配置",
        type: "object",
        default: {},
        properties: mapOptions.find((item) => item.key === mapType)?.value,
      },
    ],
  } as Scheme;
};

export const example = {
  tableId: "table1",
  dataRange: "view1",
  selectTheme: "p1",
  chartOptions: ["showLegend"],
  dataOptions: {
    // key: "recordCategory",
    // value: {
    //   cates: [
    //     {
    //       value: "field1",
    //       select: "max",
    //     },
    //   ],
    //   cate: "field1",
    //   calc: "max",
    //   // series: "field1",
    // },
    key: "recordCategory",
    value: {
      cate: "field2",
      series: [
        {
          value: "field1",
          select: "max",
        },
      ],
    },
  },
};
