import { Card, Col, Input, Popover, Select, Tooltip } from "@douyinfe/semi-ui";
import { useEffect, useRef, useState } from "react";
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
import ConfigDownSelect from "./ConfigDownSelect";
import { If } from "../utils/If";
import Label from "@douyinfe/semi-ui/lib/es/form/label";
import Icon from "../Icon";

export type ConfigFieldListOptions = {
  list?: {
    label: string;
    value: string;
  }[];
  itemSelectOptions?: {
    label: string;
    value: string;
  }[];
};

export type ConfigFieldListProps = ConfigItemProps<
  "field-list",
  ConfigFieldListOptions
>;

export default function ConfigFieldList(props: ConfigFieldListProps) {
  const [t] = useTranslation();
  const {
    field,
    label,
    default: defaultValue = [],
    value: scopeValue,
    tip,
    onChange,
    target,
    options,
  } = props;
  const list = options?.list || [];
  const itemSelectOptions = options?.itemSelectOptions || [];

  const optionsMap = list.reduce((acc, cur) => {
    acc[cur.value] = cur;
    return acc;
  }, {} as any);

  const [hideSearch, setHideSearch] = useState(true);
  const [showTip, setShowTip] = useState(false);
  const [showUpdate, setShowUpdate] = useState({} as any);
  const [innerItemSelect, setInnerItemSelect] = useState(
    itemSelectOptions?.[0]?.value
  );

  useEffect(() => {
    setInnerItemSelect(itemSelectOptions?.[0]?.value);
  }, [itemSelectOptions]);

  const notAddedOptions = list.filter(
    (item) => !scopeValue?.some((sv: any) => sv.value === item.value)
  );

  // useEffect(() => {
  //   if (!scopeValue && defaultValue) {
  //     onChange(target, field, defaultValue);
  //   }
  // }, [defaultValue, field, onChange, scopeValue, target]);

  return (
    <div style={{ paddingTop: "16px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Label style={{ flex: 1 }}>{label}</Label>
        <div
          style={{
            fontSize: "12px",
          }}
        >
          <If condition={innerItemSelect}>
            <ConfigDownSelect
              field={""}
              value={innerItemSelect}
              target={undefined}
              options={itemSelectOptions}
              style={{ padding: 0, margin: 0 }}
              onChange={function (_2: any, _3: string, val: any): void {
                setInnerItemSelect(val);

                onChange(
                  target,
                  field,
                  scopeValue.map((v: any) => {
                    return {
                      value: v.value,
                      select: val,
                    };
                  })
                );
              }}
            ></ConfigDownSelect>
          </If>
        </div>
      </div>
      <div style={{ marginTop: 13 }}>
        {scopeValue?.map(({ value, select }: any) => (
          <div key={value}>
            <FieldItem>
              <Icon
                src={optionsMap[value].icon}
                style={{ fontSize: 12, marginRight: 5 }}
              />
              <span style={{ flex: 1, color: "rgba(var(--semi-grey-8), 1)" }}>
                {optionsMap[value].label}
              </span>
              <If condition={itemSelectOptions.length}>
                <span
                  style={{ fontSize: 14, color: "rgba(var(--semi-grey-7), 1)" }}
                >
                  <Select
                    value={select}
                    onChange={(v2) => {
                      onChange(
                        target,
                        field,
                        scopeValue.map((v: any) =>
                          v.value === value
                            ? {
                                value,
                                select: v2,
                              }
                            : v
                        )
                      );
                    }}
                    triggerRender={({ value }: any) => {
                      return <div>{value?.[0]?.label}</div>;
                    }}
                    optionList={itemSelectOptions}
                  ></Select>
                </span>
              </If>
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
                          [value]: true,
                        });
                      }}
                    >
                      {t("Update Field")}
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        target[field] = scopeValue.filter(
                          (v: any) => v.value !== value
                        );
                        onChange(target, field, target[field]);
                      }}
                    >
                      {t("Remove Field")}
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        const index = scopeValue
                          .map((item: any) => item.value)
                          .indexOf(value);
                        if (index > 0) {
                          const temp = scopeValue[index];
                          scopeValue[index] = scopeValue[index - 1];
                          scopeValue[index - 1] = temp;
                          target[field] = scopeValue ? [...scopeValue] : [];
                          onChange(target, field, target[field]);
                        }
                      }}
                    >
                      {t("Up Field")}
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        const index = scopeValue
                          .map((item: any) => item.value)
                          .indexOf(value);
                        if (index < scopeValue.length - 1) {
                          const temp = scopeValue[index];
                          scopeValue[index] = scopeValue[index + 1];
                          scopeValue[index + 1] = temp;
                          target[field] = scopeValue ? [...scopeValue] : [];
                          onChange(target, field, target[field]);
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
                    color: "rgba(var(--semi-grey-5), 1)",
                    marginLeft: 5,
                  }}
                />
              </Popover>
            </FieldItem>
            {showUpdate[value] && (
              <SearchList
                list={notAddedOptions}
                onClickItem={(v2) => {
                  target[field] = scopeValue.map((v: any) =>
                    v.value === value
                      ? {
                          value: v2,
                          select: v.select,
                        }
                      : v
                  );
                  onChange(target, field, target[field]);
                  showUpdate[value] = false;
                  setShowUpdate({ ...showUpdate });
                }}
                onClose={() => {
                  showUpdate[value] = false;
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
            {t("Append")}
          </Text>
        </Tooltip>

        {hideSearch || (
          <SearchList
            list={notAddedOptions}
            onClickItem={(v, item) => {
              target[field] = scopeValue
                ? [
                    ...scopeValue,
                    { value: v, select: item?.select ?? innerItemSelect },
                  ]
                : [{ value: v, select: item?.select ?? innerItemSelect }];
              onChange(target, field, target[field]);
              setHideSearch(true);
            }}
            onClose={() => {
              setHideSearch(true);
            }}
          ></SearchList>
        )}
      </div>
    </div>
  );
}

type SearchListProps = {
  list?: ConfigFieldListOptions["list"];
  onClickItem?: (v: string, option: any) => void;
  onClose?: () => void;
};
function SearchList(props: SearchListProps) {
  const [t] = useTranslation();
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
          placeholder={t("Search")}
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
          <Icon
            src={option.icon}
            style={{ fontSize: 12, color: "#646A73", marginRight: 5 }}
          />
          <span style={{ flex: 1, color: "rgba(var(--semi-grey-8), 1)" }}>
            {option.label}
          </span>
        </FieldItem>
      ))}
    </Card>
  );
}

const FieldItem = styled.div`
  /* margin-top: 10px; */
  font-size: 14px;
  height: 32px;
  color: rgba(var(--semi-grey-8), 1);
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
  color: rgba(var(--semi-grey-8), 1);
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: rgba(var(--semi-grey-1), 1);
  }
`;
