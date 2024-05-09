import { Col, Divider, Input } from "@douyinfe/semi-ui";
import { useRef } from "react";
import { ConfigItemProps } from "../ConfigItemProps";

export type ConfigLineOptions = {};

export type ConfigLineProps = ConfigItemProps<"line", ConfigLineOptions>;

export default function ConfigLine(props: ConfigLineProps) {
  return (
    <Col span={24} style={{ padding: "5px", paddingTop: "10px" }}>
      <Divider></Divider>
    </Col>
  );
}
