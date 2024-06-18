import { theme } from "../config";

export function createVChartsOption(data: any[][], configRoot: any) {
  const colors = theme.light.find(
    (item) => item.value === configRoot.selectTheme
  )?.label;

  const spec = {
    type: "radar",
    color: colors,
    data: [
      {
        values: data[0]
          .slice(1)
          .map((col, colIndex) => {
            return {
              values: data.slice(1).map((item) => {
                return {
                  cate: item[0].text,
                  value: item[colIndex + 1].value,
                  type: col.text,
                };
              }),
            };
          })
          .reduce((acc, cur: any) => acc.concat(cur.values), [])
          .sort((a: any, b: any) => a.value - b.value),
        fields: {
          type: {
            type: "ordinal",
            sortIndex: 1,
          },
          value: {
            type: "linear", // 数据维度 value 的类型是连续类型
            // domain: [0, 10000], // 会提出 value 值不在 0-10000内的数据
          },
        },
      },
    ],
    valueField: "value",

    ...(configRoot.mapType === "recordCategory"
      ? {
          categoryField: "cate",
          seriesField: "type",
        }
      : {
          categoryField: "type",
          seriesField: "cate",
        }),

    stack: true,
    percent: configRoot.axisValue === "single",
    area: {
      visible: true,
    },
    axes: [
      {
        orient: "radius",
        min: 0,
        domainLine: {
          visible: true,
        },
        label: {
          visible: configRoot.chartOptions.includes("showDataLabel"),
          formatMethod:
            configRoot.axisValue === "single"
              ? (val: any) => {
                  return val * 100 + "%";
                }
              : undefined,
        },
        grid: {
          smooth: true,
        },
      },
      {
        orient: "angle",
        tick: {
          visible: false,
        },
        grid: {
          style: {
            lineDash: [0],
          },
        },
      },
    ],
    legends: {
      visible: configRoot.chartOptions.includes("showLegend"),
      orient: "top",
    },
  };

  return spec;
}

function when(cond: any, value: any) {
  return cond ? value : undefined;
}

function calculateMaxValues(series: any[]) {
  if (series.length === 0) return [];

  var numDimensions = series[0].value.length;
  var maxValues = new Array(numDimensions).fill(-Infinity);

  series.forEach(function (serie) {
    serie.value.forEach(function (val: number, index: number) {
      if (val > maxValues[index]) {
        maxValues[index] = val;
      }
    });
  });

  return maxValues;
}
