import { Col, Input, Row, Select } from "@douyinfe/semi-ui";
import { useEffect, useRef } from "react";
import { ConfigItemProps } from "../ConfigItemProps";
import styled from "styled-components";
import { IconHash } from "@douyinfe/semi-icons";
import { If } from "../utils/If";
import Icon from "../Icon";
import { Form } from "@douyinfe/semi-ui";
import { useTranslation } from "react-i18next";
const { Label } = Form;

export type ConfigSelectOptions = {
  label: string;
  value: string;
  icon?: string;
}[];

export type ConfigSelectProps = ConfigItemProps<"select", ConfigSelectOptions>;

export default function ConfigSelect(props: ConfigSelectProps) {
  const [t] = useTranslation();
  const {
    field,
    label,
    default: defaultValue,
    value,
    tip,
    onChange,
    target,
    options = [],
    hide,
  } = props;

  // console.log("ConfigSelect", field, value, target);

  const optionsIcons = options.reduce((acc: any, cur: any) => {
    acc[cur.value] = cur.icon;
    return acc;
  }, {});

  const renderSelectedItem = (p: any) => {
    return (
      <div>
        <div>{p.label === p.value ? p.label : p.label}</div>
      </div>
    );
  };

  const renderOptionItem = (p: any) => {
    // console.log("renderOptionItem", p);

    return (
      <SelectItem
        style={{
          width: "97%",
          padding: "3px 8px",
          margin: "2px 5px",
          background: p.selected ? "rgba(var(--semi-blue-0), 1)" : "",
          borderRadius: "4px",
        }}
        onClick={p.onClick}
      >
        {/* <IconHash style={{ color: "#666", marginRight: 8 }}></IconHash> */}
        <If condition={optionsIcons[p.value]}>
          <Icon src={optionsIcons[p.value]} style={{ marginRight: 8 }}></Icon>
        </If>
        <div style={{ color: "var(--semi-color-text-1)" }}>{p.label}</div>
      </SelectItem>
    );
  };

  return hide ? (
    <></>
  ) : (
    <div style={{ paddingTop: "16px" }}>
      <div
        style={{
          fontSize: "14px",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Label style={{ flex: 1 }}>{label}</Label>
        <div id={`${field}-right`}></div>
      </div>
      <If condition={options?.length}>
        <Select
          prefix={
            optionsIcons[value] ? (
              <Icon
                src={optionsIcons[value]}
                style={{ marginLeft: 12, marginRight: 6 }}
              ></Icon>
            ) : (
              <div style={{ marginRight: 12 }}></div>
            )
          }
          placeholder="请选择"
          style={{ width: "100%", marginTop: "8px" }}
          onChange={(v) => {
            onChange(target, field, v);
          }}
          value={value}
          renderSelectedItem={renderSelectedItem}
          renderOptionItem={renderOptionItem}
        >
          {options?.map((item, index) => (
            <Select.Option
              key={item.value}
              value={item.value}
              label={item.label}
            ></Select.Option>
          ))}
        </Select>
      </If>
      <If condition={!options?.length}>
        <Select
          placeholder={t("Empty Options")}
          style={{ width: "100%", marginTop: "8px" }}
        ></Select>
      </If>
      <div id={field + "-bottom"}></div>
    </div>
  );
}

const SelectItem = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 10px;

  &:hover {
    background: rgba(var(--semi-blue-0), 0.5);
  }
`;
