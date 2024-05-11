import { Col, Input, Select } from "@douyinfe/semi-ui";
import { useRef } from "react";
import { ConfigItemProps } from "../ConfigItemProps";

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
  } = props;
  const ref = useRef<any>();

  return (
    <Col span={24} style={{ paddingTop: "10px" }}>
      <Select
        value={value}
        // onChange={(value) => setVal(value)}
        // triggerRender={triggerRender2}
        optionList={options}
        style={{ width: 240, marginTop: 20, outline: 0 }}
      ></Select>
    </Col>
  );
}
