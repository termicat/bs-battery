import { CheckboxGroup, Col, Input } from "@douyinfe/semi-ui";
import { useRef } from "react";
import { ConfigItemProps } from "../ConfigItemProps";

export type ConfigCheckboxesOptions = {
  label: string;
  value: string;
}[];

export type ConfigCheckboxesProps = ConfigItemProps<
  "checkboxes",
  ConfigCheckboxesOptions
>;

export default function ConfigCheckboxes(props: ConfigCheckboxesProps) {
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

  return (
    <div style={{ paddingTop: "16px" }}>
      <div style={{ fontSize: "14px", fontWeight: "bold", color: "#333" }}>
        {label}
      </div>

      <CheckboxGroup
        style={{
          marginTop: "8px",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))",
          justifyContent: "space-between",
        }}
        options={options}
        direction="horizontal"
        aria-label={tip}
        value={value}
        onChange={(v) => {
          target[field] = v;
          onChange(target, field, v);
        }}
      />

      <div style={{ fontSize: "12px", marginTop: "2px", color: "#666" }}>
        {tip}
      </div>
    </div>
  );
}
