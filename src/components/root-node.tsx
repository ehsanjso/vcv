import { Handle, Position, type NodeProps } from "@xyflow/react";
import Node, { type CustomNodeType } from "./node";

export default function RootNode(props: NodeProps<CustomNodeType>) {
  return (
    <>
      <Node {...props} />
      <Handle type="source" position={Position.Bottom} id="a" />
    </>
  );
}
