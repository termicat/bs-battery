import { useEffect, useRef, useState } from "react";
import { ConfigUI } from "@bc/config-ui";
import { Button } from "@douyinfe/semi-ui";
import type { Scheme } from "@bc/config-ui";
import { tranBIData } from "@bc/helper/config-ui";
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
import { createEChartsOption } from "@bc/helper/createEChartsOption";
import { bsSdk } from "./factory";
import { useTranslation } from "react-i18next";
import type { BIField } from "@bc/sdk/BsSdk";
import BatteryChart from "../../components/BatteryChart";
import { createScheme } from "../../options";
import { theme } from "@bc/config";

export type ConfigPanelProps = {};

export default function ConfigPanel(props: ConfigPanelProps) {
  const [t] = useTranslation();
  const [configValue, setConfigValue] = useState({ root: {} as any });
  const [scheme, setScheme] = useState<Scheme>({
    field: "root",
    type: "object",
  });
  const [initd, setInitd] = useState(false);
  const [chartsOption, setChartsOption] = useState([] as any);
  const fieldTypeMapRef = useRef<{ [key: string]: BIField }>({});

  useEffect(() => {
    async function updatePreview() {
      const config = getConfig();
      if (!config) {
        console.error("config is empty, skip updatePreview");
        return;
      }
      const data = await bsSdk.getPreviewData(config.dataConditions as any);
      console.log("getPreviewData", data);
      const selectTheme = configValue.root.selectTheme;
      const themeOption = theme.light.find(
        (item) => item.value === selectTheme
      );
      const chartOption = data.slice(1).map((item, index) => {
        return {
          label: item[0].text,
          value: item[1].value,
          color: themeOption?.label[index],
        };
      });
      const primaryKeyIndex = chartOption.findIndex((item) => {
        return item.label === configValue.root.primaryKey;
      });
      if (primaryKeyIndex !== -1) {
        const primaryKey = chartOption.splice(primaryKeyIndex, 1)[0];
        chartOption.unshift(primaryKey);
      }
      setChartsOption(chartOption);
      bsSdk.triggerDashRendered();
    }
    updatePreview();
  }, [configValue]);

  useEffect(() => {
    async function initConfigValue() {
      const config = await bsSdk.getConfig();
      console.log("getConfig", JSON.stringify(config));
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
      const newScheme = createScheme();
      setSchemeByPath(newScheme, "tableId", {
        default: o1[0].value,
        options: o1,
      });
      const defaultConfigValue = getDefaultValue(newScheme);
      setConfigValue({ root: defaultConfigValue });
      // console.log("defaultConfigValue", defaultConfigValue);

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
            icon: view.icon,
          };
        });
        const defaultView = options[0].value;

        // console.log("getViewList", views);
        setSchemeByPath(scheme, "dataRange", {
          options,
          default: defaultView,
        });

        setConfigValue({
          root: {
            ...configValue.root,
            dataRange: defaultView,
          },
        });
        setScheme({ ...scheme });
      }
    }
    updateViews();
  }, [configValue?.root?.tableId]);

  useEffect(() => {
    async function updateGroupBy() {
      const { tableId, dataRange } = configValue.root;
      if (tableId && dataRange) {
        console.log(
          "updateGroupBy",
          "tableId",
          tableId,
          "dataRange",
          dataRange
        );

        const dataRangeObj = JSON.parse(dataRange);
        const fields = await bsSdk.getFiledListByViewId(
          tableId,
          dataRangeObj.viewId
        );
        const options = tranBIData(fields).map((field) => {
          fieldTypeMapRef.current[field.value] = field.raw;
          return field;
        });
        const defaultField = options[0].value;
        setSchemeByPath(scheme, "groupBy", {
          options,
          default: defaultField,
        });

        const fieldValueByOptions = options.filter((item) =>
          [FieldType.Number, FieldType.Formula, FieldType.Lookup].includes(
            item.type
          )
        );
        setSchemeByPath(scheme, "fieldValueBy", {
          options: fieldValueByOptions,
          default: fieldValueByOptions[0]?.value,
        });

        setConfigValue({
          root: {
            ...configValue.root,
            groupBy: defaultField,
            fieldValueBy: fieldValueByOptions[0]?.value,
          },
        });
        setScheme({ ...scheme });
      }
    }
    updateGroupBy();
  }, [configValue?.root?.dataRange]);

  useEffect(() => {
    async function updatePrimaryKey() {
      const { tableId, dataRange } = configValue.root;
      if (tableId && dataRange) {
        const dataRangeObj = JSON.parse(dataRange);
        const data = await bsSdk.getPreviewData({
          tableId,
          dataRange: dataRangeObj,
          groups: [
            {
              fieldId: configValue.root.groupBy,
              sort: {
                order: ORDER.ASCENDING,
                sortType: DATA_SOURCE_SORT_TYPE.VIEW,
              },
              mode: GroupMode.ENUMERATED,
            },
          ],
        });
        console.log("data:", data);

        const options = data
          .slice(1)
          .map((field) => {
            return {
              value: field[0].text,
              label: field[0].text,
            };
          })
          .filter((item) => item.label);
        const defaultValue = options?.[0]?.value;
        setSchemeByPath(scheme, "primaryKey", {
          options,
          default: defaultValue,
        });
        setConfigValue({
          root: { primaryKey: defaultValue, ...configValue.root },
        });
        setScheme({ ...scheme });
      }
    }
    updatePrimaryKey();
  }, [configValue?.root?.groupBy]);

  useEffect(() => {
    function updateCheckSplitScheme() {
      const { groupBy } = configValue.root;
      if (!groupBy) {
        return;
      }
      const field = fieldTypeMapRef.current[groupBy];
      if (!field) {
        return;
      }
      if ([FieldType.MultiSelect, FieldType.User].includes(field.type)) {
        setSchemeByPath(scheme, "checkSplit", {
          hide: false,
        });
        setConfigValue({
          root: { checkSplit: false, ...configValue.root },
        });
        setScheme({ ...scheme });
      } else {
        setSchemeByPath(scheme, "checkSplit", {
          hide: true,
        });
        setConfigValue({
          root: { checkSplit: false, ...configValue.root },
        });
        setScheme({ ...scheme });
      }
    }
    updateCheckSplitScheme();
  }, [configValue?.root?.groupBy]);

  useEffect(() => {
    function updateShowFieldValueBy() {
      if (configValue.root?.valueBy === "fieldValue") {
        setSchemeByPath(scheme, "fieldValueBy", {
          hide: false,
        });
        setSchemeByPath(scheme, "calcType", {
          hide: false,
        });
        setScheme({ ...scheme });
      } else {
        setSchemeByPath(scheme, "fieldValueBy", {
          hide: true,
        });
        setSchemeByPath(scheme, "calcType", {
          hide: true,
        });
        setScheme({ ...scheme });
      }
    }
    updateShowFieldValueBy();
  }, [configValue.root?.valueBy]);

  const getConfig = () => {
    if (!configValue.root.dataRange || !configValue.root.primaryKey) {
      return;
    }
    const config: IConfig = {
      dataConditions: {
        tableId: configValue.root.tableId,
        dataRange: JSON.parse(configValue.root.dataRange),
        groups: [
          {
            fieldId: configValue.root.groupBy,
            sort: {
              order: configValue.root.orderBy,
              sortType: configValue.root.orderType,
            },
            mode: configValue.root.checkSplit
              ? GroupMode.ENUMERATED
              : GroupMode.INTEGRATED,
          },
        ],
        series:
          configValue.root.valueBy === "fieldValue" &&
          configValue.root.fieldValueBy
            ? [
                {
                  fieldId: configValue.root.fieldValueBy,
                  rollup: configValue.root.calcType,
                },
              ]
            : undefined,
      } as any,
      customConfig: configValue.root,
    };
    return config;
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
      <div
        style={{
          width: "70%",
          padding: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <BatteryChart
          style={{ width: "80%", height: "20vw" }}
          list={chartsOption}
        ></BatteryChart>
      </div>
      <div
        style={{
          width: "30%",
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
            borderRadius: 4,
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
