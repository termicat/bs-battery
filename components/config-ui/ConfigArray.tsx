import { Button, Collapse, Input, List } from "@douyinfe/semi-ui";
import { useRef, useState } from "react";
import { ConfigRegister } from "./ConfigRegister";
import {
  IconArrowDown,
  IconArrowUp,
  IconDelete,
  IconEdit,
  IconPlus,
  IconTop,
} from "@douyinfe/semi-icons";
import ConfigObject from "./ConfigObject";
import { nanoid } from "nanoid";

export default function ConfigArray(props: any) {
  const { field, label, properties, tip, value = [], display } = props;
  const ref = useRef<any>();
  const [actives, setActives] = useState<string[] | undefined | string>([]);

  return (
    <div style={{ border: "1px solid #eee", padding: "5px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: "5px",
        }}
      >
        <div>{label}</div>
        <Button
          icon={<IconPlus size="small" />}
          aria-label="add"
          onClick={() => {
            const id = nanoid(8);
            props.onChange(value, value.length, {
              [display]: "New",
              id,
            });
            setActives([id]);
          }}
        />
      </div>
      <div style={{ marginTop: "10px" }}>
        {value.length === 0 && (
          <div style={{ textAlign: "center", marginBottom: "10px" }}>{tip}</div>
        )}
        <Collapse
          activeKey={actives}
          onChange={(keys) => {
            setActives(keys);
          }}
        >
          {value.map((item: any, index: any) => (
            <Collapse.Panel
              header={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  {item[display]}
                  <div>
                    <Button
                      size="small"
                      icon={<IconPlus />}
                      aria-label="insert"
                      onClick={(e) => {
                        e.stopPropagation();
                        const id = nanoid(8);
                        const obj = {
                          [display]: "New",
                          id,
                        };
                        value.splice(index + 1, 0, obj);
                        props.onChange(value, index + 1, obj);
                        setActives([id]);
                      }}
                    />
                    <Button
                      size="small"
                      icon={<IconArrowUp />}
                      aria-label="top"
                      style={{ marginLeft: "3px" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (index === 0) {
                          return;
                        }
                        const obj = value[index];
                        value[index] = value[index - 1];
                        value[index - 1] = obj;
                        props.onChange(value, index - 1, obj);
                      }}
                    />
                    <Button
                      size="small"
                      icon={<IconArrowDown />}
                      aria-label="down"
                      style={{ marginLeft: "3px" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (value.length - 1 === index) {
                          return;
                        }
                        const obj = value[index];
                        value[index] = value[index + 1];
                        value[index + 1] = obj;
                        props.onChange(value, index + 1, obj);
                      }}
                    />
                    <Button
                      type="danger"
                      icon={<IconDelete />}
                      size="small"
                      aria-label="del"
                      style={{ marginLeft: "3px", marginRight: "10px" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        props.onChange(value, index, undefined);
                        value.splice(index, 1);
                      }}
                    />
                  </div>
                </div>
              }
              key={item.id}
              itemKey={item.id}
            >
              <ConfigObject
                properties={properties}
                value={item}
                onChange={(target: any, field: string, val: any) => {
                  target[field] = val;
                  props.onChange(target, field, val);
                }}
              ></ConfigObject>
            </Collapse.Panel>
          ))}
        </Collapse>
      </div>
    </div>
  );
}
