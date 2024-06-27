import { useEffect, useRef } from "react";
import { withResizeDetector } from "react-resize-detector";


export default withResizeDetector(function ECharts(props: any) {
  const { option, width } = props;
  const chartRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // 接听元素宽度变化

    const isDark = document.body.getAttribute("theme-mode") === "dark";


  }, [option, props.refInstance, props.themeMode]);

  useEffect(() => {

  }, [width]);

  return <div ref={chartRef} style={{ width: "100%", height: "100%", display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', }}>
    {/* <iframe src="http://localhost:3001/#minicharts?id=1" width="100%" style={{aspectRatio: '1/1', border:'none', padding: 5}}></iframe>
    <iframe src="http://localhost:3001/#minicharts?id=2" width="100%" style={{aspectRatio: '1/1', border:'none', padding: 5}}></iframe>
    <iframe src="http://localhost:3001/#minicharts?id=3" width="100%" style={{aspectRatio: '1/1', border:'none', padding: 5}}></iframe>
    <iframe src="http://localhost:3001/#minicharts?id=4" width="100%" style={{aspectRatio: '1/1', border:'none', padding: 5}}></iframe>
    <iframe src="http://localhost:3001/#minicharts?id=5" width="100%" style={{aspectRatio: '1/1', border:'none', padding: 5}}></iframe>
    <iframe src="http://localhost:3001/#minicharts?id=6" width="100%" style={{aspectRatio: '1/1', border:'none', padding: 5}}></iframe> */}
  </div>;
});
