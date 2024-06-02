import { CheckboxGroup, Col, Input } from "@douyinfe/semi-ui";
import { useRef } from "react";
import { ConfigItemProps } from "../ConfigItemProps";
import { Form } from "@douyinfe/semi-ui";
const { Label } = Form;

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
      <Label>{label}</Label>

      <CheckboxGroup
        style={{
          marginTop: 4,
          width: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
          justifyContent: "space-between",
        }}
        options={options}
        direction="horizontal"
        aria-label={tip}
        value={value}
        onChange={(v) => {
          onChange(target, field, v);
        }}
      />
    </div>
  );
}
