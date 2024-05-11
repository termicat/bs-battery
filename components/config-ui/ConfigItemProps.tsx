import type { Node } from "./types";
import type { NodeTypes } from "./ConfigRegister";

export type ConfigItemProps<T extends NodeTypes, O> = Omit<Node<T>, "type"> & {
  value: any;
  target: any;
  options?: O;
  onChange: (target: any, field: string, val: any) => void;
};
