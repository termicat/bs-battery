import ConfigString, { type ConfigStringOptions, type ConfigStringProps } from "./ConfigString";
import ConfigArray from "./ConfigArray";
import ConfigEnums from "./ConfigEnums";
import ConfigObject, { type ConfigObjectOptions } from "./ConfigObject";
import ConfigInteger from "./ConfigInteger";
import type { ConfigItemProps } from "./ConfigItemProps";

// function reg<F extends (p: P)=>R, P extends ConfigItemProps<, O>, R, T, O>(fn: ()=>F) {
//   return fn
// }

function reg<F>(fn: F){
  return fn
}

export const ConfigRegister = {
  object: reg((p: ConfigStringOptions)=>ConfigObject),
  string: reg((p: ConfigObjectOptions)=>ConfigString),
  // enums: reg(()=>ConfigEnums),
  // array: reg(()=>ConfigArray),
  // integer: reg(()=>ConfigInteger),
};


export type NodeTypes = keyof typeof ConfigRegister;

export type NodeOptions<T extends NodeTypes> = Parameters<typeof ConfigRegister[T]>[0];

