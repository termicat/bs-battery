import { useEffect, useState } from "react";
import { bsSdk } from "./factory";
import { createVChartsOption } from "@bc/helper/createVChartsOption";
import { useDebounceCallback } from "@bc/helper/useDebounce";
import { vchartsOptionSplit } from "./vchartsOptionSplit";
import MVCharts from "./MVCharts";

type ViewPanelProps = { themeMode?: any };

export default function ViewPanel(props: ViewPanelProps) {
  const [echartsOption, setEchartsOption] = useState([] as any);

  const updateEcharts = useDebounceCallback(async (e?: any) => {
    console.log("updateEcharts");
    const config: any = await bsSdk.getConfig();
    const data = await bsSdk.getData();

    const chartsOptions = createVChartsOption(
      data,
      config.customConfig[config.customConfig.chartType]
    );
    const splitOptions = vchartsOptionSplit(chartsOptions);
    setEchartsOption(splitOptions);
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
      <MVCharts echartsOption={echartsOption}></MVCharts>
    </div>
  );
}
