import { ConfigUI } from "@bc/config-ui";
import { createScheme } from "../../options";
import { useEffect, useState } from "react";
import BatteryChart from "../../components/BatteryChart";

const defaultScheme = createScheme("fieldCategory");

export default function Demo() {
  const [value, setValue] = useState({
    root: {},
  } as any);
  const [scheme, setScheme] = useState(defaultScheme);

  useEffect(() => {
    setValue({
      root: {
        ...value.root,
        mapOptions: {},
      },
    });
    setScheme(createScheme(value.root.mapType));
  }, [value.root.mapType]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ width: 340 }}>
          <ConfigUI
            scheme={scheme}
            value={value}
            onChange={(target, field, val) => {
              console.log(
                "Root onChange",
                JSON.stringify(target),
                field,
                val,
                target === value
              );
              setValue({ ...target });
            }}
          ></ConfigUI>
        </div>
        <pre
          style={{
            width: 340,
            marginLeft: 10,
            padding: 10,
            border: "1px solid #eee",
          }}
        >
          {JSON.stringify(value, null, 2)}
        </pre>
      </div>
      <div style={{ height: 180, width: 400, marginTop: 60 }}>
        <BatteryChart
          list={[
            {
              label: "Green",
              value: 20,
              color: "green",
            },
            {
              label: "Red",
              value: 20,
              color: "red",
            },
            {
              label: "Yellow",
              value: 50,
              color: "yellow",
            },
          ]}
        ></BatteryChart>
      </div>
    </div>
  );
}
