import ConfigString, {
  type ConfigStringOptions,
  type ConfigStringProps,
} from "./item/ConfigString";
import ConfigArray from "./item/ConfigArray";
import ConfigEnums from "./item/ConfigEnums";
import ConfigObject, { type ConfigObjectOptions } from "./item/ConfigObject";
import ConfigInteger from "./item/ConfigInteger";
import type { ConfigItemProps } from "./ConfigItemProps";


function reg<F>(fn: F) {
  return fn;
}

export const ConfigRegister = {
  object: reg((p: ConfigObjectOptions) => ConfigObject),
  string: reg((p: ConfigStringOptions) => ConfigString),
  // enums: reg(()=>ConfigEnums),
  // array: reg(()=>ConfigArray),
  // integer: reg(()=>ConfigInteger),
};

export type NodeTypes = keyof typeof ConfigRegister;

export type NodeOptions<T extends NodeTypes> = Parameters<
  (typeof ConfigRegister)[T]
>[0];
