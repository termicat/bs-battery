import { Col, Input, Radio, RadioGroup, Select } from "@douyinfe/semi-ui";
import { useEffect, useRef } from "react";
import { ConfigItemProps } from "../ConfigItemProps";
import ConfigObject from "./ConfigObject";
import type { Node, Scheme } from "../types";
import { getDefaultValue, type NodeTypes } from "../ConfigRegister";
import Label from "@douyinfe/semi-ui/lib/es/form/label";

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
      <Label>{label}</Label>
      <RadioGroup
        onChange={(e) => {
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
            "--semi-color-bg-3": "rgba(var(--semi-blue-0), 1)",
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
    </div>
  );
}
