import type { NodeOptions, NodeTypes } from "./ConfigRegister";

export type Node<T extends NodeTypes> = {
  type: T;
  field: string;
  label?: string;
  tip?: string;
  default?: any;
  options?: NodeOptions<T>;
  style?: React.CSSProperties;
  // slots?: Record<string, any>;
  properties?: Node<NodeTypes>[];
};

export type Scheme = Node<"object">;
