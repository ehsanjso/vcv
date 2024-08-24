import { type Node, type NodeProps } from "@xyflow/react";
import NodeMenu from "./node-menu";
import * as d3 from "d3";

export type CustomNodeType = Node<{
  name: string;
  comment?: string;
  d3Node?: d3.HierarchyPointNode<CustomNodeType>;
}>;

export default function Node(props: NodeProps<CustomNodeType>) {
  return (
    <>
      <NodeMenu {...props} />
      <div className="grid w-[8rem] min-w-[8rem] items-start gap-0 overflow-hidden rounded-lg border border-border bg-background pt-1 text-xs shadow-xl transition-all ease-in-out hover:border-primary">
        <p className="break-all px-1.5 font-mono font-medium">
          {props.data.name}
        </p>
        <div className="border-t border-border px-1.5 py-1">
          <div className="flex font-mono text-[8px] leading-snug text-muted-foreground">
            <p className="w-[7.5rem] truncate font-medium">{`id:${props.id}`}</p>
          </div>
          {props.data.comment && (
            <div className="flex font-mono text-[8px] leading-snug text-muted-foreground">
              <p className="w-[7.5rem] truncate font-medium">{`comment:${props.data.comment}`}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
