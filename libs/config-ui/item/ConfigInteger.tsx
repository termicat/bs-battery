import { Col, Input, InputNumber, TextArea } from "@douyinfe/semi-ui";
import { useRef } from "react";

export default function ConfigInteger(props: any) {
  const {
    field,
    label,
    default: defaultValue,
    value,
    tip,
    onChange,
    target,
  } = props;
  const ref = useRef<any>();

  return (
    <div style={{ paddingTop: "16px" }}>
      <div style={{ fontSize: "14px", fontWeight: "bold", color: "#333" }}>
        {label}
      </div>
      <InputNumber
        style={{ marginTop: "8px", width: "100%" }}
        ref={ref}
        defaultValue={defaultValue}
        value={value}
        onChange={(v) => onChange(target, field, v)}
      />
      <div style={{ fontSize: "12px", marginTop: "2px", color: "#666" }}>
        {tip}
      </div>
    </div>
  );
}
