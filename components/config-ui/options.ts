export const scheme = {
  type: "object",
  properties: [
    {
      field: "header",
      label: "头部配置",
      type: "object",
      tip: "头部数据的配置",
      properties: [
        {
          label: "标题",
          field: "title",
          type: "string",
          default: "标题",
          tip: "这是一个标题",
        },
        {
          label: "副标题",
          field: "sub",
          type: "string",
          default: "副标题",
          tip: "副标题",
        },
        {
          label: "背景色",
          field: "background",
          type: "string",
          default: "#fff",
          tip: "背景色，支持图片 url(链接)",
        },
        {
          label: "高度",
          field: "height",
          type: "integer",
          default: 50,
          tip: "高度",
        },
        {
          label: "Logo",
          field: "logo",
          type: "string",
          default: "",
          tip: "logo链接",
        },
      ],
    },
    {
      field: "charts",
      label: "图表配置",
      type: "array",
      tip: "表格数据的配置",
      display: "title",
      properties: [
        {
          label: "标题",
          field: "title",
          type: "string",
          default: "标题",
          tip: "这是一个标题",
        },
        {
          label: "类型",
          field: "type",
          type: "enums",
          options: [
            {
              label: "链接组",
              value: "LinkGroup",
            },
            {
              label: "数字组",
              value: "NumberGroup",
            },
            {
              label: "柱状图",
              value: "ChartBar",
            },
            {
              label: "表格",
              value: "TableData",
            },
          ],
          default: "LinkGroup",
          tip: "添加一个表格组件",
        },
        {
          label: "查询",
          field: "query",
          type: "sql",
          default: "",
          tip: "查询的SQL",
        },
      ],
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
