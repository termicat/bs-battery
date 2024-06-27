import VCharts from "@bc/vcharts";
import { withResizeDetector } from "react-resize-detector";

export default withResizeDetector(function MVCharts(options: any) {
  const echartsOption = options.echartsOption;
  return (
    <div
      style={{
        padding: 20,
        display: "grid",
        gridTemplateColumns: `repeat(${
          echartsOption.length === 4
            ? 2
            : echartsOption.length >= 3
            ? 3
            : echartsOption.length % 3
        }, 1fr)`,
        overflowY: "scroll",
        // overflowX: "hidden",
      }}
    >
      {echartsOption.map((item: any, index: any) => {
        return (
          <div key={item.title} style={{ width: "100%", aspectRatio: "1/1" }}>
            <VCharts option={item.option}></VCharts>
          </div>
        );
      })}
    </div>
  );
});
