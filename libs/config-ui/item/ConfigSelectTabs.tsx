import { Col, Input, Radio, RadioGroup, Select } from "@douyinfe/semi-ui";
import { useEffect, useRef } from "react";
import { ConfigItemProps } from "../ConfigItemProps";
import ConfigObject from "./ConfigObject";
import type { Node, Scheme } from "../types";
import { getDefaultValue, type NodeTypes } from "../ConfigRegister";

export type ConfigSelectTabsOptions = {
  label: string;
  value: string;
}[];

export type ConfigSelectTabsProps = ConfigItemProps<
  "select-tabs",
  ConfigSelectTabsOptions
>;

export default function ConfigSelectTabs(props: ConfigSelectTabsProps) {
  const {
    field,
    label,
    default: defaultKey,
    value,
    tip,
    onChange,
    target,
    options,
  } = props;

  return (
    <div style={{ paddingTop: "16px" }}>
      <div style={{ fontSize: "14px", fontWeight: "bold", color: "#333" }}>
        {label}
      </div>
      <RadioGroup
        onChange={(e) => {
          target[field] = e.target.value;
          onChange(target, field, e.target.value);
        }}
        value={value}
        type="button"
        style={
          {
            display: "flex",
            justifyContent: "space-around",
            marginTop: 5,
            width: "100%",
            "--semi-color-bg-3": "#1456F01A",
          } as any
        }
      >
        {options?.map((item) => {
          return (
            <Radio value={item.value} key={item.value} style={{ flex: 1 }}>
              {item.label}
            </Radio>
          );
        })}
      </RadioGroup>
      <div style={{ fontSize: "12px", marginTop: "2px", color: "#666" }}>
        {tip}
      </div>
    </div>
  );
}
