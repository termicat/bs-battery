import MiniCharts from "@bc/minicharts";
import { useEffect, useState } from "react";
import { bsSdk } from "./factory";
import { createVChartsOption } from "@bc/helper/createVChartsOption";
import { useDebounceCallback } from "@bc/helper/useDebounce";

type ViewPanelProps = { themeMode?: any };

export default function ViewPanel(props: ViewPanelProps) {
  const [echartsOption, setEchartsOption] = useState({} as any);

  const updateEcharts = useDebounceCallback(async (e?: any) => {
    console.log("updateEcharts");
    const config = await bsSdk.getConfig();
    const data = await bsSdk.getData();
    console.log("getPreviewData", config, data, e);
    setEchartsOption(createVChartsOption(data, config.customConfig));
    bsSdk.triggerDashRendered();
  }, 300);

  useEffect(() => {
    updateEcharts();
    const offs: (() => void)[] = [];
    // offs.push(bsSdk.emDashConfigChange.on(updateEcharts));
    offs.push(bsSdk.emDashDataChange.on(updateEcharts));
    return () => {
      offs.forEach((off) => off());
    };
  }, []);

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <MiniCharts option={echartsOption} themeMode={props.themeMode}></MiniCharts>
    </div>
  );
}
