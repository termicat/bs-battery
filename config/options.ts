export const scheme = {
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
          value: "fieldCategory",
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
                  field: "field",
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

export const value = {
  header: {
    title: "CRM 系统",
    sub: "系统演示",
    logo: "https://picsum.photos/500/500",
    background: "url(https://picsum.photos/3000/4500)",
    height: 200,
  },
  charts: [
    {
      id: "cd-xxff1",
      title: "门店数量",
      type: "NumberGroup",
      query:
        "select 门店名称 as title, count(门店名称) as data from 地址管理 group by 门店名称",
    },
    {
      id: "cd-tt22",
      title: "预约咨询",
      type: "LinkGroup",
      query:
        "select 功能名称 as title, 链接入口 as data, 图标 as icon from 预约咨询",
    },
    {
      id: "cd-xxxt",
      title: "跟进进度",
      type: "ChartBar",
      query:
        "select 跟进时间 as title, count(跟进时间) as data from 加盟商跟进记录 group by 跟进时间 order by title asc",
    },
  ],
};
