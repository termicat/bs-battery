import ConfigObject from "./ConfigObject";

export default function ConfigUI(props: any) {
  return (
    <ConfigObject
      properties={props.scheme.properties}
      value={props.value}
      onChange={(target: any, field: string, val: any) => {
        target[field] = val;
        props.onChange(target, field, val);
      }}
    ></ConfigObject>
  );
}
