import { type Node, type NodeProps } from "@xyflow/react";
import NodeMenu from "./node-menu";

export type CustomNodeType = Node<{ name: string; comment?: string }>;

export default function Node(props: NodeProps<CustomNodeType>) {
  const isLeaf = props.type === "leaf";
  return (
    <>
      <NodeMenu isLeaf={isLeaf} />
      <div className="grid w-[8rem] min-w-[8rem] items-start gap-0 overflow-hidden rounded-lg border border-border bg-background pt-1 text-xs shadow-xl transition-all ease-in-out hover:border-primary">
        <p className="truncate px-1.5 font-mono font-medium">
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
