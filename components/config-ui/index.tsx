import ConfigObject, { type ConfigObjectProps } from "./item/ConfigObject";
import type { Node, Scheme } from "./types";

type ConfigUIProps<Value> = {
  scheme: Scheme;
  value: Value;
  onChange?: (target: any, field: string, val: any) => void;
};

export default function ConfigUI<Value>(props: ConfigUIProps<Value>) {
  return (
    <ConfigObject
      type={"object"}
      label={props.scheme.label}
      field={props.scheme.field}
      properties={props.scheme.properties}
      value={props.value}
      options={props.scheme.options}
      target={props.value}
      onChange={(target: any, field: string, val: any) => {
        target[field] = val;
        props.onChange?.(target, field, val);
      }}
    ></ConfigObject>
  );
}
