import { DATA_SOURCE_SORT_TYPE, GroupMode, ORDER, Rollup, type IConfig } from "@lark-base-open/js-sdk";

export default function pullQuery(valueRoot: any) {
  if (valueRoot.mapType === "fieldCategory") {
    const config: IConfig = {
      dataConditions: {
        tableId: valueRoot.tableId,
        dataRange: JSON.parse(valueRoot.dataRange),
        groups: [
          {
            fieldId: valueRoot.mapOptions.series,
            sort: {
              order: ORDER.ASCENDING,
              sortType: DATA_SOURCE_SORT_TYPE.VIEW,
            },
            mode: valueRoot.mapOptions.checkSplit
              ? GroupMode.ENUMERATED
              : GroupMode.INTEGRATED,
          },
        ],
        series: valueRoot.mapOptions.cates.map((cate: any) => {
          return {
            fieldId: cate.value,
            rollup: valueRoot.mapOptions.calc || Rollup.MAX,
          };
        }),
      } as any,
      customConfig: valueRoot,
    };
    return config;
  } else if (valueRoot.mapType === "recordCategory") {
    if (!valueRoot.mapOptions.series) {
      console.error("series is empty");
      return;
    }
    const config: IConfig = {
      dataConditions: {
        tableId: valueRoot.tableId,
        dataRange: JSON.parse(valueRoot.dataRange),
        groups: [
          {
            fieldId: valueRoot.mapOptions.cate,
            sort: {
              order: ORDER.ASCENDING,
              sortType: DATA_SOURCE_SORT_TYPE.VIEW,
            },
            mode: valueRoot.mapOptions.checkSplit
              ? GroupMode.ENUMERATED
              : GroupMode.INTEGRATED,
          },
        ],
        series: valueRoot.mapOptions.series.map((series: any) => {
          return {
            fieldId: series.value,
            rollup: series.select,
          };
        }),
      } as any,
      customConfig: valueRoot,
    };
    return config;
  }
}