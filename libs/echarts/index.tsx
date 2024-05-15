import * as echarts from "echarts";
import { useEffect, useRef } from "react";
import { withResizeDetector } from "react-resize-detector";
import bcDark from "./themes/bc-dark";

export default withResizeDetector(function ECharts(props: any) {
  const { option, width } = props;
  const chartRef = useRef<HTMLDivElement>(null);
  const echartsInstance = useRef<echarts.ECharts>();
  useEffect(() => {
    // 接听元素宽度变化
    console.log("theme", bcDark(option.theme), option.theme);

    const isDark = document.body.getAttribute("theme-mode") === "dark";

    const chart = echarts.init(chartRef.current!, isDark ? "dark" : "light");
    chart.setOption(option);
    if (props.refInstance) props.refInstance.current = chart;
    echartsInstance.current = chart;
    return () => {
      chart.dispose();
    };
  }, [option, props.refInstance, props.themeMode]);

  useEffect(() => {
    if (echartsInstance.current) {
      echartsInstance.current.resize();
    }
  }, [width]);

  return <div ref={chartRef} style={{ width: "100%", height: "100%" }}></div>;
});
