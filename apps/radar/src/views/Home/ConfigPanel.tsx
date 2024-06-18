import { useRef, useState } from "react";
import { ConfigUI, getPullScheme } from "@bc/config-ui";
import { Button, Toast } from "@douyinfe/semi-ui";
import type { Scheme } from "@bc/config-ui";
import { getDefaultValue } from "@bc/config-ui";
import {
  DATA_SOURCE_SORT_TYPE,
  GroupMode,
  ORDER,
  Rollup,
  type IConfig,
} from "@lark-base-open/js-sdk";
import VCharts from "@bc/vcharts/index";
import { createVChartsOption } from "@bc/helper/createVChartsOption";
import { bsSdk } from "./factory";
import { useTranslation } from "react-i18next";
import { useDebounceEffect } from "@bc/helper/useDebounce";

export type ConfigPanelProps = {};

export default function ConfigPanel(props: ConfigPanelProps) {
  const [t] = useTranslation();
  const [configValue, setConfigValue] = useState({ root: {} as any });
  const [scheme, setScheme] = useState<Scheme>({
    type: "object",
    field: "",
  });
  const [echartsOption, setEchartsOption] = useState({} as any);
  const defaultTableIndex = useRef(0);

  async function updatePreview(configValue: any) {
    console.log("updatePreview", configValue.root);
    const config = getConfig(configValue);
    if (!config) {
      console.error("config is empty, skip updatePreview");
      return;
    }
    console.log("getConfig", config);
    const data = await bsSdk
      .getPreviewData(config.dataConditions as any)
      .catch((err) => {
        console.error(err);
        Toast.warning("数据为空");
        return [];
      });
    console.log("getPreviewData", data);
    setEchartsOption(createVChartsOption(data, config.customConfig));
    bsSdk.triggerDashRendered();
  }
  async function updateScheme(configValue: any, lastConfigValue?: any) {
    console.log("updateScheme before", configValue);
    const scheme = await getPullScheme(
      configValue.root,
      lastConfigValue?.root,
      defaultTableIndex.current
    ).catch((err) => {
      console.error(err);
      Toast.error(err.message);
      return {};
    });
    const configRoot = getDefaultValue(scheme as any);
    console.log("updateScheme after", scheme, configRoot);

    setScheme(scheme as any);
    let scopeConfigValue = configValue;
    if (lastConfigValue) {
      scopeConfigValue = { root: configRoot };
    } else if (configValue.root) {
      scopeConfigValue = { root: configValue.root };
    } else {
      scopeConfigValue = { root: configRoot };
    }
    setConfigValue(scopeConfigValue);
    updatePreview(scopeConfigValue);
  }

  useDebounceEffect(() => {
    async function init() {
      const config = await bsSdk
        .getConfig()
        .catch((err) => ({ customConfig: undefined }));
      updateScheme(
        {
          root: config.customConfig,
        },
        undefined
      );
    }
    init();
  }, []);

  const getConfig = (scopeConfigValue = configValue) => {
    if (!scopeConfigValue.root.dataRange) {
      console.error("dataRange is empty");
      return;
    }
    if (scopeConfigValue.root.mapType === "fieldCategory") {
      const config: IConfig = {
        dataConditions: {
          tableId: scopeConfigValue.root.tableId,
          dataRange: JSON.parse(scopeConfigValue.root.dataRange),
          groups: [
            {
              fieldId: scopeConfigValue.root.mapOptions.series,
              sort: {
                order: ORDER.ASCENDING,
                sortType: DATA_SOURCE_SORT_TYPE.VIEW,
              },
              mode: scopeConfigValue.root.mapOptions.checkSplit
                ? GroupMode.ENUMERATED
                : GroupMode.INTEGRATED,
            },
          ],
          series: scopeConfigValue.root.mapOptions.cates.map((cate: any) => {
            return {
              fieldId: cate.value,
              rollup: scopeConfigValue.root.mapOptions.calc || Rollup.MAX,
            };
          }),
        } as any,
        customConfig: scopeConfigValue.root,
      };
      return config;
    } else if (scopeConfigValue.root.mapType === "recordCategory") {
      if (!scopeConfigValue.root.mapOptions.series) {
        console.error("series is empty");
        return;
      }
      const config: IConfig = {
        dataConditions: {
          tableId: scopeConfigValue.root.tableId,
          dataRange: JSON.parse(scopeConfigValue.root.dataRange),
          groups: [
            {
              fieldId: scopeConfigValue.root.mapOptions.cate,
              sort: {
                order: ORDER.ASCENDING,
                sortType: DATA_SOURCE_SORT_TYPE.VIEW,
              },
              mode: scopeConfigValue.root.mapOptions.checkSplit
                ? GroupMode.ENUMERATED
                : GroupMode.INTEGRATED,
            },
          ],
          series: scopeConfigValue.root.mapOptions.series.map((series: any) => {
            return {
              fieldId: series.value,
              rollup: series.select,
            };
          }),
        } as any,
        customConfig: scopeConfigValue.root,
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
      <div style={{ width: "calc(100% - 340px)", padding: 20 }}>
        <VCharts option={echartsOption}></VCharts>
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
            updateScheme(newTarget, target);
            // setConfigValue(newTarget);
          }}
        ></ConfigUI>
        <div style={{ height: 100 }}></div>
        <div
          style={{
            position: "fixed",
            bottom: 0,
            right: 0,
            display: "flex",
            justifyContent: "end",
            background: "var(--feishu-color-bg)",
            borderRadius: 4,
            // width: 339,
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
