import { Popover, Tooltip } from "@douyinfe/semi-ui";
import Title from "@douyinfe/semi-ui/lib/es/typography/title";
import styled from "styled-components";

export type BatteryChartProps = {
  list: {
    label: string;
    value: number;
    color: string;
  }[];

  totalLength?: number;
};

export default function BatteryChart(props: BatteryChartProps) {
  const totalLength =
    props.totalLength ?? props.list.reduce((acc, cur) => acc + cur.value, 0);
  const percent = props.list.map((item) => {
    return (item.value / totalLength) * 100;
  });
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
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
        <Title
          style={{
            marginLeft: "2%",
            whiteSpace: "nowrap",
            fontSize: "1.7vw",
          }}
        >
          {props.list[0].label}{" "}
          {percent[0] > 0 ? `${percent[0].toFixed(1)}%` : "N/A"}
        </Title>
      </div>
      <div>
        <div style={{ display: "flex", marginTop: "0.8vw" }}>
          {props.list.map((item, index) => {
            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "10%",
                }}
              >
                <div
                  style={{
                    width: "1vw",
                    height: "1vw",
                    borderRadius: "50%",
                    background: item.color,
                  }}
                ></div>
                <Title
                  heading={6}
                  style={{ marginLeft: "0.5vw", fontSize: "1vw" }}
                >
                  {item.label}
                </Title>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const BatCozy = styled.div`
  width: 1vw;
  height: 20%;
  background: #eee;
  border-bottom-right-radius: 20%;
  border-top-right-radius: 20%;
`;

const BatWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background: #eee;
  border-radius: 5%;
  padding: 2%;
`;

const BatItem = styled.div`
  height: "100%";
`;
