import { useEffect, useState } from "react";
import { bsSdk } from "./factory";
import { createEChartsOption } from "@bc/helper/createEChartsOption";
import BatteryChart from "../../components/BatteryChart";
import { createChartOption } from "../../options";

type ViewPanelProps = { themeMode?: any };

export default function ViewPanel(props: ViewPanelProps) {
  const [echartsOption, setEchartsOption] = useState([] as any);

  async function updateEcharts(e?: any) {
    const config = await bsSdk.getConfig();
    const data = await bsSdk.getData();
    console.log("getPreviewData", config, data, e);
    setEchartsOption(createChartOption(data, config.customConfig));
    bsSdk.triggerDashRendered();
  }

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
