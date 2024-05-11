import { Card, Col, Input, Popover, Tooltip } from "@douyinfe/semi-ui";
import { useRef, useState } from "react";
import { ConfigItemProps } from "../ConfigItemProps";
import styled from "styled-components";
import {
  IconClear,
  IconHash,
  IconMore,
  IconPlus,
  IconSearch,
} from "@douyinfe/semi-icons";
import Text from "@douyinfe/semi-ui/lib/es/typography/text";
import { useTranslation } from "react-i18next";

export type ConfigFieldListOptions = {
  label: string;
  value: string;
}[];

export type ConfigFieldListProps = ConfigItemProps<
  "string",
  ConfigFieldListOptions
>;

export default function ConfigFieldList(props: ConfigFieldListProps) {
  const [t] = useTranslation();
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
  const [showTip, setShowTip] = useState(false);
  const [showUpdate, setShowUpdate] = useState({} as any);

  const notAddedOptions = options?.filter(
    (item) => !value.includes(item.value)
  );

  return (
    <Col span={24} style={{ paddingTop: "10px" }}>
      <div style={{ fontSize: "14px", fontWeight: "bold", color: "#333" }}>
        {label}
      </div>
      <div style={{ marginTop: 15 }}>
        {value?.map((key: any) => (
          <div key={key}>
            <FieldItem>
              <IconHash
                style={{ fontSize: 12, color: "#646A73", marginRight: 5 }}
              />
              <span style={{ flex: 1 }}>{optionsMap[key]}</span>
              <span style={{ fontSize: 14, color: "#8F959E" }}>最大值</span>
              <Popover
                showArrow
                arrowPointAtCenter
                position="bottomRight"
                clickToHide
                style={{ width: 100, padding: 0 }}
                content={
                  <div>
                    <MenuItem
                      onClick={() => {
                        setShowUpdate({
                          [key]: true,
                        });
                      }}
                    >
                      {t("Update Field")}
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        onChange(
                          target,
                          field,
                          value.filter((v: any) => v !== key)
                        );
                      }}
                    >
                      {t("Remove Field")}
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        const index = value.indexOf(key);
                        if (index > 0) {
                          const temp = value[index];
                          value[index] = value[index - 1];
                          value[index - 1] = temp;
                          onChange(target, field, [...value]);
                        }
                      }}
                    >
                      {t("Up Field")}
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        const index = value.indexOf(key);
                        if (index < value.length - 1) {
                          const temp = value[index];
                          value[index] = value[index + 1];
                          value[index + 1] = temp;
                          onChange(target, field, [...value]);
                        }
                      }}
                    >
                      {t("Down Field")}
                    </MenuItem>
                  </div>
                }
              >
                <IconMore
                  style={{
                    fontSize: 12,
                    transform: "rotate(90deg)",
                    color: "#646A73",
                    marginLeft: 5,
                  }}
                />
              </Popover>
            </FieldItem>
            {showUpdate[key] && (
              <SearchList
                list={notAddedOptions}
                onClickItem={(v2) => {
                  onChange(
                    target,
                    field,
                    value.map((v: any) => (v === key ? v2 : v))
                  );
                  showUpdate[key] = false;
                  setShowUpdate({ ...showUpdate });
                }}
                onClose={() => {
                  showUpdate[key] = false;
                  setShowUpdate({ ...showUpdate });
                }}
              ></SearchList>
            )}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 10, userSelect: "none" }}>
        <Tooltip
          content={
            <article>
              <p>{t("only number field")}</p>
            </article>
          }
          arrowPointAtCenter={false}
          trigger="custom"
          visible={showTip}
        >
          <Text
            link={Boolean(notAddedOptions?.length)}
            icon={<IconPlus style={{ fontSize: 14 }} />}
            style={{ color: "#aaa" }}
            onClick={() => {
              if (notAddedOptions?.length) {
                setHideSearch(false);
              } else {
                setShowTip(true);
                setTimeout(() => {
                  setShowTip(false);
                }, 2000);
              }
            }}
          >
            添加字段
          </Text>
        </Tooltip>

        {hideSearch || (
          <SearchList
            list={notAddedOptions}
            onClickItem={(v) => {
              onChange(target, field, [...value, v]);
              setHideSearch(true);
            }}
            onClose={() => {
              setHideSearch(true);
            }}
          ></SearchList>
        )}
      </div>
      <div style={{ fontSize: "12px", marginTop: "2px", color: "#666" }}>
        {tip}
      </div>
    </Col>
  );
}

type SearchListProps = {
  list?: ConfigFieldListOptions;
  onClickItem?: (v: string, option: any) => void;
  onClose?: () => void;
};
function SearchList(props: SearchListProps) {
  const list = props?.list;
  const [searchInput, setSearchInput] = useState("");

  const filterOptions =
    list?.filter((item) =>
      searchInput ? item.label.includes(searchInput) : true
    ) || [];
  return (
    <Card
      title={
        <Input
          prefix={<IconSearch />}
          suffix={
            <IconClear
              onClick={() => {
                setSearchInput("");
                props.onClose?.();
              }}
            />
          }
          showClear={false}
          borderless
          style={{ borderWidth: 0 }}
          placeholder={"搜索字段"}
          autoFocus
          onChange={(e) => {
            setSearchInput(e);
          }}
        ></Input>
      }
      shadows="always"
      style={{ marginTop: 5 }}
      headerStyle={{ padding: 0 }}
      bodyStyle={{ padding: 0 }}
    >
      {filterOptions?.map((option: any) => (
        <FieldItem
          key={option.value}
          style={{ marginTop: 0, border: 0 }}
          onClick={() => {
            props?.onClickItem?.(option.value, option);
          }}
        >
          <IconHash
            style={{ fontSize: 12, color: "#646A73", marginRight: 5 }}
          />
          <span style={{ flex: 1 }}>{option.label}</span>
        </FieldItem>
      ))}
    </Card>
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

const MenuItem = styled.div`
  padding: 8px 16px;
  font-size: 14px;
  color: #1f2329;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #f4f5f7;
  }
`;
