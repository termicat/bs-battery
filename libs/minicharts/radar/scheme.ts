import i18n from "@bc/i18n";
import type { Node, Scheme } from "@bc/config-ui/types";
import { theme } from "@bc/config";
import { tranBIData } from "@bc/helper/config-ui";
import { FieldType, SourceType } from "@lark-base-open/js-sdk";
import type { NodeTypes } from "@bc/config-ui";
import { typeofNumber } from "@bc/sdk/fieldTools";
import type { BsSdk } from "@bc/sdk/BsSdk";

export default async function pullScheme (
  bsSdk: BsSdk,
  configRoot: any = {},
  lastConfigRoot: any = configRoot,
  defaultTableIndex = 0,
) {
  // console.log("pullScheme", {
  //   configRoot,
  //   lastConfigRoot,
  // });

  const t = i18n.t.bind(i18n);
  const scheme = {
    field: "root",
    type: "object",
    properties: [] as Node<NodeTypes>[],
  };

  const rootTableId: Node<"select"> = {
    field: "tableId",
    label: t("Table"),
    type: "select",
    options: [],
  };
  rootTableId.options = tranBIData(await bsSdk.getTableList());
  rootTableId.default =
    configRoot.tableId ?? rootTableId.options[defaultTableIndex].value;
  scheme.properties.push(rootTableId);
  // ------------------------------
  const rootDataRange: Node<"select"> = {
    field: "dataRange",
    label: t("View"),
    type: "select",
    options: [],
  };
  const views = await bsSdk.getTableDataRange(rootTableId.default);
  console.log("views", views);
  rootDataRange.options = views
    .filter((item) => "viewName" in item)
    .map((item: any) => {
      return {
        value: JSON.stringify({
          viewId: item.viewId,
          viewName: item.viewName,
          type: item.type,
        }),
        icon: "icons/table.svg",
        label: item.viewName ?? "全部",
      };
    });
  rootDataRange.default = rootDataRange.options[0].value;
  if (configRoot.tableId === lastConfigRoot?.tableId && configRoot.dataRange) {
    rootDataRange.default = configRoot.dataRange;
  }
  scheme.properties.push(rootDataRange);
  // ------------------------------

  const rootSelectTheme: Node<"select-theme"> = {
    field: "selectTheme",
    label: t("Theme"),
    type: "select-theme",
    default: configRoot.selectTheme ?? "p1",
    options: theme.light,
  };
  scheme.properties.push(rootSelectTheme);
  // ------------------------------

  const rootChartOptions: Node<"checkboxes"> = {
    label: t("Charts Options"),
    field: "chartOptions",
    type: "checkboxes",
    options: [
      {
        label: t("Legend"),
        value: "showLegend",
      },
      {
        label: t("Label"),
        value: "showDataLabel",
      },
    ],
    default: configRoot.chartOptions ?? ["showLegend", "showDataLabel"],
  };
  scheme.properties.push(rootChartOptions);
  // ------------------------------

  const rootLine: Node<"line"> = {
    field: "",
    type: "line",
  };
  scheme.properties.push(rootLine);
  // ------------------------------

  // const rootAxisValue: Node<"select"> = {
  //   label: t("Axis Value"),
  //   field: "axisValue",
  //   type: "select",
  //   options: [
  //     {
  //       label: t("Single Axis Max"),
  //       value: "single",
  //     },
  //     {
  //       label: t("Global Axis Max"),
  //       value: "global",
  //     },
  //   ],
  //   default: configRoot.axisValue ?? "single",
  // };
  // scheme.properties.push(rootAxisValue);
  // ------------------------------
  const rootMapType: Node<"select"> = {
    label: t("Data Map"),
    field: "mapType",
    type: "select",
    options: [
      {
        label: t("Select Field Category"),
        value: "fieldCategory",
      },
      {
        label: t("Select Aggregate Records"),
        value: "recordCategory",
      },
    ],
    default: configRoot.mapType ?? "fieldCategory",
  };
  scheme.properties.push(rootMapType);
  // ------------------------------
  const rootMapOptions = {
    field: "mapOptions",
    type: "object",
    default: {},
    properties: [] as Node<NodeTypes>[],
  };
  const parseRootDataRange = JSON.parse(rootDataRange.default);
  switch (rootMapType.default) {
    case "fieldCategory": {
      const rootFieldCategoryCates = {
        label: t("Cate"),
        field: "cates",
        type: "field-list",
        options: {
          list: [] as any[],
        },
        default: [],
      };
      const fields = await bsSdk.getFiledListByViewId(
        rootTableId.default,
        parseRootDataRange.viewId
      );
      rootFieldCategoryCates.options.list = tranBIData(
        fields.filter((item) => typeofNumber(item.type))
      );
      const rootFieldCategoryCatesDefault = rootFieldCategoryCates.options.list
        .slice(0, 10)
        .map((item) => {
          return {
            value: item.value,
          };
        });
      rootFieldCategoryCates.default = rootFieldCategoryCatesDefault as any;
      // console.log(
      //   "eq",
      //   configRoot.mapOptions?.cates,
      //   lastConfigRoot?.mapOptions?.cates,
      //   eqObject(
      //     configRoot.mapOptions?.cates,
      //     lastConfigRoot?.mapOptions?.cates
      //   )
      // );

      if (
        configRoot.tableId === lastConfigRoot?.tableId &&
        configRoot.dataRange === lastConfigRoot?.dataRange &&
        configRoot.mapType === lastConfigRoot?.mapType &&
        configRoot.mapOptions?.cates
      ) {
        rootFieldCategoryCates.default = configRoot.mapOptions.cates;
      }

      const rootFieldCategorySeriesOptions = tranBIData(fields);
      const rootFieldCategorySeriesDefault =
        rootFieldCategorySeriesOptions?.[0]?.value;
      const rootFieldCategorySeries: Node<"select"> = {
        label: t("Series"),
        field: "series",
        type: "select",
        options: rootFieldCategorySeriesOptions,
        default: rootFieldCategorySeriesDefault,
      };

      if (
        configRoot.tableId === lastConfigRoot?.tableId &&
        configRoot.dataRange === lastConfigRoot?.dataRange &&
        configRoot.mapType === lastConfigRoot?.mapType &&
        configRoot.mapOptions?.series
      ) {
        rootFieldCategorySeries.default = configRoot.mapOptions.series;
      }

      const rootFieldCategoryCalc: Node<"down-select"> = {
        portal: "#series-right",
        label: t("Calculation"),
        field: "calc",
        type: "down-select",
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
        default: configRoot.mapOptions?.calc ?? "MAX",
      };

      const rootFieldCategoryCheckSplit: Node<"checkbox"> = {
        portal: "#series-bottom",
        type: "checkbox",
        field: "checkSplit",
        label: t("Polynomial Split Statistics"),
        default: configRoot.mapOptions?.checkSplit ?? false,
        hide: true,
      };
      const fieldMeta: any = fields?.find(
        (item) => item.id === rootFieldCategorySeries.default
      );
      if (
        fieldMeta &&
        ([FieldType.MultiSelect].includes(fieldMeta.type) ||
          fieldMeta?.raw?.property?.multiple)
      ) {
        rootFieldCategoryCheckSplit.hide = false;
      }

      rootMapOptions.properties.push(
        rootFieldCategoryCates as Node<"field-list">,
        rootFieldCategorySeries as Node<"select">,
        rootFieldCategoryCalc as Node<"down-select">,
        rootFieldCategoryCheckSplit as Node<"checkbox">
      );

      break;
    }
    case "recordCategory": {
      const fields = await bsSdk.getFiledListByViewId(
        rootTableId.default,
        parseRootDataRange.viewId
      );

      const rootRecordCategoryCateOptions = tranBIData(fields);
      const rootRecordCategoryCateDefault =
        rootRecordCategoryCateOptions?.[0].value;
      const rootRecordCategoryCate: Node<"select"> = {
        label: t("Cate"),
        field: "cate",
        type: "select",
        options: rootRecordCategoryCateOptions,
        default: rootRecordCategoryCateDefault,
      };

      if (
        configRoot.tableId === lastConfigRoot?.tableId &&
        configRoot.dataRange === lastConfigRoot?.dataRange &&
        configRoot.mapType === lastConfigRoot?.mapType &&
        configRoot.mapOptions?.cate
      ) {
        rootRecordCategoryCate.default = configRoot.mapOptions.cate;
      }
      // if (!lastConfigRoot && configRoot.mapOptions?.cate) {
      //   rootRecordCategoryCate.default = configRoot.mapOptions.cate;
      // }

      const rootRecordCategoryCheckSplit: Node<"checkbox"> = {
        type: "checkbox",
        field: "checkSplit",
        label: t("Polynomial Split Statistics"),
        default: configRoot.mapOptions?.checkSplit ?? false,
        portal: "#cate-bottom",
        hide: true,
      };
      const fieldMeta: any = fields?.find(
        (item) => item.id === rootRecordCategoryCate.default
      );
      if (
        fieldMeta &&
        ([FieldType.MultiSelect].includes(fieldMeta.type) ||
          fieldMeta?.raw?.property?.multiple)
      ) {
        rootRecordCategoryCheckSplit.hide = false;
      }

      const rootRecordCategorySeriesOptionsList = tranBIData(fields).filter(
        (item) => typeofNumber(item.type)
      );
      const rootRecordCategorySeriesOptionsItemSelectOptions = [
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
      ];
      const rootRecordCategorySeries: Node<"field-list"> = {
        label: t("Series"),
        field: "series",
        type: "field-list",
        options: {
          list: rootRecordCategorySeriesOptionsList,
          itemSelectOptions: rootRecordCategorySeriesOptionsItemSelectOptions,
        },
        default: rootRecordCategorySeriesOptionsList
          .slice(0, 10)
          .map((item) => {
            return {
              value: item.value,
              select: "MAX",
            };
          }),
      };

      if (
        configRoot.tableId === lastConfigRoot?.tableId &&
        configRoot.dataRange === lastConfigRoot?.dataRange &&
        configRoot.mapType === lastConfigRoot?.mapType &&
        configRoot.mapOptions?.series
      ) {
        rootRecordCategorySeries.default = configRoot.mapOptions.series;
      }

      rootMapOptions.properties.push(
        rootRecordCategoryCate as Node<"select">,
        rootRecordCategorySeries as Node<"field-list">,
        rootRecordCategoryCheckSplit as Node<"checkbox">
      );

      break;
    }
  }
  scheme.properties.push(rootMapOptions as Node<"object">);

  return scheme;
};
