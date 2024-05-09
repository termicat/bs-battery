import type { Node, Scheme } from "@/components/config-ui/types";

export const scheme: Scheme = {
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
      default: "",
      // tip: "这是一个标题",
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
      }
      // tip: "添加一个表格组件",
    },
    {
      type: 'line',
    },
    {
      label: "数据映射",
      field: "dataOptions",
      type: " select-tabs",
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
                  style: 'float: right; width: 200px;',
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
              ]
            },
          ]
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
                  style: 'float: right; width: 200px;',
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
                    ]
                  },
                },
              ]
            },
          ]
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
  selectTheme: "theme1",
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
      }
    }
  },
};

// recordCategory
export const recordCategory = {
  selectTable: "table1",
  selectView: "view1",
  selectTheme: "theme1",
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
          }
        ],
      }
    }
  },
}