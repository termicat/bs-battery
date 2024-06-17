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
        field: "orderType",
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
        field: "orderBy",
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
        label: t("Calculation"),
        field: "calcType",
        type: "down-select",
        portal: "#fieldValueBy-right",
        default: "MAX",
        options: [
          {
            label: t("Max"),
            value: "MAX",
          },
          {
            label: t("Min"),
            value: "MIN",
          },
          {
            label: t("Sum"),
            value: "SUM",
          },
          {
            label: t("Average"),
            value: "AVERAGE",
          },
        ],
        hide: true,
      },
    ],
  } as Scheme;
};

export function createChartOption(data: any, configValueRoot: any) {
  const selectTheme = configValueRoot.selectTheme;
  const themeOption = theme.light.find((item) => item.value === selectTheme);
  const chartOption = data.slice(1).map(
    (
      item: {
        text: any;
        value: any;
      }[],
      index: any
    ) => {
      return {
        label: item[0].text,
        value: item[1]?.value,
        color: themeOption?.label[index % themeOption?.label.length],
      };
    }
  );
  if (configValueRoot.orderType === DATA_SOURCE_SORT_TYPE.VALUE) {
    chartOption.sort((a: { value: any }, b: { value: any }) => {
      return configValueRoot.orderBy === ORDER.ASCENDING
        ? a.value - b.value
        : b.value - a.value;
    });
  } else if (configValueRoot.orderType === DATA_SOURCE_SORT_TYPE.GROUP) {
    chartOption.sort((a: { label: any }, b: { label: any }) => {
      return configValueRoot.orderBy === ORDER.ASCENDING
        ? a.label.localeCompare(b.label)
        : b.label.localeCompare(a.label);
    });
  }

  const primaryKeyIndex = chartOption.findIndex((item: { label: any }) => {
    return item.label === configValueRoot.primaryKey;
  });
  if (primaryKeyIndex !== -1) {
    const primaryKey = chartOption.splice(primaryKeyIndex, 1)[0];
    chartOption.unshift(primaryKey);
  }
  return chartOption;
}
