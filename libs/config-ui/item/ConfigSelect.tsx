import { Col, Input, Row, Select } from "@douyinfe/semi-ui";
import { useEffect, useRef } from "react";
import { ConfigItemProps } from "../ConfigItemProps";
import styled from "styled-components";
import { IconHash } from "@douyinfe/semi-icons";
import ConfigObject from "./ConfigObject";
import { If } from "../utils/If";

export type ConfigSelectOptions = {
  label: string;
  value: string;
}[];

export type ConfigSelectProps = ConfigItemProps<"select", ConfigSelectOptions>;

export default function ConfigSelect(props: ConfigSelectProps) {
  const {
    field,
    label,
    default: defaultValue,
    value,
    tip,
    onChange,
    target,
    options = [],
  } = props;

  // console.log("ConfigSelect", field, value, target);

  const renderSelectedItem = (p: any) => {
    return (
      <div>
        <div>{p.label === p.value ? "" : p.label}</div>
      </div>
    );
  };

  const renderOptionItem = (p: any) => {
    return (
      <SelectItem
        style={{
          width: "97%",
          padding: "3px 8px",
          margin: "2px 5px",
          background: p.selected ? "#f1f1fc" : "",
          borderRadius: "4px",
        }}
        onClick={p.onClick}
      >
        <IconHash style={{ color: "#666", marginRight: 8 }}></IconHash>
        <div>{p.label}</div>
      </SelectItem>
    );
  };

  return (
    <div style={{ paddingTop: "10px" }}>
      <div
        style={{
          fontSize: "14px",
          fontWeight: "bold",
          color: "#333",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div style={{ flex: 1 }}>{label}</div>
        <div id={`${field}-right`}></div>
      </div>
      <If condition={options?.length}>
        <Select
          prefix={<IconHash style={{ color: "#666" }}></IconHash>}
          placeholder="请选择"
          style={{ width: "100%", marginTop: "5px" }}
          onChange={(v) => {
            onChange(target, field, v);
          }}
          value={value}
          renderSelectedItem={renderSelectedItem}
          renderOptionItem={renderOptionItem}
        >
          {options?.map((item, index) => (
            <Select.Option
              key={item.value}
              value={item.value}
              label={item.label}
            ></Select.Option>
          ))}
        </Select>
      </If>
      <If condition={!options?.length}>
        <Select
          placeholder="暂未选项"
          style={{ width: "100%", marginTop: "5px" }}
        ></Select>
      </If>
      <div style={{ fontSize: "12px", marginTop: "2px", color: "#666" }}>
        {tip}
      </div>
      <div id={field + "-bottom"}></div>
    </div>
  );
}

const SelectItem = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 10px;
`;
