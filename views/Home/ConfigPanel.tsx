import { useTranslation } from "next-i18next";
import ConfigUI from "@/components/config-ui";
import { useEffect, useRef, useState } from "react";
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
  FieldType,
  GroupMode,
  ORDER,
  SourceType,
  type IConfig,
} from "@lark-base-open/js-sdk";
import ECharts from "@/components/echarts";
import { createEChartsOption } from "../../libs/helper/createEChartsOption";
import { bsSdk } from "./factory";

export type ConfigPanelProps = {};

export default function ConfigPanel(props: ConfigPanelProps) {
  const [t, i18n] = useTranslation();
  const [configValue, setConfigValue] = useState({ root: {} as any });
  const [scheme, setScheme] = useState<Scheme>({
    type: "object",
    field: "",
  });
  const [initd, setInitd] = useState(false);
  const [echartsOption, setEchartsOption] = useState({} as any);
  const fieldTypeMapRef = useRef<{ [key: string]: FieldType }>({});

  useEffect(() => {
    async function updatePreview() {
      const config = getConfig();
      const data = await bsSdk.getPreviewData(config.dataConditions as any);
      console.log("getPreviewData", data);
      setEchartsOption(createEChartsOption(data, config.customConfig));
      bsSdk.triggerDashRendered();
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

      for (let i = 0; i < fieldsOptions.length; i++) {
        const field = fieldsOptions[i];
        fieldTypeMapRef.current[field.value] = field.type;
      }

      if (configValue?.root?.mapType === "fieldCategory") {
        setSchemeByPath(scheme, "mapOptions.cates", {
          options: {
            list: fieldsOptions.filter(
              (field) => field.type === FieldType.Number
            ),
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
            list: fieldsOptions.filter(
              (item) => item.type === FieldType.Number
            ),
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

  useEffect(() => {
    if (configValue.root.mapType === "fieldCategory") {
      const fieldId = configValue?.root?.mapOptions?.series;
      if (fieldTypeMapRef.current[fieldId] === FieldType.MultiSelect) {
        const node = getSchemeByPath(scheme, "mapOptions");

        node.properties[2] = {
          type: "checkbox",
          field: "checkSplit",
          label: "多项式拆分统计",
          default: false,
          portal: "#series-bottom",
        };
        node.properties.length = 3;

        setScheme({ ...scheme });
      } else {
        const node = getSchemeByPath(scheme, "mapOptions");
        if (node) {
          node.properties.length = 2;
          setScheme({ ...scheme });
        }
      }
    } else {
      const fieldId = configValue?.root?.mapOptions?.cate;
      if (fieldTypeMapRef.current[fieldId] === FieldType.MultiSelect) {
        const node = getSchemeByPath(scheme, "mapOptions");

        node.properties[2] = {
          type: "checkbox",
          field: "checkSplit",
          label: "多项式拆分统计",
          default: false,
          portal: "#cate-bottom",
        };
        node.properties.length = 3;

        setScheme({ ...scheme });
      } else {
        const node = getSchemeByPath(scheme, "mapOptions");
        if (node) {
          node.properties.length = 2;
          setScheme({ ...scheme });
        }
      }
    }
  }, [
    configValue?.root?.mapOptions?.cate,
    configValue?.root?.mapOptions?.series,
  ]);

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
              mode: configValue.root.mapOptions.checkSplit
                ? GroupMode.ENUMERATED
                : GroupMode.INTEGRATED,
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
              mode: configValue.root.mapOptions.checkSplit
                ? GroupMode.ENUMERATED
                : GroupMode.INTEGRATED,
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
        overflow: "hidden",
        borderTop: "1px solid #eee",
        // marginTop: 50,
      }}
    >
      <div style={{ flex: 1, padding: 20 }}>
        <ECharts option={echartsOption}></ECharts>
      </div>
      <div
        style={{
          width: "30%",
          padding: "0 20px",
          overflow: "scroll",
          borderLeft: "1px solid #eee",
        }}
      >
        <ConfigUI
          scheme={scheme}
          value={configValue}
          onChange={(target, field, value) => {
            console.log("Root onChange", target, field, value);

            target[field] = value;
            setConfigValue({ ...target });
          }}
        ></ConfigUI>
        <div style={{ height: 200 }}></div>
        <div
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            display: "flex",
            background: "#fff",
          }}
        >
          {/* <Button style={{ width: 80, marginRight: 10 }} type="tertiary">
            取消
          </Button> */}
          <Button
            type="primary"
            theme="solid"
            style={{ width: 80 }}
            onClick={() => {
              const config = getConfig();
              bsSdk.saveConfig(config).then((res) => {
                console.log("setConfig", res);
              });
            }}
          >
            确定
          </Button>
        </div>
      </div>
    </div>
  );
}
