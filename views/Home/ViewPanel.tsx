import ECharts from "@/components/echarts";
import { useEffect, useState } from "react";
import { bsSdk } from "./factory";
import { createEChartsOption } from "@/libs/helper/createEChartsOption";

type ViewPanelProps = {};

export default function ViewPanel(props: ViewPanelProps) {
  const [echartsOption, setEchartsOption] = useState({} as any);

  useEffect(() => {
    async function updateEcharts() {
      const config = await bsSdk.getConfig();
      const data = await bsSdk.getData();
      console.log("getPreviewData", data);
      setEchartsOption(createEChartsOption(data, config.customConfig));
    }
    updateEcharts();
  }, []);

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <ECharts option={echartsOption}></ECharts>
    </div>
  );
}
