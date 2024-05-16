import type { NodeOptions, NodeTypes } from "./ConfigRegister";

export type Node<T extends NodeTypes> = {
  type: T;
  field: string;
  label?: string;
  tip?: string;
  default?: any;
  hide?: boolean;
  options?: NodeOptions<T>;
  style?: React.CSSProperties;
  // slots?: Record<string, any>;
  properties?: Node<NodeTypes>[];
  portal?: string; // 移动当前节点到指定的节点
};

export type Scheme = Node<"object">;
