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
  style?: React.CSSProperties;
};

export default function BatteryChart(props: BatteryChartProps) {
  const totalLength =
    props.totalLength ?? props.list.reduce((acc, cur) => acc + cur.value, 0);
  const percent = props.list.map((item) => {
    return (item.value / totalLength) * 100;
  });
  return (
    <div
      style={Object.assign(
        {
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        },
        props?.style as any
      )}
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
              borderRadius: "1vmin",
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
            fontSize: "4vmax",
          }}
        >
          {props.list[0].label}{" "}
          {percent[0] > 0 ? `${percent[0].toFixed(1)}%` : "N/A"}
        </Title>
      </div>
      <div style={{width: '100%'}}>
        <div style={{ display: "flex", marginTop: "1vmax", width: '100%', justifyContent: 'center' }}>
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
                    flexShrink: 0,
                    width: "2.5vmax",
                    height: "2.5vmax",
                    borderRadius: "50%",
                    background: item.color,
                  }}
                ></div>
                <Title heading={6} style={{ fontSize: "2.5vmax", marginLeft: '10%' }}>
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
  border-bottom-right-radius: 1vmin;
  border-top-right-radius: 1vmin;
`;

const BatWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background: #eee;
  border-radius: 1vmax;
  padding: 2%;
`;

const BatItem = styled.div`
  height: "100%";
`;
