import { useTranslation } from "next-i18next";
import { BsSdk } from "@/libs/bs-sdk/BsSdk";
import { useRouter } from "next/router";
import ConfigUI from "@/components/config-ui";
import { useEffect, useState } from "react";
import { Button } from "@douyinfe/semi-ui";
import type { Scheme } from "@/components/config-ui/types";
import { tranBIData } from "@/libs/helper/config-ui";
import { createScheme } from "@/components/config-ui/options";
import {
  getDefaultValue,
  getSchemeByPath,
  setSchemeByPath,
} from "@/components/config-ui/ConfigRegister";
import {
  DATA_SOURCE_SORT_TYPE,
  GroupMode,
  ORDER,
  SourceType,
  type IConfig,
} from "@lark-base-open/js-sdk";
import ECharts from "@/components/echarts";

const bsSdk = new BsSdk({});

let btId = "";
let btUrl = "";
let glang = "zh";

function createEChartsOption(data: any[][], configRoot: any) {
  const type = configRoot.mapType;
  if (type === "fieldCategory") {
    const echartsOption = {
      legend: configRoot.chartOptions.includes("showLegend")
        ? {
            data: data[0]?.slice(1)?.map?.((item) => item.text),
          }
        : undefined,
      radar: {
        // shape: 'circle',
        indicator: data.slice(1).map((item) => {
          return {
            name: item[0].text,
            // max: 10,
          };
        }),
      },
      series: [
        {
          name: "Data",
          type: "radar",
          data: data[0]?.slice(1)?.map?.((item, index) => {
            return {
              value: data.slice(1).map((item) => item[index + 1].value),
              name: item.text,
            };
          }),
        },
      ],
    };
    console.log("echartsOption", echartsOption);

    return echartsOption;
  } else {
    const echartsOption = {
      legend: configRoot.chartOptions.includes("showLegend")
        ? {
            data: data.slice(1).map((item) => item[0].text),
          }
        : undefined,
      radar: {
        // shape: 'circle',
        indicator: data[0]?.slice(1)?.map((item) => {
          return {
            name: item.text,
            // max: 10,
          };
        }),
      },
      series: [
        {
          name: "Data",
          type: "radar",
          data: data.slice(1).map((item) => {
            return {
              value: item.slice(1).map((item) => item.value),
              name: item[0].text,
            };
          }),
        },
      ],
    };
    console.log("echartsOption2", echartsOption);

    return echartsOption;
  }
}

export default function App() {
  const router = useRouter();
  const [t, i18n] = useTranslation();
  const [configValue, setConfigValue] = useState({ root: {} as any });
  const [scheme, setScheme] = useState<Scheme>({
    type: "object",
    field: "",
  });
  const [initd, setInitd] = useState(false);
  const [echartsOption, setEchartsOption] = useState({} as any);

  useEffect(() => {
    async function updatePreview() {
      const config = getConfig();
      const data = await bsSdk.getPreviewData(config.dataConditions as any);
      console.log("getPreviewData", data);
      setEchartsOption(createEChartsOption(data, config.customConfig));
    }
    updatePreview();
  }, [configValue]);

  useEffect(() => {
    async function initConfigValue() {
      const config = await bsSdk.getConfig();
      console.log("getConfig", config);
      const customConfig = config.customConfig;
      setConfigValue({ root: customConfig });
    }
    if (initd) {
      console.log("configValue", configValue);
      initConfigValue();
    }
  }, [initd]);

  useEffect(() => {
    async function init() {
      const tables = await bsSdk.getTableList();
      console.log("getTableList", tables);
      const o1 = tranBIData(tables);
      const newScheme = createScheme("fieldCategory");
      setSchemeByPath(newScheme, "tableId", {
        default: o1[0].value,
        options: o1,
      });
      setScheme(newScheme);
    }
    init();
  }, []);

  useEffect(() => {
    async function updateViews() {
      const { tableId } = configValue.root;
      if (tableId) {
        const table = tableId;
        console.log("tableId", table);

        const views = await bsSdk.getViewList(table);

        const options = tranBIData(views).map((view) => {
          return {
            value: JSON.stringify({
              viewId: view.value,
              viewName: view.label,
              type: SourceType.VIEW,
            }),
            label: view.label,
          };
        });
        const defaultView = options[0].value;

        // console.log("getViewList", views);
        setSchemeByPath(scheme, "dataRange", {
          options,
          default: defaultView,
        });

        setConfigValue({
          root: { ...configValue.root, dataRange: defaultView },
        });
        setScheme({ ...scheme });
      }
    }
    updateViews();
  }, [configValue?.root?.tableId]);

  useEffect(() => {
    async function updateFields() {
      console.log("updateFields", configValue.root.dataRange);
      if (!configValue.root.dataRange) {
        return;
      }
      const dataRange = JSON.parse(configValue.root.dataRange);
      const fields = await bsSdk.getFiledListByViewId(
        configValue.root.tableId,
        dataRange.viewId
      );
      console.log("getFieldList", fields);

      const fieldsOptions = tranBIData(fields);

      if (configValue?.root?.mapType === "fieldCategory") {
        setSchemeByPath(scheme, "mapOptions.cates", {
          options: {
            list: fieldsOptions,
          },
        });
        setSchemeByPath(scheme, "mapOptions.series", {
          options: fieldsOptions,
          default: fieldsOptions[0].value,
        });
        const mapOptions = getSchemeByPath(scheme, "mapOptions");
        setConfigValue({
          root: {
            ...configValue.root,
            mapOptions: getDefaultValue(mapOptions),
          },
        });
      } else {
        setSchemeByPath(scheme, "mapOptions.cate", {
          options: fieldsOptions,
          default: fieldsOptions[0].value,
        });
        setSchemeByPath(scheme, "mapOptions.series", {
          options: {
            list: fieldsOptions,
            itemSelectOptions: [
              {
                label: "最大值",
                value: "MAX",
              },
              {
                label: "最小值",
                value: "MIN",
              },
              {
                label: "求和",
                value: "SUM",
              },
              {
                label: "平均值",
                value: "AVERAGE",
              },
            ],
          },
          default: [],
        });
        const mapOptions = getSchemeByPath(scheme, "mapOptions");
        setConfigValue({
          root: {
            ...configValue.root,
            mapOptions: getDefaultValue(mapOptions),
          },
        });
      }

      setScheme({ ...scheme });
      setInitd(true);
    }
    updateFields();
  }, [configValue?.root?.dataRange, configValue?.root?.mapType]);

  useEffect(() => {
    setScheme((oldScheme) => {
      const newScheme = oldScheme;
      const mapOptions = getSchemeByPath(
        createScheme(configValue.root.mapType),
        "mapOptions"
      );
      setConfigValue({
        root: {
          ...configValue.root,
          mapOptions: getDefaultValue(mapOptions),
        },
      });
      setSchemeByPath(newScheme, "mapOptions", mapOptions);
      return newScheme;
    });
  }, [configValue?.root?.mapType]);

  const getConfig = () => {
    if (configValue.root.mapType === "fieldCategory") {
      const config: IConfig = {
        dataConditions: {
          tableId: configValue.root.tableId,
          dataRange: JSON.parse(configValue.root.dataRange),
          groups: [
            {
              fieldId: configValue.root.mapOptions.series,
              sort: {
                order: ORDER.ASCENDING,
                sortType: DATA_SOURCE_SORT_TYPE.VIEW,
              },
              mode: GroupMode.ENUMERATED,
            },
          ],
          series: configValue.root.mapOptions.cates.map((cate: any) => {
            return {
              fieldId: cate.value,
              rollup: configValue.root.mapOptions.calc,
            };
          }),
        },
        customConfig: configValue.root,
      };
      return config;
    } else {
      const config: IConfig = {
        dataConditions: {
          tableId: configValue.root.tableId,
          dataRange: JSON.parse(configValue.root.dataRange),
          groups: [
            {
              fieldId: configValue.root.mapOptions.cate,
              sort: {
                order: ORDER.ASCENDING,
                sortType: DATA_SOURCE_SORT_TYPE.VIEW,
              },
              mode: GroupMode.ENUMERATED,
            },
          ],
          series: configValue.root.mapOptions.series.map((series: any) => {
            return {
              fieldId: series.value,
              rollup: series.select,
            };
          }),
        },
        customConfig: configValue.root,
      };
      return config;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100vh",
        // marginTop: 50,
      }}
    >
      <div style={{ flex: 1 }}>
        <ECharts option={echartsOption}></ECharts>
      </div>
      <div style={{ width: 340, padding: "0 20px" }}>
        <ConfigUI
          scheme={scheme}
          value={configValue}
          onChange={(target, field, value) => {
            console.log("Root onChange", target, field, value);

            target[field] = value;
            setConfigValue({ ...target });
          }}
        ></ConfigUI>
        <Button
          type="primary"
          theme="solid"
          style={{ float: "right", marginTop: 20 }}
          onClick={() => {
            const config = getConfig();
            bsSdk.saveConfig(config).then((res) => {
              console.log("setConfig", res);
            });
          }}
        >
          确定
        </Button>
        {/* <Button
          onClick={async () => {
            bsSdk.getConfig().then((config) => {
              console.log("getConfig", config);
            });
            bsSdk.getData().then((data) => {
              console.log("getData", data);
            });
          }}
        >
          获取配置
        </Button> */}
      </div>
    </div>
  );
}
