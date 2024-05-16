import i18n from "@bc/i18n";
import type { Node, Scheme } from "@bc/config-ui";
import { theme } from "@bc/config";
import { DATA_SOURCE_SORT_TYPE, ORDER } from "@lark-base-open/js-sdk";

export const createScheme = () => {
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
        default: "p2",
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
        portal: "#groupBy-bottom",
        field: "checkSplit",
        type: "checkbox",
        label: t("Polynomial Split Statistics"),
        hide: true,
        default: false,
      },
      {
        label: t("Order By"),
        field: "orderBy",
        type: "select-tabs",
        options: [
          {
            label: t("Order Field"),
            value: DATA_SOURCE_SORT_TYPE.GROUP,
          },
          {
            label: t("Order Count"),
            value: DATA_SOURCE_SORT_TYPE.VALUE,
          },
          {
            label: t("Order Record"),
            value: DATA_SOURCE_SORT_TYPE.VIEW,
          },
        ],
        default: DATA_SOURCE_SORT_TYPE.GROUP,
      },
      {
        label: t("Order Type"),
        field: "orderType",
        type: "select-tabs",
        options: [
          {
            label: t("Asc"),
            value: ORDER.ASCENDING,
            // icon: "icons/arrow-up.svg",
          },
          {
            label: t("Desc"),
            value: ORDER.DESCENDING,
            // icon: "icons/arrow-down.svg",
          },
        ],
        default: ORDER.ASCENDING,
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
            value: "fieldValue",
          },
        ],
        default: "recordCount",
      },
      {
        label: t("Select Field"),
        field: "fieldValueBy",
        type: "select",
        options: [],
        hide: true,
        default: "",
      },
      {
        label: "计算方式",
        field: "calcType",
        type: "down-select",
        portal: "#fieldValueBy-right",
        default: "SUM",
        options: [
          {
            label: "总和",
            value: "SUM",
          },
          {
            label: "平均值",
            value: "AVERAGE",
          },
          {
            label: "最大值",
            value: "MAX",
          },
          {
            label: "最小值",
            value: "MIN",
          },
        ],
        hide: true,
      },
    ],
  } as Scheme;
};
