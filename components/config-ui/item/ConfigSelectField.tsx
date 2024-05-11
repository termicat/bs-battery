import { Col, Input, Row, Select } from "@douyinfe/semi-ui";
import { useRef } from "react";
import { ConfigItemProps } from "../ConfigItemProps";
import styled from "styled-components";
import { IconHash } from "@douyinfe/semi-icons";
import ConfigObject from "./ConfigObject";

export type ConfigSelectFieldOptions = {
  label: string;
  value: string;
}[];

export type ConfigSelectFieldProps = ConfigItemProps<
  "string",
  ConfigSelectFieldOptions
>;

export default function ConfigSelectField(props: ConfigSelectFieldProps) {
  const {
    field,
    label,
    default: defaultValue,
    value,
    tip,
    onChange,
    target,
    options,
  } = props;
  const ref = useRef<any>();

  const renderSelectedItem = (p: any) => {
    return (
      <div>
        <div>{p.label}</div>
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
    <Col span={24} style={{ paddingTop: "10px" }}>
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

      <Select
        prefix={<IconHash style={{ color: "#666" }}></IconHash>}
        placeholder="请选择"
        style={{ width: "100%", marginTop: "5px" }}
        onChange={(v) => onChange(target, field, v)}
        defaultValue={value}
        renderSelectedItem={renderSelectedItem}
        renderOptionItem={renderOptionItem}
      >
        {options?.map((item, index) => (
          <Select.Option key={item.value} value={item.value}></Select.Option>
        ))}
      </Select>

      <div style={{ fontSize: "12px", marginTop: "2px", color: "#666" }}>
        {tip}
      </div>
    </Col>
  );
}

const SelectItem = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 10px;
`;
