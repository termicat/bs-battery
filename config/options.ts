import type { Node, Scheme } from "@/components/config-ui/types";

const theme = [
  {
    label: [
      "var(--c-B50)",
      "var(--c-B100)",
      "var(--c-B200)",
      "var(--c-B300)",
      "var(--c-B400)",
      "var(--c-B500)",
      "var(--c-B600)",
      "var(--c-B700)",
      "var(--c-B800)",
      "var(--c-B900)",
    ],
    value: "p1",
  },
  {
    label: [
      "var(--c-W50)",
      "var(--c-W100)",
      "var(--c-W200)",
      "var(--c-W300)",
      "var(--c-W400)",
      "var(--c-W500)",
      "var(--c-W600)",
      "var(--c-W700)",
      "var(--c-W800)",
      "var(--c-W900)",
    ],
    value: "p2",
  },
  {
    label: [
      "var(--c-P50)",
      "var(--c-P100)",
      "var(--c-P200)",
      "var(--c-P300)",
      "var(--c-P400)",
      "var(--c-P500)",
      "var(--c-P600)",
      "var(--c-P700)",
      "var(--c-P800)",
      "var(--c-P900)",
    ],
    value: "p3",
  },
  {
    label: [
      "var(--c-Y50)",
      "var(--c-Y100)",
      "var(--c-Y200)",
      "var(--c-Y300)",
      "var(--c-Y400)",
      "var(--c-Y500)",
      "var(--c-Y600)",
      "var(--c-Y700)",
      "var(--c-Y800)",
      "var(--c-Y900)",
    ],
    value: "p4",
  },
  {
    label: [
      "var(--c-R50)",
      "var(--c-R100)",
      "var(--c-R200)",
      "var(--c-R300)",
      "var(--c-R400)",
      "var(--c-R500)",
      "var(--c-R600)",
      "var(--c-R700)",
      "var(--c-R800)",
      "var(--c-R900)",
    ],
    value: "p5",
  },
  {
    label: [
      "var(--c-O50)",
      "var(--c-O100)",
      "var(--c-O200)",
      "var(--c-O300)",
      "var(--c-O400)",
      "var(--c-O500)",
      "var(--c-O600)",
      "var(--c-O700)",
      "var(--c-O800)",
      "var(--c-O900)",
    ],
    value: "p6",
  },
  {
    label: [
      "var(--c-T50)",
      "var(--c-T100)",
      "var(--c-T200)",
      "var(--c-T300)",
      "var(--c-T400)",
      "var(--c-T500)",
      "var(--c-T600)",
      "var(--c-T700)",
      "var(--c-T800)",
      "var(--c-T900)",
    ],
    value: "p7",
  },
  {
    label: [
      "var(--c-G50)",
      "var(--c-G100)",
      "var(--c-G200)",
      "var(--c-G300)",
      "var(--c-G400)",
      "var(--c-G500)",
      "var(--c-G600)",
      "var(--c-G700)",
      "var(--c-G800)",
      "var(--c-G900)",
    ],
    value: "p8",
  },
  {
    label: [
      "var(--c-L50)",
      "var(--c-L100)",
      "var(--c-L200)",
      "var(--c-L300)",
      "var(--c-L400)",
      "var(--c-L500)",
      "var(--c-L600)",
      "var(--c-L700)",
      "var(--c-L800)",
      "var(--c-L900)",
    ],
    value: "p10",
  },
  {
    label: [
      "var(--c-C50)",
      "var(--c-C100)",
      "var(--c-C200)",
      "var(--c-C300)",
      "var(--c-C400)",
      "var(--c-C500)",
      "var(--c-C600)",
      "var(--c-C700)",
      "var(--c-C800)",
      "var(--c-C900)",
    ],
    value: "p11",
  },
  {
    label: [
      "var(--c-V50)",
      "var(--c-V100)",
      "var(--c-V200)",
      "var(--c-V300)",
      "var(--c-V400)",
      "var(--c-V500)",
      "var(--c-V600)",
      "var(--c-V700)",
      "var(--c-V800)",
      "var(--c-V900)",
    ],
    value: "p12",
  },
  {
    label: [
      "var(--c-I50)",
      "var(--c-I100)",
      "var(--c-I200)",
      "var(--c-I300)",
      "var(--c-I400)",
      "var(--c-I500)",
      "var(--c-I600)",
      "var(--c-I700)",
      "var(--c-I800)",
      "var(--c-I900)",
    ],
    value: "p13",
  },
];

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
      options: theme,
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
      default: {
        showLegend: true,
        showDataLabel: true,
      },
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
          value: "fieldCategory",
          properties: [
            {
              label: "类别",
              field: "cate",
              type: "field-list",
            },
            {
              label: "系列",
              field: "series",
              type: "object",
              properties: [
                {
                  label: "计算方式",
                  field: "calc",
                  type: "down-select",
                  style: "float: right; width: 200px;",
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
                {
                  label: "字段",
                  field: "field",
                  type: "select-field",
                },
              ],
            },
          ],
        },
        {
          label: "以记录聚合为类别，以字段为系列",
          value: "recordCategory",
          properties: [
            {
              label: "类别",
              field: "cate",
              type: "select-field",
            },
            {
              label: "系列",
              field: "series",
              type: "object",
              properties: [
                {
                  label: "计算方式",
                  field: "calc",
                  type: "down-select",
                  style: "float: right; width: 200px;",
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
                {
                  label: "字段",
                  field: "fields",
                  type: "field-list",
                  config: {
                    itemCalcOptions: [
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
                  },
                },
              ],
            },
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
  chartOptions: {
    showLegend: true,
    showDataLabel: true,
  },
  dataOptions: {
    fieldCategory: {
      cate: ["field1"],
      series: {
        calc: "max",
        field: "field2",
      },
    },
  },
};

// recordCategory
export const recordCategory = {
  selectTable: "table1",
  selectView: "view1",
  selectTheme: "p2",
  chartOptions: {
    showLegend: true,
    showDataLabel: true,
  },
  dataOptions: {
    recordCategory: {
      cate: "field1",
      series: {
        calc: "max",
        fields: [
          {
            field: "field2",
            calc: "max",
          },
          {
            field: "field3",
            calc: "min",
          },
        ],
      },
    },
  },
};
