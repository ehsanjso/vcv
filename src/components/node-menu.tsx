import { NodeToolbar, Position } from "@xyflow/react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Button } from "./ui/button";
import { CirclePlus, CircleX, GitBranch, Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function NodeMenu({ isLeaf }: { isLeaf: boolean }) {
  return (
    <Dialog>
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

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
