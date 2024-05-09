import { useTranslation } from "next-i18next";
import { BsSdk } from "@/libs/bs-sdk/BsSdk";
import { useRouter } from "next/router";
import ConfigUI from "@/components/config-ui";
import { fieldCategory, scheme } from "@/config/options";
import { useState } from "react";

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
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div style={{ width: 340 }}>
        <ConfigUI
          scheme={scheme}
          value={value}
          onChange={(target, field, value) => {
            setValue((prev) => {
              const next: any = { ...prev };
              next[target][field] = value;
              return next;
            });
          }}
        ></ConfigUI>
      </div>
    </div>
  );
}
