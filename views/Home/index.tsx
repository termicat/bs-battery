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
      setSchemeByPath(newScheme, "selectTable", {
        default: o1[0].value,
        options: o1,
      });
      setScheme(newScheme);
    }
    init();
  }, []);

  useEffect(() => {
    async function updateViews() {
      const { selectTable } = value.root;
      if (selectTable) {
        const table = selectTable;
        console.log("selectTable", table);

        const views = await bsSdk.getViewList(table);

        const defaultViewId = views[0].id;

        // console.log("getViewList", views);
        setSchemeByPath(scheme, "selectView", {
          options: tranBIData(views),
          default: defaultViewId,
        });

        setValue({ root: { ...value.root, selectView: defaultViewId } });
        setScheme({ ...scheme });
      }
    }
    updateViews();
  }, [value?.root?.selectTable]);

  useEffect(() => {
    async function updateFields() {
      console.log("updateFields", value.root.selectView);
      const fields = await bsSdk.getFiledListByViewId(
        value.root.selectTable,
        value.root.selectView
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
                value: "max",
              },
              {
                label: "最小值",
                value: "min",
              },
              {
                label: "求和",
                value: "sum",
              },
              {
                label: "平均值",
                value: "avg",
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
  }, [value?.root?.selectView, value?.root?.mapType]);

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
