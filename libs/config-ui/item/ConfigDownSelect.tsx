import { Col, Input, Select } from "@douyinfe/semi-ui";
import { useEffect, useRef, useState } from "react";
import { ConfigItemProps } from "../ConfigItemProps";
import { IconChevronDown } from "@douyinfe/semi-icons";
import { mountPortal } from "../utils/mountPortal";

export type ConfigDownSelectOptions = {
  label: string;
  value: string;
}[];

export type ConfigDownSelectProps = ConfigItemProps<
  "down-select",
  ConfigDownSelectOptions
>;

export default function ConfigDownSelect(props: ConfigDownSelectProps) {
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
    style = {},
    hide,
  } = props;
  const ref = useRef<any>();
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    setVisible(Date.now());
  }, []);

  const triggerRender = ({ value, ...rest }: any) => {
    return (
      <div
        style={{
          minWidth: "112",
          display: "flex",
          alignItems: "center",
          paddingLeft: 8,
          marginRight: -8,
          borderRadius: 3,
          fontWeight: "normal",
          fontSize: 13,
        }}
      >
        <div
          style={{
            margin: 4,
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            flexGrow: 1,
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            ...style,
          }}
        >
          {value.map((item: { label: any }) => item.label).join(" , ")}
          <IconChevronDown style={{ margin: "0 8px", flexShrink: 0 }} />
        </div>
      </div>
    );
  };

  return !visible || hide ? (
    <></>
  ) : (
    mountPortal(
      portal,
      <Select
        value={value}
        onChange={(v) => {
          onChange(target, field, v);
        }}
        triggerRender={triggerRender}
        optionList={options}
      ></Select>
    )
  );
}
