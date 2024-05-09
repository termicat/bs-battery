import { useTranslation } from "next-i18next";
import { BsSdk } from "@/libs/bs-sdk/BsSdk";
import { useRouter } from "next/router";
import ConfigUI from "@/components/config-ui";
import { fieldCategory, scheme } from "@/config/options";
import { useState } from "react";
import { Button } from "@douyinfe/semi-ui";

// const bsSdk = new BsSdk({});

let btId = "";
let btUrl = "";
let glang = "zh";

export default function App() {
  const router = useRouter();
  const [t, i18n] = useTranslation();
  const [value, setValue] = useState(fieldCategory);

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
