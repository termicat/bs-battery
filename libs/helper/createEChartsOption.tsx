import { theme } from "../config";

export function createEChartsOption(data: any[][], configRoot: any) {
  const colors = theme.light.find(
    (item) => item.value === configRoot.selectTheme
  )?.label;
  // const isDark = document.body.getAttribute("theme-mode") === "dark";
  const common = {
    theme: configRoot.selectTheme,
    color: colors,
    tooltip: {
      // trigger: "item",
      // formatter: function (p: any) {
      //   console.log(p.seriesIndex, p.value[p.seriesIndex], p);
      //   // 在 tooltip 中显示的内容可以根据需求自定义
      //   return `<div style="display: flex;">
      //   <li style="color:${p.color};font-size: 30px;margin-right: -25px"></li>
      //   ${p.name}: ${p.value[p.dataIndex]}
      // <div>`;
      // },
    },
    backgroundColor: {
      // 透明
      type: "linear",
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [
        {
          offset: 0,
          color: "rgba(0,0,0,0)", // 0% 处的颜色
        },
        {
          offset: 1,
          color: "rgba(0,0,0,0)", // 100% 处的颜色
        },
      ],
    },
  };
  const seriesCommon = {
    emphasis: {
      // 设置鼠标悬停时的样式
      itemStyle: {
        // borderColor: "", // 设置边框颜色
        // borderWidth: 10, // 设置边框宽度
        focus: "self",
      },
    },
    areaStyle: {
      opacity: 0.3,
    },
  };
  const type = configRoot.mapType;
  if (type === "fieldCategory") {
    const echartsOption = {
      ...common,
      legend: when(configRoot.chartOptions.includes("showLegend"), {
        data: data[0]?.slice(1)?.map?.((item) => item.text),
      }),
      radar: {
        // shape: 'circle',
        indicator: data.slice(1).map((item) => {
          return {
            name: item[0].text,
            // max: 10,
          };
        }),
      },
      series: [
        {
          name: "Data",
          type: "radar",
          data: data[0]?.slice(1)?.map?.((item, index) => {
            return {
              ...seriesCommon,
              // tooltip: {
              //   show: true,
              //   formatter: function (p: any) {
              //     console.log(p.seriesIndex, p.value[p.seriesIndex], p);
              //     // 在 tooltip 中显示的内容可以根据需求自定义
              //     return `<div style="display: flex;">
              //     <li style="color:${
              //       p.color
              //     };font-size: 30px;margin-right: -25px"></li>
              //     ${p.name}: ${p.value[p.dataIndex]}
              //   <div>`;
              //   },
              // },
              value: data.slice(1).map((item) => item[index + 1].value),
              name: item.text,
              label: when(configRoot.chartOptions.includes("showDataLabel"), {
                show: true,
                textBorderWidth: 0,
                textBorderColor: "rgba(0,0,0,0)",
              }),
            };
          }),
        },
      ],
    };
    console.log("echartsOption", echartsOption);

    return echartsOption;
  } else {
    const echartsOption = {
      ...common,
      legend: when(configRoot.chartOptions.includes("showLegend"), {
        data: data.slice(1).map((item) => item[0].text),
      }),
      radar: {
        // shape: 'circle',
        indicator: data[0]?.slice(1)?.map((item) => {
          return {
            name: item.text,
            // max: 10,
          };
        }),
      },
      series: [
        {
          name: "Data",
          type: "radar",
          data: data.slice(1).map((item, index) => {
            return {
              ...seriesCommon,
              // tooltip: {
              //   show: true,
              //   formatter: function (p: any) {
              //     console.log(index, p.value[index], p);
              //     // 在 tooltip 中显示的内容可以根据需求自定义
              //     return `<div style="display: flex;">
              //     <li style="color:${p.color};font-size: 30px;margin-right: -25px"></li>
              //     ${p.name}: ${p.value[index]}
              //   <div>`;
              //   },
              // },
              value: item.slice(1).map((item) => item.value),
              name: item[0].text,
              label: when(configRoot.chartOptions.includes("showDataLabel"), {
                show: true,
                textBorderWidth: 0,
                textBorderColor: "rgba(0,0,0,0)",
              }),
            };
          }),
        },
      ],
    };
    console.log("echartsOption2", echartsOption);

    return echartsOption;
  }
}

function when(cond: any, value: any) {
  return cond ? value : undefined;
}
