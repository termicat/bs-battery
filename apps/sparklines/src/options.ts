import i18n from "@bc/i18n";
import type { Node, Scheme } from "@bc/config-ui/types";
import { bsSdk } from "./views/Home/factory";
import * as chartsMap from '@bc/minicharts/chartsMap';
import { getDefaultValue, type NodeTypes } from "@bc/config-ui";

export const getPullScheme = async (
  configRoot: any = {},
  lastConfigRoot: any = configRoot,
  defaultTableIndex = 0
) => {
  console.log("start getPullScheme", {
    configRoot,
    lastConfigRoot,
  });

  const t = i18n.t.bind(i18n);
  const scheme = {
    field: "root",
    type: "object",
    properties: [] as Node<NodeTypes>[],
  };

  const rootChartType: Node<"select"> = {
    field: "chartType",
    label: t("Chart Type"),
    type: "select",
    options: [
      {
        value: 'radar',
        label: '雷达图',
        icon: "icons/table.svg",
        // raw: {},
      }
    ],
  };
  rootChartType.default =
    configRoot.chartType ?? rootChartType?.options?.[0].value;
  scheme.properties.push(rootChartType);

  const subChartsScheme =  await chartsMap.radar.scheme.default(bsSdk, configRoot.radar, lastConfigRoot.radar, defaultTableIndex);
  const chartsScheme = {
    field: "radar",
    type: "object",
    properties: subChartsScheme.properties as Node<NodeTypes>[],
    default: configRoot.radar ?? getDefaultValue(subChartsScheme as any),
  }

  scheme.properties.push(chartsScheme as any);

  console.log("getPullScheme", scheme);
 
  return scheme;
};
