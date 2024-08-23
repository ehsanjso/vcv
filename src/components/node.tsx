import {
  NodeToolbar,
  Position,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Button } from "./ui/button";
import { CirclePlus, CircleX, GitBranch, Pencil } from "lucide-react";

export type CustomNodeType = Node<{ name: string; comment?: string }>;

export default function Node(props: NodeProps<CustomNodeType>) {
  const isLeaf = props.type === "leaf";
  return (
    <>
      <NodeToolbar isVisible={undefined} position={Position.Right}>
        <nav className="grid gap-1 overflow-hidden rounded-xl border-2 border-border/50 bg-background">
          {isLeaf ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg"
                  aria-label="Add Node"
                >
                  <CirclePlus className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Add Node
              </TooltipContent>
            </Tooltip>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg"
                  aria-label="Branch Off"
                >
                  <GitBranch className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Branch Off
              </TooltipContent>
            </Tooltip>
          )}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-lg"
                aria-label="Edit Node"
              >
                <Pencil className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Edit Node
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-lg"
                aria-label="Delete Node"
              >
                <CircleX className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Delete Node
            </TooltipContent>
          </Tooltip>
        </nav>
      </NodeToolbar>
      <div className="grid w-[8rem] min-w-[8rem] items-start gap-0 overflow-hidden rounded-lg border border-border/50 bg-background pt-1 text-xs shadow-xl transition-all ease-in-out hover:border-primary">
        <p className="truncate px-1.5 font-mono font-medium">
          {props.data.name}
        </p>
        <div className="border-t border-border/50 px-1.5 py-1">
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
