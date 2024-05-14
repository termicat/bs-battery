export function If({ condition, children }: { condition: any; children: any }) {
  return condition ? children : null;
}
export function Else({ children }: { children: any }) {
  return children;
}
export function ElseIf({
  condition,
  children,
}: {
  condition: any;
  children: any;
}) {
  return condition ? children : null;
}
