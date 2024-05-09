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


function reg<F>(fn: F) {
  return fn;
}

export const ConfigRegister = {
  object: reg((p: ConfigObjectOptions) => ConfigObject),
  string: reg((p: ConfigStringOptions) => ConfigString),
  'select-table': reg((p: ConfigSelectTableOptions) => ConfigSelectTable),
  // enums: reg(()=>ConfigEnums),
  // array: reg(()=>ConfigArray),
  // integer: reg(()=>ConfigInteger),
};

export type NodeTypes = keyof typeof ConfigRegister;

export type NodeOptions<T extends NodeTypes> = Parameters<
  (typeof ConfigRegister)[T]
>[0];
