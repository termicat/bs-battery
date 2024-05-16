import i18n from "@bc/i18n";
import type { Node, Scheme } from "@bc/config-ui";
import { theme } from "@bc/config";

export const createScheme = (mapType: "fieldCategory" | "recordCategory") => {
  const t = i18n.t.bind(i18n);

  return {
    field: "root",
    type: "object",
    properties: [
      {
        field: "tableId",
        label: t("Table"),
        type: "select",
        options: [],
        // tip: "这是一个标题",
      },
      {
        field: "dataRange",
        label: t("View"),
        type: "select",
        options: [],
        // tip: "这是一个标题",
      },
      {
        field: "selectTheme",
        label: t("Theme"),
        type: "select-theme",
        default: "p1",
        // tip: "这是一个标题",
        options: theme.light.map((item: any) => {
          return {
            label: item.label.slice(0, 3),
            value: item.value,
          };
        }),
      },
      {
        type: "line",
      },
      {
        label: t("Group By"),
        field: "groupBy",
        type: "select",
        options: [],
      },
      {
        label: t("Order By"),
        field: "orderBy",
        type: "select-tabs",
        options: [
          {
            label: t("Order Field"),
            value: "fieldValue",
          },
          {
            label: t("Order Count"),
            value: "fieldCount",
          },
          {
            label: t("Order Record"),
            value: "recordOrder",
          },
        ],
      },
      {
        label: t("Order Type"),
        field: "orderType",
        type: "select-tabs",
        options: [
          {
            label: t("Asc"),
            value: "asc",
            // icon: "icons/arrow-up.svg",
          },
          {
            label: t("Desc"),
            value: "desc",
            // icon: "icons/arrow-down.svg",
          },
        ],
        default: "asc",
      },
      {
        label: t("Primary Key"),
        field: "primaryKey",
        type: "select",
        options: [],
      },
      {
        label: t("Value By"),
        field: "valueBy",
        type: "select",
        options: [
          {
            label: t("Record Count"),
            value: "recordCount",
          },
          {
            label: t("Field Value Count"),
            value: "fieldCount",
          },
        ],
        default: "recordCount",
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
