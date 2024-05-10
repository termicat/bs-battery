import { Card, Col, Input } from "@douyinfe/semi-ui";
import { useRef, useState } from "react";
import { ConfigItemProps } from "../ConfigItemProps";
import styled from "styled-components";
import { IconHash, IconMore, IconPlus, IconSearch } from "@douyinfe/semi-icons";
import Text from "@douyinfe/semi-ui/lib/es/typography/text";

export type ConfigFieldListOptions = {
  label: string;
  value: string;
}[];

export type ConfigFieldListProps = ConfigItemProps<
  "string",
  ConfigFieldListOptions
>;

export default function ConfigFieldList(props: ConfigFieldListProps) {
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

  const optionsMap = options?.reduce((acc, cur) => {
    acc[cur.value] = cur.label;
    return acc;
  }, {} as any);

  const [hideSearch, setHideSearch] = useState(true);
  const [searchInput, setSearchInput] = useState("");

  return (
    <Col span={24} style={{ padding: "5px", paddingTop: "10px" }}>
      <div style={{ fontSize: "14px", fontWeight: "bold", color: "#333" }}>
        {label}
      </div>
      <div style={{ marginTop: 15 }}>
        {value?.map((key: any) => (
          <FieldItem key={key}>
            <IconHash
              style={{ fontSize: 12, color: "#646A73", marginRight: 5 }}
            />
            <span style={{ flex: 1 }}>{optionsMap[key]}</span>
            <span style={{ fontSize: 14, color: "#8F959E" }}>最大值</span>
            <IconMore
              style={{
                fontSize: 12,
                transform: "rotate(90deg)",
                color: "#646A73",
                marginLeft: 5,
              }}
            />
          </FieldItem>
        ))}
      </div>
      <div style={{ marginTop: 10, userSelect: "none" }}>
        <Text
          link
          icon={<IconPlus style={{ fontSize: 14 }} />}
          onClick={() => setHideSearch(false)}
          onChange={(e) => {}}
        >
          添加字段
        </Text>
        {hideSearch || (
          <Card
            title={
              <Input
                prefix={<IconSearch />}
                showClear
                borderless
                style={{ borderWidth: 0 }}
                placeholder={"搜索字段"}
                onClear={() => {
                  setHideSearch(true);
                }}
                onChange={(e) => {
                  console.log(e);

                  setSearchInput(e);
                }}
              ></Input>
            }
            shadows="always"
            style={{ marginTop: 5 }}
            headerStyle={{ padding: 0 }}
            bodyStyle={{ padding: 0 }}
          >
            {options
              ?.filter(
                (item) =>
                  !value.includes(item.value) &&
                  (searchInput ? item.label.includes(searchInput) : true)
              )
              ?.map((option) => (
                <FieldItem
                  key={option.value}
                  style={{ marginTop: 0, border: 0 }}
                  onClick={() => {
                    onChange(target, field, [...value, option.value]);
                    setHideSearch(true);
                  }}
                >
                  <IconHash
                    style={{ fontSize: 12, color: "#646A73", marginRight: 5 }}
                  />
                  <span style={{ flex: 1 }}>{option.label}</span>
                </FieldItem>
              ))}
          </Card>
        )}
      </div>
      <div style={{ fontSize: "12px", marginTop: "2px", color: "#666" }}>
        {tip}
      </div>
    </Col>
  );
}

const FieldItem = styled.div`
  /* margin-top: 10px; */
  font-size: 14px;
  height: 32px;
  color: #1f2329;
  display: flex;
  align-items: center;
  border: 1px solid #e1e3e6;
  border-radius: 5px;
  padding: 0 10px;
  margin-top: 8px;
`;
