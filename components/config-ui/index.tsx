import ConfigObject from "./ConfigObject";
import type { Scheme } from "./types";

type ConfigUIProps<Value> = {
  scheme: Scheme;
  value: Value;
  onChange?: (target: any, field: string, val: any) => void;
}

export default function ConfigUI<Value>(props: ConfigUIProps<Value>) {
  return (
    <ConfigObject
      properties={props.scheme.properties}
      value={props.value}
      onChange={(target: any, field: string, val: any) => {
        target[field] = val;
        props.onChange?.(target, field, val);
      }}
    ></ConfigObject>
  );
}
