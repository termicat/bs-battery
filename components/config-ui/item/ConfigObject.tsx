import { Row } from "@douyinfe/semi-ui";
import { ConfigRegister, getConfigRegister } from "../ConfigRegister";
import type { ConfigItemProps } from "../ConfigItemProps";
import { useEffect } from "react";

export type ConfigObjectOptions = {};

export type ConfigObjectProps = ConfigItemProps<"object", ConfigObjectOptions>;

export default function ConfigObject(props: ConfigObjectProps) {
  const {
    properties,
    label,
    field,
    default: defaultValue,
    value,
    onChange,
    target,
    style,
  } = props;

  useEffect(() => {
    if (!field) return;
    console.log("ConfigObject onChange", JSON.stringify(target), field, value);

    if (!value) {
      onChange(target, field, defaultValue);
    }
  }, []);

  return properties?.length ? (
    <div style={Object.assign({}, style)}>
      {label && <div style={{ marginBottom: "10px" }}>{label}</div>}
      <Row>
        {properties?.map((item: any) => {
          const { type, field } = item;
          const Component = getConfigRegister(type);
          return (
            <Component
              {...item}
              value={value?.[field]}
              key={item.field}
              target={value}
              onChange={onChange}
            ></Component>
          );
        })}
      </Row>
    </div>
  ) : (
    <></>
  );
}
