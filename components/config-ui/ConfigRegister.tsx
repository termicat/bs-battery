import ConfigString, {
  type ConfigStringOptions,
  type ConfigStringProps,
} from "./item/ConfigString";
import ConfigArray from "./item/ConfigArray";
import ConfigEnums from "./item/ConfigEnums";
import ConfigObject, { type ConfigObjectOptions } from "./item/ConfigObject";
import ConfigInteger from "./item/ConfigInteger";
import type { ConfigItemProps } from "./ConfigItemProps";
import type { ConfigSelectTableOptions } from "./item/ConfigSelectTable";
import ConfigSelectTable from "./item/ConfigSelectTable";
import type { ConfigSelectViewOptions } from "./item/ConfigSelectView";
import ConfigSelectView from "./item/ConfigSelectView";
import type { ConfigSelectTabsOptions } from "./item/ConfigSelectTabs";
import ConfigSelectTabs from "./item/ConfigSelectTabs";
import type { ConfigSelectThemeOptions } from "./item/ConfigSelectTheme";
import ConfigSelectTheme from "./item/ConfigSelectTheme";
import type { ConfigCheckboxesOptions } from "./item/ConfigCheckboxes";
import ConfigCheckboxes from "./item/ConfigCheckboxes";
import ConfigLine from "./item/ConfigLine";
import ConfigFieldList, {
  type ConfigFieldListOptions,
} from "./item/ConfigFieldList";
import type { ConfigSelectFieldOptions } from "./item/ConfigSelectField";
import ConfigSelectField from "./item/ConfigSelectField";
import type { Node } from "./types";
import type { ConfigDownSelectOptions } from "./item/ConfigDownSelect";
import ConfigDownSelect from "./item/ConfigDownSelect";

function reg<F>(fn: F) {
  return fn;
}

export const ConfigRegister = {
  object: reg((p: ConfigObjectOptions) => ConfigObject),
  string: reg((p: ConfigStringOptions) => ConfigString),
  "select-table": reg((p: ConfigSelectTableOptions) => ConfigSelectTable),
  "select-view": reg((p: ConfigSelectViewOptions) => ConfigSelectView),
  "select-tabs": reg((p: ConfigSelectTabsOptions) => ConfigSelectTabs),
  "select-theme": reg((p: ConfigSelectThemeOptions) => ConfigSelectTheme),
  checkboxes: reg((p: ConfigCheckboxesOptions) => ConfigCheckboxes),
  line: reg(() => ConfigLine),
  "field-list": reg((p: ConfigFieldListOptions) => ConfigFieldList),
  "select-field": reg((p: ConfigSelectFieldOptions) => ConfigSelectField),
  "down-select": reg((p: ConfigDownSelectOptions) => ConfigDownSelect),
};

export type NodeTypes = keyof typeof ConfigRegister;

export type NodeOptions<T extends NodeTypes> = Parameters<
  (typeof ConfigRegister)[T]
>[0];

export function getDefaultValue(node: Node<NodeTypes>) {
  const defaultValue = node.default;

  if (node.type === "object") {
    const obj = defaultValue || {};
    const properties = node.properties || [];

    return properties.reduce((acc, property) => {
      acc[property.field] = getDefaultValue(property);
      return acc;
    }, obj);
  }

  return defaultValue;
}
