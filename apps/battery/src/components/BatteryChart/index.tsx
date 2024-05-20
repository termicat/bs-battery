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
  if (props.list.length === 0) return null;
  const totalLength =
    props.totalLength ?? props.list.reduce((acc, cur) => acc + cur.value, 0);
  const percent = props.list.map((item) => {
    return (item.value / totalLength) * 100;
  });
  return (
    <ChartWrap
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
          width: "70%",
          height: "100%",
        }}
      >
        <BatWrapper>
          <BatItemWrap>
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
          </BatItemWrap>
        </BatWrapper>
        <BatCozy></BatCozy>
        <CozyTitle className="auto-hide">
          {props.list[0].label}{" "}
          {percent[0] > 0 ? `${percent[0].toFixed(1)}%` : "N/A"}
        </CozyTitle>
      </div>
      <div className="auto-hide" style={{ width: "100%" }}>
        <div
          style={{
            display: "flex",
            marginTop: "3%",
            width: "100%",
            justifyContent: "center",
            flexWrap: "wrap",
            maxHeight: "30%",
          }}
        >
          {props.list.map((item, index) => {
            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "30px",
                  marginTop: "10px",
                }}
              >
                <div
                  style={{
                    flexShrink: 0,
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background:
                      item.color || "var(--semi-color-tertiary-light-hover)",
                  }}
                ></div>
                <Title
                  heading={6}
                  style={{
                    fontSize: "12px",
                    marginLeft: "10px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.label}
                </Title>
              </div>
            );
          })}
        </div>
      </div>
    </ChartWrap>
  );
}

const ChartWrap = styled.div`
  @media (max-width: 352px) {
    .auto-hide {
      display: none;
    }
  }
`;

const CozyTitle = styled.div`
  color: var(--semi-color-text-0);
  margin-left: 2%;
  white-space: break-spaces;
  font-size: 16px;
  max-width: 35%;
  min-width: 20%;
  font-weight: bold;
`;

const BatCozy = styled.div`
  width: 2vmax;
  padding-top: 10%;
  background: var(--semi-color-tertiary-light-hover);
  border-bottom-right-radius: 1vmin;
  border-top-right-radius: 1vmin;
`;

const BatWrapper = styled.div`
  display: flex;
  width: 100%;
  /* height: 100%; */
  padding-top: 30%;
  background: var(--semi-color-tertiary-light-hover);
  position: relative;
  border-radius: 1.5vmax;
  overflow: hidden;
  border: 1vmax solid var(--semi-color-tertiary-light-hover);
`;

const BatItemWrap = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  border-radius: 1vmin;
  overflow: hidden;
  position: absolute;
  top: 0;
`;

const BatItem = styled.div`
  height: "100%";
`;
