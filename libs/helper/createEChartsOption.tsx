export function createEChartsOption(data: any[][], configRoot: any) {
  const type = configRoot.mapType;
  if (type === "fieldCategory") {
    const echartsOption = {
      legend: configRoot.chartOptions.includes("showLegend")
        ? {
            data: data[0]?.slice(1)?.map?.((item) => item.text),
          }
        : undefined,
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
            };
          }),
        },
      ],
    };
    console.log("echartsOption", echartsOption);

    return echartsOption;
  } else {
    const echartsOption = {
      legend: configRoot.chartOptions.includes("showLegend")
        ? {
            data: data.slice(1).map((item) => item[0].text),
          }
        : undefined,
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
            };
          }),
        },
      ],
    };
    console.log("echartsOption2", echartsOption);

    return echartsOption;
  }
}
