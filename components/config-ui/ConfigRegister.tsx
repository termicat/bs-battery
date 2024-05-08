import ConfigArray from "./ConfigArray";
import ConfigEnums from "./ConfigEnums";
import ConfigString from "./ConfigString";
import ConfigObject from "./ConfigObject";
import ConfigSQL from "./ConfigSQL";
import ConfigInteger from "./ConfigInteger";

export const ConfigRegister: any = {
  object: () => ConfigObject,
  string: () => ConfigString,
  enums: () => ConfigEnums,
  array: () => ConfigArray,
  sql: () => ConfigSQL,
  integer: () => ConfigInteger,
};
