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
  DashboardState,
  GroupMode,
  ORDER,
  SourceType,
  type IConfig,
} from "@lark-base-open/js-sdk";
import ECharts from "@/components/echarts";
import { bsSdk } from "./factory";
import ViewPanel from "./ViewPanel";
import ConfigPanel from "./ConfigPanel";

export default function App() {
  switch (bsSdk.getDashState()) {
    case DashboardState.View:
      return ViewPanel({});
    case DashboardState.FullScreen:
      return ViewPanel({});
    default:
      return ConfigPanel({});
  }
}
