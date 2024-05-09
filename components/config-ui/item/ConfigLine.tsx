import { Col, Input } from "@douyinfe/semi-ui";
import { useRef } from "react";
import { ConfigItemProps } from "../ConfigItemProps";

export type ConfigLineOptions = { };

export type ConfigLineProps = ConfigItemProps<'line', ConfigLineOptions>;

export default function ConfigLine(props:ConfigLineProps) {
  const {
    field,
    label,
    default: defaultValue,
    value,
    tip,
    onChange,
    target,
    options
  } = props;
  const ref = useRef<any>();

  return (
    <Col span={12} style={{ padding: "5px", paddingTop: "10px" }}>
      <div style={{ fontSize: "14px", fontWeight: "bold", color: "#333" }}>
        {label}
      </div>
      <Input
        style={{ marginTop: "5px" }}
        ref={ref}
        defaultValue={defaultValue}
        value={value}
        type="text"
        onChange={(v) => onChange(target, field, v)}
      />
      <div style={{ fontSize: "12px", marginTop: "2px", color: "#666" }}>
        {tip}
      </div>
    </Col>
  );
}
