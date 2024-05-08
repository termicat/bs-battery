import { Row } from "@douyinfe/semi-ui";
import { ConfigRegister } from "./ConfigRegister";

export default function ConfigObject(props: any) {
  const { properties, label, value, onChange } = props;
  return (
    <div style={{ border: "1px solid #eee", padding: "10px" }}>
      {label && <div style={{ marginBottom: "10px" }}>{label}</div>}
      <Row>
        {properties.map((item: any) => {
          const { type, field } = item;
          const Component = ConfigRegister[type]();
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
