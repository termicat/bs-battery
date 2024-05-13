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

const bsSdk = new BsSdk({});

let btId = "";
let btUrl = "";
let glang = "zh";

export default function App() {
  const router = useRouter();
  const [t, i18n] = useTranslation();
  const [value, setValue] = useState({ root: {} as any });
  const [scheme, setScheme] = useState<Scheme>({
    type: "object",
    field: "",
  });

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
      const { tableId } = value.root;
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

        setValue({ root: { ...value.root, dataRange: defaultView } });
        setScheme({ ...scheme });
      }
    }
    updateViews();
  }, [value?.root?.tableId]);

  useEffect(() => {
    async function updateFields() {
      console.log("updateFields", value.root.dataRange);
      if (!value.root.dataRange) {
        return;
      }
      const dataRange = JSON.parse(value.root.dataRange);
      const fields = await bsSdk.getFiledListByViewId(
        value.root.tableId,
        dataRange.viewId
      );
      console.log("getFieldList", fields);

      const fieldsOptions = tranBIData(fields);

      if (value?.root?.mapType === "fieldCategory") {
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
        setValue({
          root: {
            ...value.root,
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
              {
                label: "数量",
                value: "COUNT",
              },
            ],
          },
          default: [],
        });
        const mapOptions = getSchemeByPath(scheme, "mapOptions");
        setValue({
          root: {
            ...value.root,
            mapOptions: getDefaultValue(mapOptions),
          },
        });
      }

      setScheme({ ...scheme });
    }
    updateFields();
  }, [value?.root?.dataRange, value?.root?.mapType]);

  useEffect(() => {
    setScheme((oldScheme) => {
      const newScheme = oldScheme;
      const mapOptions = getSchemeByPath(
        createScheme(value.root.mapType),
        "mapOptions"
      );
      setValue({
        root: {
          ...value.root,
          mapOptions: getDefaultValue(mapOptions),
        },
      });
      setSchemeByPath(newScheme, "mapOptions", mapOptions);
      return newScheme;
    });
  }, [value?.root?.mapType]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ width: 340 }}>
          <ConfigUI
            scheme={scheme}
            value={value}
            onChange={(target, field, value) => {
              console.log("Root onChange", target, field, value);

              target[field] = value;
              setValue({ ...target });
            }}
          ></ConfigUI>
          <Button
            style={{ marginTop: 20, float: "right" }}
            type="primary"
            onClick={() => {
              // bsSdk.saveConfig(value.root);
              const config: IConfig = {
                dataConditions: {
                  tableId: value.root.tableId,
                  dataRange: JSON.parse(value.root.dataRange),
                  groups: [
                    {
                      fieldId: value.root.mapOptions.series,
                      sort: {
                        order: ORDER.ASCENDING,
                        sortType: DATA_SOURCE_SORT_TYPE.VIEW,
                      },
                      mode: GroupMode.ENUMERATED,
                    },
                  ],
                  series: [
                    {
                      fieldId: value.root.mapOptions.series,
                      rollup: value.root.mapOptions.calc,
                    },
                  ],
                },
                customConfig: value.root,
              };

              bsSdk.saveConfig(config);
            }}
          >
            创建
          </Button>
        </div>

        <pre
          style={{
            width: 340,
            marginLeft: 10,
            padding: 10,
            border: "1px solid #eee",
          }}
        >
          {JSON.stringify(value, null, 2)}
        </pre>
      </div>
    </div>
  );
}
