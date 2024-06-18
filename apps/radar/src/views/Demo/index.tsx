import Echarts from "@bc/vcharts/index";

export default function DemoView() {
  return (
    <div style={{ height: "100vh" }}>
      <Echarts
        option={{
          theme: "p1",
          color: [
            "#2e65d1",
            "#50cefb",
            "#935af6",
            "#fad355",
            "#f54a45",
            "#ffa53d",
          ],
          tooltip: {},
          backgroundColor: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "rgba(0,0,0,0)",
              },
              {
                offset: 1,
                color: "rgba(0,0,0,0)",
              },
            ],
          },
          legend: {
            data: ["100 米", "200 米", "300米", "500米"],
          },
          radar: {
            indicator: [
              {
                name: "张三204",
              },
              {
                name: "李四",
              },
              {
                name: "王二",
              },
              {
                name: "小苹果",
              },
            ],
          },
          series: [
            {
              name: "Data",
              type: "radar",
              data: [
                {
                  emphasis: {
                    itemStyle: {
                      focus: "self",
                    },
                  },
                  areaStyle: {
                    opacity: 0.3,
                  },
                  value: [12, 33, 22, 11],
                  name: "100 米",
                  label: {
                    show: true,
                    textBorderWidth: 0,
                    textBorderColor: "rgba(0,0,0,0)",
                  },
                },
                {
                  emphasis: {
                    itemStyle: {
                      focus: "self",
                    },
                  },
                  areaStyle: {
                    opacity: 0.3,
                  },
                  value: [44, 22, 11, 44],
                  name: "200 米",
                  label: {
                    show: true,
                    textBorderWidth: 0,
                    textBorderColor: "rgba(0,0,0,0)",
                  },
                },
                {
                  emphasis: {
                    itemStyle: {
                      focus: "self",
                    },
                  },
                  areaStyle: {
                    opacity: 0.3,
                  },
                  value: [32, 44, 66, 77],
                  name: "300米",
                  label: {
                    show: true,
                    textBorderWidth: 0,
                    textBorderColor: "rgba(0,0,0,0)",
                  },
                },
                {
                  emphasis: {
                    itemStyle: {
                      focus: "self",
                    },
                  },
                  areaStyle: {
                    opacity: 0.3,
                  },
                  value: [1, 2, 3, 4],
                  name: "500米",
                  label: {
                    show: true,
                    textBorderWidth: 0,
                    textBorderColor: "rgba(0,0,0,0)",
                  },
                },
              ],
            },
          ],
        }}
      />
    </div>
  );
}
