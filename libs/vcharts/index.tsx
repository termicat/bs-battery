import VChart from "@visactor/vchart";
import { useEffect, useRef } from "react";
import { withResizeDetector } from "react-resize-detector";

export default withResizeDetector(function ECharts(props: any) {
  const { option, width } = props;
  const chartRef = useRef<HTMLDivElement>(null);
  const chartsInstance = useRef<VChart>();
  useEffect(() => {
    // 接听元素宽度变化

    const isDark = document.body.getAttribute("theme-mode") === "dark";

    // const chart = echarts.init(chartRef.current!, isDark ? "dark" : "light");
    console.log("option", option);
    if(option.type){
      const chart = new VChart(option, { dom: chartRef.current! });
      try {
        chart.renderSync();
      } catch (error) {
        console.error("renderSync error", error);
      }
      if (props.refInstance) props.refInstance.current = chart;
      chartsInstance.current = chart;
      return () => {
        chart.release();
      };
    }
  }, [option, props.refInstance, props.themeMode]);

  useEffect(() => {
    if (chartsInstance.current) {
      chartsInstance.current.renderSync();
    }
  }, [width]);

  return <div ref={chartRef} style={{ width: "100%", height: "100%" }}></div>;
});
