import { Button, Collapse, Input, List } from "@douyinfe/semi-ui";
import { useRef, useState } from "react";
import { ConfigRegister } from "../ConfigRegister";
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
      
    </div>
  );
}
