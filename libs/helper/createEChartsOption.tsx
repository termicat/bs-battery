export function createEChartsOption(data: any[][], configRoot: any) {
  const common = {
    theme: configRoot.selectTheme,
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
              value: data.slice(1).map((item) => item[index + 1].value),
              name: item.text,
              label: when(configRoot.chartOptions.includes("showDataLabel"), {
                show: true,
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
          data: data.slice(1).map((item) => {
            return {
              value: item.slice(1).map((item) => item.value),
              name: item[0].text,
              label: when(configRoot.chartOptions.includes("showDataLabel"), {
                show: true,
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
