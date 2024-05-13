import ConfigString, {
  type ConfigStringOptions,
  type ConfigStringProps,
} from "./item/ConfigString";
import ConfigArray from "./item/ConfigArray";
import ConfigEnums from "./item/ConfigEnums";
import ConfigObject, { type ConfigObjectOptions } from "./item/ConfigObject";
import ConfigInteger from "./item/ConfigInteger";
import type { ConfigItemProps } from "./ConfigItemProps";
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
import ConfigSelectField, {
  type ConfigSelectOptions,
} from "./item/ConfigSelect";
import type { Node, Scheme } from "./types";
import type { ConfigDownSelectOptions } from "./item/ConfigDownSelect";
import ConfigDownSelect from "./item/ConfigDownSelect";

function reg<F>(fn: F) {
  return fn;
}

export const ConfigRegister = {
  object: reg((p: ConfigObjectOptions) => ConfigObject),
  string: reg((p: ConfigStringOptions) => ConfigString),
  "select-tabs": reg((p: ConfigSelectTabsOptions) => ConfigSelectTabs),
  "select-theme": reg((p: ConfigSelectThemeOptions) => ConfigSelectTheme),
  checkboxes: reg((p: ConfigCheckboxesOptions) => ConfigCheckboxes),
  line: reg(() => ConfigLine),
  "field-list": reg((p: ConfigFieldListOptions) => ConfigFieldList),
  select: reg((p: ConfigSelectOptions) => ConfigSelectField),
  "down-select": reg((p: ConfigDownSelectOptions) => ConfigDownSelect),
};

export function getConfigRegister(type: NodeTypes): any {
  if (!ConfigRegister[type]) {
    console.error(`未找到注册的组件: ${type}`);
  }
  return (ConfigRegister[type] as any)();
}

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
      if (!property.field) return acc;
      acc[property.field] = getDefaultValue(property);
      return acc;
    }, obj);
  }

  return defaultValue;
}

export function setSchemeByPath(
  scheme: Scheme,
  path: string,
  node: Partial<Node<NodeTypes>>
) {
  const paths = path.split(".");
  let current: any = scheme;
  for (let i = 0; i < paths.length; i++) {
    const p = paths[i];
    const currentNode = current.properties?.find(
      (item: any) => item.field === p
    );
    if (!currentNode) {
      console.error(`未找到路径: ${path}`);
      break;
    }
    current = currentNode;
  }
  Object.assign(current, node);
  return {
    scheme,
    current,
  };
}

export function getSchemeByPath(scheme: Scheme, path: string) {
  const paths = path.split(".");
  let current: any = scheme;
  for (let i = 0; i < paths.length; i++) {
    const p = paths[i];
    const currentNode = current.properties?.find(
      (item: any) => item.field === p
    );
    if (!currentNode) {
      console.error(`未找到路径: ${path}`);
      return;
    }
    current = currentNode;
  }
  return current;
}
