import { Handle, Position, type NodeProps } from "@xyflow/react";
import Node, { type CustomNodeType } from "./node";

export default function CustomNode(props: NodeProps<CustomNodeType>) {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <Node {...props} />
      <Handle type="source" position={Position.Bottom} id="a" />
    </>
  );
}
