import { Col, Input, Select } from "@douyinfe/semi-ui";
import { useRef, type Key } from "react";
import { ConfigItemProps } from "../ConfigItemProps";
import styled from "styled-components";

export type ConfigSelectThemeOptions = {
  label: string[];
  value: string;
}[];

export type ConfigSelectThemeProps = ConfigItemProps<
  "select-theme",
  ConfigSelectThemeOptions
>;

export default function ConfigSelectTheme(props: ConfigSelectThemeProps) {
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

  // console.log(props);

  const renderSelectedItem = (p: any) => {
    const colors = options?.find((item) => item.value === p.value)?.label || [];

    return <ThemeColors style={{ height: 16 }} items={colors}></ThemeColors>;
  };

  const renderOptionItem = (p: any) => {
    // console.log(p);

    const colors = options?.find((item) => item.value === p.value)?.label || [];
    return (
      <div
        style={{
          width: "97%",
          padding: "3px 8px",
          margin: "2px 5px",
          background: p.selected ? "#f1f1fc" : "",
          borderRadius: "4px",
        }}
        onClick={p.onClick}
      >
        <ThemeColors
          style={{
            height: 16,
            width: "100%",
          }}
          items={colors}
        ></ThemeColors>
      </div>
    );
  };

  return (
    <div style={{ paddingTop: "16px" }}>
      <div style={{ fontSize: "14px", fontWeight: "bold", color: "#333" }}>
        {label}
      </div>

      <Select
        placeholder="请选择主题色"
        style={{ width: "100%", marginTop: "8px" }}
        onChange={(v) => {
          onChange(target, field, v);
        }}
        value={value}
        renderSelectedItem={renderSelectedItem}
        renderOptionItem={renderOptionItem}
      >
        {options?.map((item, index) => (
          <Select.Option key={item.value} value={item.value}></Select.Option>
        ))}
      </Select>
      <div style={{ fontSize: "12px", marginTop: "2px", color: "#666" }}>
        {tip}
      </div>
    </div>
  );
}

type ThemeColorProps = {
  items: string[];
  style: React.CSSProperties;
};

const ColorContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

const ColorItem = styled.div`
  height: 16px;
  width: 16px;
  border: 0;
  margin: 0;
  padding: 0;
  margin-right: 4px;
  border-radius: 4px;

  /* &:first-child {
    border-radius: 4px 0 0 4px;
  }
  &:last-child {
    border-radius: 0 4px 4px 0;
  } */
`;

function ThemeColors(props: ThemeColorProps) {
  const { items, style } = props;
  return (
    <ColorContainer style={style}>
      {items.map((item) => (
        <ColorItem key={item} style={{ background: item }}></ColorItem>
      ))}
    </ColorContainer>
  );
}
