import type { Node } from "./types";
import type { NodeTypes } from "./ConfigRegister";

export type ConfigItemProps<T extends NodeTypes, O> = Node<T> & {
  value: any;
  target: any;
  options?: O;
  style?: React.CSSProperties;
  onChange: (target: any, field: string, val: any) => void;
};
