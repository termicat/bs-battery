import * as echarts from "echarts";
import { useEffect, useRef } from "react";
import { withResizeDetector } from "react-resize-detector";

export default withResizeDetector(function ECharts(props: any) {
  const { option, width } = props;
  const chartRef = useRef<HTMLDivElement>(null);
  const echartsInstance = useRef<echarts.ECharts>();
  useEffect(() => {
    // 接听元素宽度变化
    const chart = echarts.init(chartRef.current!);
    console.log(chart);
    chart.setOption(option);
    if (props.refInstance) props.refInstance.current = chart;
    echartsInstance.current = chart;
    return () => {
      chart.dispose();
    };
  }, [option, props.refInstance]);

  useEffect(() => {
    if (echartsInstance.current) {
      echartsInstance.current.resize();
    }
  }, [width]);

  return <div ref={chartRef} style={{ width: "100%", height: "100%" }}></div>;
});
