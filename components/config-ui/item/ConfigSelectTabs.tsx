import { Col, Input, Select } from "@douyinfe/semi-ui";
import { useEffect, useRef } from "react";
import { ConfigItemProps } from "../ConfigItemProps";
import ConfigObject from "./ConfigObject";
import type { Node, Scheme } from "../types";
import { getDefaultValue, type NodeTypes } from "../ConfigRegister";

export type ConfigSelectTabsOptions = {
  label: string;
  key: string;
  value: Scheme["properties"];
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

  const subProperties =
    options?.find?.((option) => option.key === value?.key)?.value || [];

  return (
    <div style={{ paddingTop: "10px" }}>
      <div style={{ fontSize: "14px", fontWeight: "bold", color: "#333" }}>
        {label}
      </div>
      <Select
        value={value?.key || defaultKey}
        style={{ marginTop: 5, width: "100%" }}
        optionList={options?.map((option) => ({
          label: option.label,
          value: option.key,
        }))}
        onChange={(v) => {
          const subTarget = Object.assign({}, target[field]);
          subTarget.key = v;
          const nextProperties =
            options?.find((option) => option.key === v)?.value || [];
          subTarget.value = getDefaultValue({
            type: "object",
            field: "",
            properties: nextProperties,
          });
          onChange(target, field, subTarget);
        }}
      ></Select>
      <div style={{ fontSize: "12px", marginTop: "2px", color: "#666" }}>
        {tip}
      </div>
      <div style={{ marginTop: "0px" }}>
        <ConfigObject
          field={""}
          value={value?.value}
          target={value?.value}
          onChange={(subTarget: any, subField: string, subVal: any) => {
            value.value[subField] = subVal;
            onChange(target, field, value);
          }}
          properties={subProperties}
        ></ConfigObject>
      </div>
    </div>
  );
}
