import { useEffect, useState } from "react";
import { bsSdk } from "./factory";
import BatteryChart from "../../components/BatteryChart";
import { createChartOption } from "../../options";
import { useDebounceCallback } from "@bc/helper/useDebounce";

type ViewPanelProps = { themeMode?: any };

export default function ViewPanel(props: ViewPanelProps) {
  const [echartsOption, setEchartsOption] = useState([] as any);
  const [backgroundColor, setBackgroundColor] = useState("#fff");

  const updateEcharts = useDebounceCallback(async function updateEcharts(
    e?: any
  ) {
    const config = await bsSdk.getConfig();
    const data = await bsSdk.getData();
    const [newTheme] = await bsSdk.emThemeChange.wait();
    console.log("getPreviewData", config, data, e, newTheme);
    setBackgroundColor(newTheme.data.chartBgColor);
    setEchartsOption(
      createChartOption(data, config.customConfig, newTheme.data)
    );
    bsSdk.triggerDashRendered();
  },
  100);

  useEffect(() => {
    updateEcharts();
    const offs: (() => void)[] = [];
    offs.push(bsSdk.emDashConfigChange.on(updateEcharts));
    offs.push(bsSdk.emDashDataChange.on(updateEcharts));
    offs.push(bsSdk.emThemeChange.on(updateEcharts));
    return () => {
      offs.forEach((off) => off());
    };
  }, []);

  return (
    <div style={{ width: "100%", height: "100vh", backgroundColor }}>
      <div
        style={{
          flex: 1,
          padding: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <BatteryChart
          style={{ width: "90%", height: "80%" }}
          list={echartsOption}
        ></BatteryChart>
      </div>
    </div>
  );
}
