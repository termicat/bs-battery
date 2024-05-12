import { useTranslation } from "next-i18next";
import { BsSdk } from "@/libs/bs-sdk/BsSdk";
import { useRouter } from "next/router";
import ConfigUI from "@/components/config-ui";
import { createScheme, fieldCategory, scheme } from "@/config/options";
import { useEffect, useState } from "react";
import { Button } from "@douyinfe/semi-ui";
import type { Scheme } from "@/components/config-ui/types";
import { tranBIData } from "@/libs/helper/config-ui";

const bsSdk = new BsSdk({});

let btId = "";
let btUrl = "";
let glang = "zh";

export default function App() {
  const router = useRouter();
  const [t, i18n] = useTranslation();
  const [value, setValue] = useState({} as any);
  const [scheme, setScheme] = useState<Scheme>({
    type: "object",
    field: "",
  });

  useEffect(() => {
    async function init() {
      const tables = await bsSdk.getTableList();
      console.log("getTableList", tables);
      setScheme(
        createScheme({
          tables,
        })
      );
    }
    init();
  }, []);

  useEffect(() => {
    async function updateViews() {
      const { selectTable } = value;
      if (selectTable) {
        const table = selectTable;
        console.log("selectTable", table);

        const views = await bsSdk.getViewList(table);

        console.log("getViewList", views);
        if (scheme?.properties?.[1].options) {
          scheme.properties[1] = {
            ...scheme.properties[1],
            options: tranBIData(views),
          };
          console.log(scheme);
        } else {
          console.error("scheme.properties[1].options is null");
        }

        setScheme({ ...scheme });
      }
    }
    updateViews();
  }, [value?.selectTable]);

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
