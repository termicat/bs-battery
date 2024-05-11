import type { Node, Scheme } from "@/components/config-ui/types";

const theme = {
  light: [
    {
      label: [
        "var(--ccm-chart-B400)",
        "var(--ccm-chart-W400)",
        "var(--ccm-chart-P400)",
        "var(--ccm-chart-Y400)",
        "var(--ccm-chart-R400)",
        "var(--ccm-chart-O400)",
      ],
      value: "p1",
    },
    {
      label: [
        "var(--ccm-chart-B400)",
        "var(--ccm-chart-W400)",
        "var(--ccm-chart-T400)",
        "var(--ccm-chart-G400)",
        "var(--ccm-chart-L400)",
        "var(--ccm-chart-Y400)",
      ],
      value: "p2",
    },
    {
      label: [
        "var(--ccm-chart-B500)",
        "var(--ccm-chart-O500)",
        "var(--ccm-chart-W500)",
        "var(--ccm-chart-Y500)",
        "var(--ccm-chart-G500)",
        "var(--ccm-chart-N500)",
      ],
      value: "p3",
    },
    {
      label: [
        "rgb(83,131,241)",
        "rgb(235,107,103)",
        "rgb(187,191,196)",
        "rgb(58,92,169)",
        "rgb(165,75,72)",
        "rgb(31,215,191)",
      ],
      value: "p4",
    },
    {
      label: [
        "var(--ccm-chart-B400)",
        "var(--ccm-chart-R400)",
        "var(--ccm-chart-N400)",
        "var(--ccm-chart-I400)",
        "var(--ccm-chart-C400)",
        "var(--ccm-chart-P400)",
      ],
      value: "p5",
    },
    {
      label: [
        "var(--ccm-chart-B200)",
        "var(--ccm-chart-W200)",
        "var(--ccm-chart-T200)",
        "var(--ccm-chart-G200)",
        "var(--ccm-chart-L200)",
        "var(--ccm-chart-Y200)",
      ],
      value: "p6",
    },
    {
      label: [
        "var(--ccmtoken-chart-aurora-t500)",
        "var(--ccmtoken-chart-aurora-t400)",
        "var(--ccmtoken-chart-aurora-b400)",
        "var(--ccmtoken-chart-aurora-p300)",
        "var(--ccmtoken-chart-aurora-p400)",
        "var(--ccmtoken-chart-aurora-p200)",
      ],
      value: "p7",
    },
    {
      label: [
        "var(--ccmtoken-chart-aurora-w400)",
        "var(--ccmtoken-chart-aurora-b300)",
        "var(--ccmtoken-chart-aurora-b500)",
        "var(--ccmtoken-chart-aurora-c200)",
        "var(--ccmtoken-chart-aurora-c300)",
        "var(--ccmtoken-chart-aurora-c400)",
      ],
      value: "p8",
    },
    {
      label: [
        "rgb(15,87,255)",
        "rgb(43,107,255)",
        "rgb(71,126,255)",
        "rgb(99,146,255)",
        "rgb(128,166,255)",
        "rgb(184,205,255)",
      ],
      value: "p9",
    },
    {
      label: [
        "rgb(20,192,255)",
        "rgb(48,200,255)",
        "rgb(75,207,255)",
        "rgb(102,214,255)",
        "rgb(129,221,255)",
        "rgb(184,236,255)",
      ],
      value: "p10",
    },
    {
      label: [
        "rgb(52, 199, 35)",
        "rgb(69, 219, 53)",
        "rgb(99, 225, 84)",
        "rgb(128, 231, 116)",
        "rgb(157, 236, 148)",
        "rgb(215, 247, 212)",
      ],
      value: "p11",
    },
    {
      label: [
        "rgb(255,198,10)",
        "rgb(255,203,34)",
        "rgb(255,209,58)",
        "rgb(255,215,82)",
        "rgb(255,220,105)",
        "rgb(255,231,153)",
      ],
      value: "p12",
    },
    {
      label: [
        "rgb(255,136,0)",
        "rgb(255,149,29)",
        "rgb(255,163,58)",
        "rgb(255,176,87)",
        "rgb(255,190,116)",
        "rgb(255,217,173)",
      ],
      value: "p13",
    },
    {
      label: [
        "rgb(255,23,15)",
        "rgb(255,50,43)",
        "rgb(255,78,71)",
        "rgb(255,105,99)",
        "rgb(255,132,128)",
        "rgb(255,186,184)",
      ],
      value: "p14",
    },
    {
      label: [
        "rgb(0,0,0)",
        "rgb(34,34,34)",
        "rgb(68,68,68)",
        "rgb(102,102,102)",
        "rgb(136,136,136)",
        "rgb(204,204,204)",
      ],
      value: "p15",
    },
  ],
  dark: [
    {
      label: [
        "var(--ccm-chart-B400)",
        "var(--ccm-chart-W400)",
        "var(--ccm-chart-P400)",
        "var(--ccm-chart-Y400)",
        "var(--ccm-chart-R400)",
        "var(--ccm-chart-O400)",
      ],
      value: "p1",
    },
    {
      label: [
        "var(--ccm-chart-B400)",
        "var(--ccm-chart-W400)",
        "var(--ccm-chart-T400)",
        "var(--ccm-chart-G400)",
        "var(--ccm-chart-L400)",
        "var(--ccm-chart-Y400)",
      ],
      value: "p2",
    },
    {
      label: [
        "var(--ccm-chart-B500)",
        "var(--ccm-chart-O500)",
        "var(--ccm-chart-W500)",
        "var(--ccm-chart-Y500)",
        "var(--ccm-chart-G500)",
        "var(--ccm-chart-N500)",
      ],
      value: "p3",
    },
    {
      label: [
        "rgb(54, 104, 201)",
        "rgb(196, 77, 73)",
        "rgb(95, 95, 95)",
        "rgb(38, 73, 141)",
        "rgb(137, 54, 51)",
        "rgb(62, 178, 162)",
      ],
      value: "p4",
    },
    {
      label: [
        "var(--ccm-chart-B400)",
        "var(--ccm-chart-R400)",
        "var(--ccm-chart-N400)",
        "var(--ccm-chart-I400)",
        "var(--ccm-chart-C400)",
        "var(--ccm-chart-P400)",
      ],
      value: "p5",
    },
    {
      label: [
        "var(--ccm-chart-B200)",
        "var(--ccm-chart-W200)",
        "var(--ccm-chart-T200)",
        "var(--ccm-chart-G200)",
        "var(--ccm-chart-L200)",
        "var(--ccm-chart-Y200)",
      ],
      value: "p6",
    },
    {
      label: [
        "var(--ccmtoken-chart-aurora-t500)",
        "var(--ccmtoken-chart-aurora-t400)",
        "var(--ccmtoken-chart-aurora-b400)",
        "var(--ccmtoken-chart-aurora-p300)",
        "var(--ccmtoken-chart-aurora-p400)",
        "var(--ccmtoken-chart-aurora-p200)",
      ],
      value: "p7",
    },
    {
      label: [
        "var(--ccmtoken-chart-aurora-w400)",
        "var(--ccmtoken-chart-aurora-b300)",
        "var(--ccmtoken-chart-aurora-b500)",
        "var(--ccmtoken-chart-aurora-c200)",
        "var(--ccmtoken-chart-aurora-c300)",
        "var(--ccmtoken-chart-aurora-c400)",
      ],
      value: "p8",
    },
    {
      label: [
        "rgb(15,87,255)",
        "rgb(43,107,255)",
        "rgb(71,126,255)",
        "rgb(99,146,255)",
        "rgb(128,166,255)",
        "rgb(184,205,255)",
      ],
      value: "p9",
    },
    {
      label: [
        "rgb(20,192,255)",
        "rgb(48,200,255)",
        "rgb(75,207,255)",
        "rgb(102,214,255)",
        "rgb(129,221,255)",
        "rgb(184,236,255)",
      ],
      value: "p10",
    },
    {
      label: [
        "rgb(52, 199, 35)",
        "rgb(69, 219, 53)",
        "rgb(99, 225, 84)",
        "rgb(128, 231, 116)",
        "rgb(157, 236, 148)",
        "rgb(215, 247, 212)",
      ],
      value: "p11",
    },
    {
      label: [
        "rgb(255,198,10)",
        "rgb(255,203,34)",
        "rgb(255,209,58)",
        "rgb(255,215,82)",
        "rgb(255,220,105)",
        "rgb(255,231,153)",
      ],
      value: "p12",
    },
    {
      label: [
        "rgb(255,136,0)",
        "rgb(255,149,29)",
        "rgb(255,163,58)",
        "rgb(255,176,87)",
        "rgb(255,190,116)",
        "rgb(255,217,173)",
      ],
      value: "p13",
    },
    {
      label: [
        "rgb(255,23,15)",
        "rgb(255,50,43)",
        "rgb(255,78,71)",
        "rgb(255,105,99)",
        "rgb(255,132,128)",
        "rgb(255,186,184)",
      ],
      value: "p14",
    },
    {
      label: [
        "rgb(0,0,0)",
        "rgb(34,34,34)",
        "rgb(68,68,68)",
        "rgb(102,102,102)",
        "rgb(136,136,136)",
        "rgb(204,204,204)",
      ],
      value: "p15",
    },
  ],
};

export const scheme: Scheme = {
  field: "",
  type: "object",
  properties: [
    {
      field: "selectTable",
      label: "数据源",
      type: "select-table",
      default: "",
      // tip: "这是一个标题",
    },
    // {
    //   field: "range",
    //   label: "数据范围",
    //   type: "select-table",
    //   default: "",
    //   // tip: "这是一个标题",
    // },
    {
      field: "selectView",
      label: "数据范围",
      type: "select-view",
      default: "",
      // tip: "这是一个标题",
    },
    {
      field: "selectTheme",
      label: "主题色",
      type: "select-theme",
      // default: "",
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
      field: "dataOptions",
      type: "select-tabs",
      options: [
        {
          label: "以字段为类别，以记录聚合为系列",
          key: "fieldCategory",
          value: [
            {
              label: "类别",
              field: "cate",
              type: "select-field",
              default: "field2",
              options: [
                {
                  label: "字段1",
                  value: "field1",
                },
                {
                  label: "字段2",
                  value: "field2",
                },
                {
                  label: "字段3",
                  value: "field3",
                },
                {
                  label: "字段4",
                  value: "field4",
                },
                {
                  label: "字段5",
                  value: "field5",
                },
              ],
            },
            {
              portal: "#cate-right",
              label: "计算方式",
              field: "calc",
              type: "down-select",
              options: [
                {
                  label: "最大值",
                  value: "max",
                },
                {
                  label: "最小值",
                  value: "min",
                },
                {
                  label: "求和",
                  value: "sum",
                },
                {
                  label: "平均值",
                  value: "avg",
                },
              ],
              default: "max",
            },
            // {
            //   label: "系列",
            //   field: "series",
            //   type: "object",
            //   properties: [
            //     {
            //       label: "计算方式",
            //       field: "calc",
            //       type: "down-select",
            //       style: "float: right; width: 200px;",
            //       options: [
            //         {
            //           label: "最大值",
            //           value: "max",
            //         },
            //         {
            //           label: "最小值",
            //           value: "min",
            //         },
            //         {
            //           label: "求和",
            //           value: "sum",
            //         },
            //         {
            //           label: "平均值",
            //           value: "avg",
            //         },
            //       ],
            //       default: "max",
            //     },
            //     {
            //       label: "字段",
            //       field: "field",
            //       type: "select-field",
            //     },
            //   ],
            // },
          ],
        },
        {
          label: "以记录聚合为类别，以字段为系列",
          key: "recordCategory",
          value: [
            {
              label: "类别",
              field: "cate",
              type: "field-list",
              options: [
                {
                  label: "字段1",
                  value: "field1",
                },
                {
                  label: "字段2",
                  value: "field2",
                },
                {
                  label: "字段3",
                  value: "field3",
                },
                {
                  label: "字段4",
                  value: "field4",
                },
                {
                  label: "字段5",
                  value: "field5",
                },
              ],
              default: ["field1"],
            },
            // {
            //   label: "系列",
            //   field: "series",
            //   type: "object",
            //   properties: [
            //     {
            //       label: "计算方式",
            //       field: "calc",
            //       type: "down-select",
            //       style: "float: right; width: 200px;",
            //       options: [
            //         {
            //           label: "最大值",
            //           value: "max",
            //         },
            //         {
            //           label: "最小值",
            //           value: "min",
            //         },
            //         {
            //           label: "求和",
            //           value: "sum",
            //         },
            //         {
            //           label: "平均值",
            //           value: "avg",
            //         },
            //       ],
            //       default: "max",
            //     },
            //     {
            //       label: "字段",
            //       field: "fields",
            //       type: "field-list",
            //       config: {
            //         itemCalcOptions: [
            //           {
            //             label: "最大值",
            //             value: "max",
            //           },
            //           {
            //             label: "最小值",
            //             value: "min",
            //           },
            //           {
            //             label: "求和",
            //             value: "sum",
            //           },
            //           {
            //             label: "平均值",
            //             value: "avg",
            //           },
            //         ],
            //       },
            //     },
            //   ],
            // },
          ],
        },
      ],
      default: "fieldCategory",
    },
  ],
};

// fieldCategory
export const fieldCategory = {
  selectTable: "table1",
  selectView: "view1",
  selectTheme: "p1",
  chartOptions: ["showLegend"],
  dataOptions: {
    key: "fieldCategory",
    value: {
      cate: "field1",
      calc: "max",
      series: {
        field: "field2",
      },
    },
  },
};

// recordCategory
// export const recordCategory = {
//   selectTable: "table1",
//   selectView: "view1",
//   selectTheme: "p2",
//   chartOptions: {
//     showLegend: true,
//     showDataLabel: true,
//   },
//   dataOptions: {
//     recordCategory: {
//       cate: "field1",
//       series: {
//         calc: "max",
//         fields: [
//           {
//             field: "field2",
//             calc: "max",
//           },
//           {
//             field: "field3",
//             calc: "min",
//           },
//         ],
//       },
//     },
//   },
// };
