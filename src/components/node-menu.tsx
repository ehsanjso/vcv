import { NodeToolbar, Position, type NodeProps } from "@xyflow/react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { CirclePlus, CircleX, GitBranch, Pencil, Route } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import AddNode from "./add-node";
import { CustomNodeType } from "./node";
import { useCallback, useState } from "react";
import BranchOff from "./branch-off";
import DeleteNode from "./delete-node";
import EditNode from "./edit-node";

export default function NodeMenu(props: NodeProps<CustomNodeType>) {
  const isLeaf = props.type === "leaf";
  const [action, setAction] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const renderActionDialog = useCallback(() => {
    switch (action) {
      case "add":
        return (
          <AddNode
            nodeId={props.id}
            nodeName={props.data.name}
            setOpen={setOpen}
          />
        );
      case "branch":
        return (
          <BranchOff
            nodeId={props.id}
            nodeName={props.data.name}
            setOpen={setOpen}
          />
        );
      case "edit":
        return (
          <EditNode
            nodeId={props.id}
            nodeName={props.data.name}
            nodeComment={props.data.comment}
            setOpen={setOpen}
          />
        );
      case "delete":
        return <DeleteNode node={props} setOpen={setOpen} />;
      default:
        return null;
    }
  }, [action, setOpen, props.id, props.data.name, props.data.comment]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <NodeToolbar isVisible={undefined} position={Position.Right}>
        <nav className="grid gap-1 overflow-hidden rounded-xl border-2 border-border bg-background">
          {isLeaf ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-lg"
                    aria-label="Add Node"
                    onClick={() => setAction("add")}
                  >
                    <CirclePlus className="size-5" />
                  </Button>
                </DialogTrigger>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Add Node
              </TooltipContent>
            </Tooltip>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-lg"
                    aria-label="Branch Off"
                    onClick={() => setAction("branch")}
                  >
                    <GitBranch className="size-5" />
                  </Button>
                </DialogTrigger>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Branch Off
              </TooltipContent>
            </Tooltip>
          )}
          <Tooltip>
            <TooltipTrigger asChild>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg"
                  aria-label="Edit Node"
                  onClick={() => setAction("edit")}
                >
                  <Pencil className="size-5" />
                </Button>
              </DialogTrigger>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Edit Node
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg"
                  aria-label="Delete Node"
                  onClick={() => setAction("delete")}
                >
                  <CircleX className="size-5" />
                </Button>
              </DialogTrigger>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Delete Node
            </TooltipContent>
          </Tooltip>
        </nav>
      </NodeToolbar>
      {renderActionDialog()}
    </Dialog>
  );
}
