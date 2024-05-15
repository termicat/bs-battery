import { Popover, Tooltip } from "@douyinfe/semi-ui";
import styled from "styled-components";

export type BatteryChartProps = {
  list: {
    label: string;
    value: number;
    color: string;
  }[];
};

export default function BatteryChart(props: BatteryChartProps) {
  const sum = props.list.reduce((acc, cur) => acc + cur.value, 0);
  const percent = props.list.map((item) => {
    return (item.value / sum) * 100;
  });
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <BatWrapper>
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            borderRadius: 5,
            overflow: "hidden",
          }}
        >
          {percent.map((item, index) => {
            return (
              <Tooltip
                showArrow
                content={
                  <article>
                    {props.list[index].label}
                    &nbsp;
                    {item.toFixed(1)}%
                  </article>
                }
                position="top"
                key={index}
              >
                <BatItem
                  style={{
                    width: `${item}%`,
                    background: props.list[index].color,
                  }}
                ></BatItem>
              </Tooltip>
            );
          })}
        </div>
      </BatWrapper>
      <BatCozy></BatCozy>
    </div>
  );
}

const BatCozy = styled.div`
  width: 20px;
  height: 40px;
  background: #eee;
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
`;

const BatWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background: #eee;
  border-radius: 10px;
  padding: 10px;
`;

const BatItem = styled.div`
  height: "100%";
`;
