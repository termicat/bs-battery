import ConfigString, {
  type ConfigStringOptions,
  type ConfigStringProps,
} from "./ConfigString";
import ConfigArray from "./ConfigArray";
import ConfigEnums from "./ConfigEnums";
import ConfigObject, { type ConfigObjectOptions } from "./ConfigObject";
import ConfigInteger from "./ConfigInteger";
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
