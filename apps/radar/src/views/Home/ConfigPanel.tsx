import { useEffect, useRef, useState } from "react";
import { ConfigUI } from "@bc/config-ui";
import { Button } from "@douyinfe/semi-ui";
import type { Scheme } from "@bc/config-ui";
import { tranBIData } from "@bc/helper/config-ui";
import { createScheme } from "@bc/config-ui";
import {
  getDefaultValue,
  getSchemeByPath,
  setSchemeByPath,
} from "@bc/config-ui";
import {
  DATA_SOURCE_SORT_TYPE,
  FieldType,
  GroupMode,
  ORDER,
  Rollup,
  SourceType,
  type IConfig,
} from "@lark-base-open/js-sdk";
import ECharts from "@bc/echarts/index";
import { createEChartsOption } from "@bc/helper/createEChartsOption";
import { bsSdk } from "./factory";
import { useTranslation } from "react-i18next";
import type { BIField } from "@bc/sdk/BsSdk";
import { useDebounceEffect } from "@bc/helper/useDebounce";

export type ConfigPanelProps = {};

export default function ConfigPanel(props: ConfigPanelProps) {
  const [t] = useTranslation();
  const [configValue, setConfigValue] = useState({ root: {} as any });
  const [scheme, setScheme] = useState<Scheme>({
    type: "object",
    field: "",
  });
  const [initd, setInitd] = useState(false);
  const [echartsOption, setEchartsOption] = useState({} as any);
  const fieldTypeMapRef = useRef<{ [key: string]: BIField }>({});

  useDebounceEffect(() => {
    async function updatePreview() {
      console.log("updatePreview", configValue.root);
      const config = getConfig();
      if (!config) {
        console.error("config is empty, skip updatePreview");
        return;
      }
      console.log("getConfig", config);
      const data = await bsSdk.getPreviewData(config.dataConditions as any);
      console.log("getPreviewData", data);
      setEchartsOption(createEChartsOption(data, config.customConfig));
      bsSdk.triggerDashRendered();
    }
    updatePreview();
  }, [configValue.root]);

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
      console.log("init", tables);
      const o1 = tranBIData(tables);
      const newScheme = createScheme("fieldCategory");
      setSchemeByPath(newScheme, "tableId", {
        default: o1[0].value,
        options: o1,
      });
      setScheme(newScheme);
      setConfigValue({
        root: getDefaultValue(newScheme),
      });
    }
    init();
  }, []);

  useEffect(() => {
    async function updateViews() {
      console.log("updateViews", configValue.root.tableId);

      const { tableId } = configValue.root;
      if (tableId) {
        const table = tableId;

        const views = await bsSdk.getViewList(table);

        const options = tranBIData(views).map((view) => {
          return {
            value: JSON.stringify({
              viewId: view.value,
              viewName: view.label,
              type: SourceType.VIEW,
            }),
            label: view.label,
            icon: view.icon,
          };
        });
        const defaultView = options[0].value;

        // console.log("getViewList", views);
        setSchemeByPath(scheme, "dataRange", {
          options,
          default: defaultView,
        });

        setConfigValue((configValue) => ({
          root: { ...configValue.root, dataRange: defaultView },
        }));
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

      for (let i = 0; i < fields.length; i++) {
        const field = fields[i];
        fieldTypeMapRef.current[field.id] = field;
      }

      const fieldsOptions = tranBIData(fields);

      if (configValue?.root?.mapType === "fieldCategory") {
        const list = fieldsOptions.filter((item) =>
          [FieldType.Number, FieldType.Formula, FieldType.Lookup].includes(
            item.type
          )
        );
        setSchemeByPath(scheme, "mapOptions.cates", {
          options: {
            list,
          },
          default: list.map((item) => {
            return {
              value: item.value,
            };
          }),
        });
        setSchemeByPath(scheme, "mapOptions.series", {
          options: fieldsOptions,
          default: fieldsOptions[0].value,
        });
        const mapOptions = getSchemeByPath(scheme, "mapOptions");
        const defaultMapOptions = getDefaultValue(mapOptions);
        console.log("defaultMapOptions", defaultMapOptions);
        setConfigValue((configValue) => ({
          root: {
            ...configValue.root,
            mapOptions: defaultMapOptions,
          },
        }));
      } else {
        const list = fieldsOptions.filter((item) =>
          [FieldType.Number, FieldType.Formula, FieldType.Lookup].includes(
            item.type
          )
        );
        setSchemeByPath(scheme, "mapOptions.cate", {
          options: fieldsOptions,
          default: fieldsOptions[0].value,
        });
        setSchemeByPath(scheme, "mapOptions.series", {
          options: {
            list,
            itemSelectOptions: [
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
          },
          default: list.map((item) => {
            return {
              value: item.value,
              select: "MAX",
            };
          }),
        });
        const mapOptions = getSchemeByPath(scheme, "mapOptions");
        const defaultMapOptions = getDefaultValue(mapOptions);
        console.log("defaultMapOptions", defaultMapOptions);
        setConfigValue((configValue) => ({
          root: {
            ...configValue.root,
            mapOptions: defaultMapOptions,
          },
        }));
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
      setConfigValue((configValue) => ({
        root: {
          ...configValue.root,
          mapOptions: getDefaultValue(mapOptions),
        },
      }));
      setSchemeByPath(newScheme, "mapOptions", mapOptions);
      return newScheme;
    });
  }, [configValue?.root?.mapType]);

  useEffect(() => {
    const muliType = [FieldType.MultiSelect];
    if (configValue.root.mapType === "fieldCategory") {
      const fieldId = configValue?.root?.mapOptions?.series;
      const fieldMeta = fieldTypeMapRef.current[fieldId] as any;
      if (
        muliType.includes(fieldMeta?.type) ||
        fieldMeta?.raw?.property?.multiple
      ) {
        setSchemeByPath(scheme, "mapOptions.checkSplit", {
          hide: false,
        });
        setScheme({ ...scheme });
      } else {
        const node = getSchemeByPath(scheme, "mapOptions");
        if (node) {
          setSchemeByPath(scheme, "mapOptions.checkSplit", {
            hide: true,
          });
          setScheme({ ...scheme });
        }
      }
    } else {
      const fieldId = configValue?.root?.mapOptions?.cate;
      const fieldMeta = fieldTypeMapRef.current[fieldId] as any;

      if (
        muliType.includes(fieldMeta?.type) ||
        fieldMeta?.raw?.property?.multiple
      ) {
        setSchemeByPath(scheme, "mapOptions.checkSplit", {
          hide: false,
        });

        setScheme({ ...scheme });
      } else {
        const node = getSchemeByPath(scheme, "mapOptions");
        if (node) {
          setSchemeByPath(scheme, "mapOptions.checkSplit", {
            hide: true,
          });
          setScheme({ ...scheme });
        }
      }
    }
  }, [
    configValue?.root?.mapOptions?.cate,
    configValue?.root?.mapOptions?.series,
  ]);

  const getConfig = () => {
    if (!configValue.root.dataRange) {
      console.error("dataRange is empty");
      return;
    }
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
              rollup: configValue.root.mapOptions.calc || Rollup.MAX,
            };
          }),
        } as any,
        customConfig: configValue.root,
      };
      return config;
    } else if (configValue.root.mapType === "recordCategory") {
      if (!configValue.root.mapOptions.series) {
        console.error("series is empty");
        return;
      }
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
        } as any,
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
        borderTop: "var(--split-line-size) solid var(--split-line-color)",
        // marginTop: 50,
      }}
    >
      <div style={{ flex: 1, padding: 20 }}>
        <ECharts option={echartsOption}></ECharts>
      </div>
      <div
        style={{
          width: "340px",
          padding: "0 20px",
          overflow: "scroll",
          borderLeft: "var(--split-line-size) solid var(--split-line-color)",
        }}
      >
        <ConfigUI
          scheme={scheme}
          value={configValue}
          onChange={(target, field, value) => {
            console.log("Root onChange", target, field, value);
            const newTarget = Object.assign({}, target, { [field]: value });
            setConfigValue(newTarget);
          }}
        ></ConfigUI>
        <div style={{ height: 300 }}></div>
        <div
          style={{
            position: "fixed",
            bottom: 0,
            right: 0,
            display: "flex",
            justifyContent: "end",
            background: "var(--feishu-color-bg)",
            borderRadius: 4,
            width: 339,
            padding: "10px 20px",
          }}
        >
          <Button
            type="primary"
            theme="solid"
            style={{ width: 80, marginBottom: 10 }}
            onClick={() => {
              const config = getConfig();
              if (!config) {
                console.error("config is empty");
                return;
              }
              bsSdk.saveConfig(config).then((res) => {
                console.log("setConfig", res);
              });
            }}
          >
            {t("Ok")}
          </Button>
        </div>
      </div>
    </div>
  );
}
