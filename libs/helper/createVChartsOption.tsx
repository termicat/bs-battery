import { theme } from "../config";

export function createVChartsOption(data: any[][], configRoot: any) {
  const colors = theme.light.find(
    (item) => item.value === configRoot.selectTheme
  )?.label;

  const spec = {
    type: "radar",
    color: colors,
    background: "rgba(0,0,0,0)",
    data: data
      .slice(1)
      .filter((item) => item[0].text)
      .map((row, index) => {
        const cols = data[0].slice(1);
        const name = row[0].text;

        return {
          values: row.slice(1).map((item, colIndex) => {
            const col = cols[colIndex];
            return {
              cate: name,
              value: item.value,
              type: col.text,
            };
          }),
        };
      })
      .reduce(
        (acc, cur: any) => {
          acc.values = acc.values.concat(cur.values);
          return acc;
        },
        {
          values: [],
        }
      ),
    // data: data[0].slice(1).map((col, colIndex) => {
    //   return {
    //     fields: {
    //       type: {
    //         type: "ordinal",
    //         sortIndex: 1,
    //       },
    //       value: {
    //         type: "linear", // 数据维度 value 的类型是连续类型
    //         // domain: [0, 10000], // 会提出 value 值不在 0-10000内的数据
    //       },
    //     },
    //     values: data
    //       .slice(1)
    //       .map((item) => {
    //         return {
    //           cate: item[0].text,
    //           value: item[colIndex + 1].value,
    //           type: col.text,
    //         };
    //       })
    //       .filter((item: any) => typeof item.value === "number")
    //       .sort((a: any, b: any) => a.value - b.value),
    //   };
    // }),
    // data: [
    //   {
    //     values: data[0]
    //       .slice(1)
    //       .map((col, colIndex) => {
    //         return {
    //           values: data.slice(1).map((item) => {
    //             return {
    //               cate: item[0].text,
    //               value: item[colIndex + 1].value,
    //               type: col.text,
    //             };
    //           }),
    //         };
    //       })
    //       .reduce((acc, cur: any) => acc.concat(cur.values), [])
    //       .filter((item: any) => typeof item.value === "number")
    //       .sort((a: any, b: any) => a.value - b.value),
    //     fields: {
    //       type: {
    //         type: "ordinal",
    //         sortIndex: 1,
    //       },
    //       value: {
    //         type: "linear", // 数据维度 value 的类型是连续类型
    //         // domain: [0, 10000], // 会提出 value 值不在 0-10000内的数据
    //       },
    //     },
    //   },
    // ],
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

    stack: false,
    // percent: configRoot.axisValue === "single",
    area: {
      visible: true,
    },
    axes: [
      {
        orient: "radius", // radius axis
        zIndex: 100,
        min: 0,
        domainLine: {
          visible: false,
        },
        label: {
          space: 0,
          style: {
            textAlign: "center",
            // stroke: '#fff',
            lineWidth: 4,
          },
          visible: configRoot.chartOptions.includes("showDataLabel"),
          // formatMethod:
          //   configRoot.axisValue === "single"
          //     ? (val: any) => {
          //         return val * 100 + "%";
          //       }
          //     : undefined,
        },
        grid: {
          smooth: false,
          style: {
            lineDash: [0],
          },
        },
      },
      {
        orient: "angle", // angle axis
        zIndex: 50,
        tick: {
          visible: false,
        },
        domainLine: {
          visible: false,
        },
        label: {
          space: 20,
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

  console.log(JSON.stringify(spec));

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
