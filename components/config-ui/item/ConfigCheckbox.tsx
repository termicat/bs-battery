import { Checkbox, Col, Input } from "@douyinfe/semi-ui";
import { useEffect, useRef, useState } from "react";
import { ConfigItemProps } from "../ConfigItemProps";
import { mountPortal } from "../utils/mountPortal";

export type ConfigCheckboxOptions = {};

export type ConfigCheckboxProps = ConfigItemProps<
  "checkbox",
  ConfigCheckboxOptions
>;

export default function ConfigCheckbox(props: ConfigCheckboxProps) {
  const {
    field,
    label,
    default: defaultValue,
    value,
    tip,
    onChange,
    target,
    options,
    portal,
  } = props;
  const ref = useRef<any>();

  return mountPortal(
    portal,
    <div style={{ marginTop: 5 }}>
      <Checkbox
        value={value}
        onChange={(e) => {
          target[field] = e.target.checked;
          onChange(target, field, e.target.checked);
        }}
        aria-label={label}
        style={{ fontSize: "12px", color: "#333" }}
      >
        {label}
      </Checkbox>
    </div>
  );
}
