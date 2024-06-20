import { theme } from "../config";

export function createVChartsOption(data: any[][], configRoot: any) {
  const colors = theme.light.find(
    (item) => item.value === configRoot.selectTheme
  )?.label;
  const data2 = data
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
  );
  const max = calculateMaxValues(data2.values);
  const spec = {
    type: "radar",
    color: colors,
    background: "rgba(0,0,0,0)",
    data: data2,
    padding: 0,
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
        max,
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

function calculateMaxValues(data2: any[]) {
  return data2.reduce((acc, cur) => {
    return Math.max(
      acc,
      cur.value
    );
  }, 0);
}
