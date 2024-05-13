import ConfigUI from "@/components/config-ui";
import { createScheme } from "./options";
import { useEffect, useState } from "react";

const defaultScheme = createScheme("fieldCategory");

// const defaultScheme = {
//   type: "object",
//   field: "",
//   default: {},
//   properties: [
//     {
//       type: "select",
//       field: "select",
//       label: "Select Table",
//       options: [
//         { label: "Table1", value: "table1" },
//         { label: "Table2", value: "table2" },
//       ],
//     },
//     {
//       type: "select",
//       field: "selectView",
//       label: "Select View",
//       options: [],
//     },
//     {
//       type: "object",
//       field: "obj",
//       label: "对象",
//       default: {},
//       properties: [
//         {
//           type: "select",
//           field: "selectField",
//           label: "Select",
//           options: [
//             { label: "Option1", value: "option1" },
//             { label: "Option2", value: "option2" },
//           ],
//         },
//       ],
//     },
//   ],
// };

export default function Demo() {
  const [value, setValue] = useState({
    root: {
      // chartOptions: ["showLegend"],
      // mapOptions: {},
    },
  });
  const [scheme, setScheme] = useState(defaultScheme);

  // useEffect(() => {
  //   setScheme(createScheme("fieldCategory"));
  // }, []);

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
