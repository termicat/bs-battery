import { Col, Divider, Input } from "@douyinfe/semi-ui";
import { useRef } from "react";
import { ConfigItemProps } from "../ConfigItemProps";

export type ConfigLineOptions = {};

export type ConfigLineProps = ConfigItemProps<"line", ConfigLineOptions>;

export default function ConfigLine(props: ConfigLineProps) {
  return (
    <div style={{ paddingTop: "10px" }}>
      <Divider></Divider>
    </div>
  );
}
