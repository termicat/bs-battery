import VCharts from "@bc/vcharts";

export default function MinichartsView() {
  return (
    <div style={{ height: "100vh" }}>
      <VCharts
        option={{
          type: "radar",
          color: [
            "#2e65d1",
            "#50cefb",
            "#935af6",
            "#fad355",
            "#f54a45",
            "#ffa53d",
          ],
          background: "rgba(0,0,0,0)",
          data: {
            values: [
              { cate: "食材类", value: 420, type: "实际支出" },
              { cate: "食材类", value: 500, type: "预算" },
              { cate: "饮品类", value: 350, type: "实际支出" },
              { cate: "饮品类", value: 560, type: "预算" },
              { cate: "酒水类", value: 500, type: "实际支出" },
              { cate: "酒水类", value: 620, type: "预算" },
              { cate: "服务类", value: 180, type: "实际支出" },
              { cate: "服务类", value: 240, type: "预算" },
              { cate: "娱乐", value: 390, type: "实际支出" },
              { cate: "娱乐", value: 400, type: "预算" },
              { cate: "学习", value: 240, type: "实际支出" },
              { cate: "学习", value: 300, type: "预算" },
            ],
          },
          padding: 0,
          valueField: "value",
          categoryField: "cate",
          seriesField: "type",
          stack: false,
          area: { visible: true },
          axes: [
            {
              orient: "radius",
              zIndex: 100,
              max: 620,
              domainLine: { visible: false },
              label: {
                space: 0,
                style: { textAlign: "center", lineWidth: 4 },
                visible: true,
              },
              grid: { smooth: false, style: { lineDash: [0] } },
            },
            {
              orient: "angle",
              zIndex: 50,
              tick: { visible: false },
              domainLine: { visible: false },
              label: { space: 20 },
              grid: { style: { lineDash: [0] } },
            },
          ],
          legends: { visible: true, orient: "top" },
        }}
      ></VCharts>
    </div>
  );
}
