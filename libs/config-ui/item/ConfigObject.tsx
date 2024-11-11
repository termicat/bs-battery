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

  // useEffect(() => {
  //   if (!field) return;
  //   console.log("ConfigObject onChange", JSON.stringify(target), field, value);

  //   if (!value) {
  //     onChange(target, field, defaultValue);
  //   }
  // }, []);

  // console.log("ConfigObject", [field, value, target]);

  return properties?.length ? (
    <div style={Object.assign({}, style)}>
      {label && <div style={{ marginBottom: "10px" }}>{label}</div>}
      {properties?.map((item: any) => {
        const Component = getConfigRegister(item.type);
        return item.hide ? (
          <> </>
        ) : (
          <Component
            {...item}
            value={value?.[item.field]}
            key={field + "." + item.field}
            target={value}
            onChange={(subTarget: any, subField: string, subVal: any) => {
              const newSubTarget = Object.assign({}, subTarget);
              newSubTarget[subField] = subVal;
              onChange(target, field, newSubTarget);
            }}
          ></Component>
        );
      })}
    </div>
  ) : (
    <></>
  );
}
