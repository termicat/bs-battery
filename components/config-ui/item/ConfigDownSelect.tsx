import { Col, Input, Select } from "@douyinfe/semi-ui";
import { useEffect, useRef, useState } from "react";
import { ConfigItemProps } from "../ConfigItemProps";
import { IconChevronDown } from "@douyinfe/semi-icons";
import ReactDOM from "react-dom";

export type ConfigDownSelectOptions = {
  label: string;
  value: string;
}[];

export type ConfigDownSelectProps = ConfigItemProps<
  "string",
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
          }}
        >
          {value.map((item: { label: any }) => item.label).join(" , ")}
          <IconChevronDown style={{ margin: "0 8px", flexShrink: 0 }} />
        </div>
      </div>
    );
  };

  return !visible ? (
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

function mountPortal(portal: string | undefined, renderView: React.ReactNode) {
  if (!portal) return renderView;
  const target = document.querySelector(portal);
  if (!target) return renderView;
  console.log("portal", portal, target);
  return ReactDOM.createPortal(renderView, target);
}
