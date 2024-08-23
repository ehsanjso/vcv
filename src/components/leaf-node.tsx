import { Handle, Position, type NodeProps } from "@xyflow/react";
import Node, { type CustomNodeType } from "./node";

export default function LeafNode(props: NodeProps<CustomNodeType>) {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <Node {...props} />
    </>
  );
}
