import { Row } from "@douyinfe/semi-ui";
import { ConfigRegister, getConfigRegister } from "../ConfigRegister";
import type { ConfigItemProps } from "../ConfigItemProps";

export type ConfigObjectOptions = {};

export type ConfigObjectProps = ConfigItemProps<"object", ConfigObjectOptions>;

export default function ConfigObject(props: ConfigObjectProps) {
  const { properties, label, value, onChange, style } = props;
  return (
    <div style={Object.assign({}, style)}>
      {label && <div style={{ marginBottom: "10px" }}>{label}</div>}
      <Row>
        {properties?.map((item: any) => {
          const { type, field } = item;
          const Component = getConfigRegister(type);
          return (
            <Component
              {...item}
              value={value[field]}
              key={item.field}
              target={value}
              onChange={onChange}
            ></Component>
          );
        })}
      </Row>
    </div>
  );
}
