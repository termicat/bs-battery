import { ConfigUI } from "./index";
import { createScheme } from "../../apps/radar/src/options";
import { useEffect, useState } from "react";

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
        flexDirection: "row",
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
    </div>
  );
}
