import styled from "styled-components";

const icons = import.meta.glob("./icons/**/*.svg", {
  eager: true,
  query: "raw",
});

const IconWrapper = styled.div`
  display: flex;
  /* justify-content: center; */
  align-items: center;
  & svg {
    width: 100%;
    height: 100%;
    fill: var(--semi-color-text-1);
  }
`;

export default function Icon(props: {
  src: string;
  style?: React.CSSProperties;
}) {
  const src: any = props.src.startsWith("./")
    ? icons[props.src]
    : icons["./" + props.src];

  // console.log(icons, src);

  return (
    <IconWrapper
      style={props.style}
      className="icon"
      dangerouslySetInnerHTML={{ __html: src?.default }}
    />
  );
}
