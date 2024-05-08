import { Col, Input, Select } from "@douyinfe/semi-ui";
import { useRef } from "react";

export default function ConfigString(props: any) {
  const {
    field,
    label,
    default: defaultValue,
    value,
    tip,
    options,
    onChange,
    target,
  } = props;

  return (
    <Col span={12} style={{ padding: "5px", paddingTop: "10px" }}>
      <div style={{ fontSize: "14px", fontWeight: "bold", color: "#333" }}>
        {label}
      </div>
      <Select
        style={{ marginTop: "5px", width: "100%" }}
        defaultValue={defaultValue}
        optionList={options}
        value={value}
        onChange={(v) => onChange(target, field, v)}
      ></Select>
      <div style={{ fontSize: "12px", marginTop: "2px", color: "#666" }}>
        {tip}
      </div>
    </Col>
  );
}
