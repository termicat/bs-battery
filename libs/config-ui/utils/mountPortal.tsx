import ReactDOM from "react-dom";

export function mountPortal(
  portal: string | undefined,
  renderView: React.ReactNode
) {
  if (!portal) return renderView;
  const target = document.querySelector(portal);
  if (!target) return renderView;
  return ReactDOM.createPortal(renderView, target);
}
