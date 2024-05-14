import ECharts from "@/components/echarts";
import { useEffect, useState } from "react";
import { bsSdk } from "./factory";
import { createEChartsOption } from "@/libs/helper/createEChartsOption";

type ViewPanelProps = {};

export default function ViewPanel(props: ViewPanelProps) {
  const [echartsOption, setEchartsOption] = useState({} as any);

  async function updateEcharts(e?: any) {
    const config = await bsSdk.getConfig();
    const data = await bsSdk.getData();
    console.log("getPreviewData", config, data, e);
    setEchartsOption(createEChartsOption(data, config.customConfig));
    bsSdk.triggerDashRendered();
  }

  useEffect(() => {
    updateEcharts();
    const offs: (() => void)[] = [];
    offs.push(bsSdk.emDashConfigChange.on(updateEcharts));
    offs.push(bsSdk.emDashDataChange.on(updateEcharts));
    return () => {
      offs.forEach((off) => off());
    };
  }, []);

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <ECharts option={echartsOption}></ECharts>
    </div>
  );
}
