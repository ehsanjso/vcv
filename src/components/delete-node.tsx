import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { CustomNodeType } from "./node";
import { type NodeProps } from "@xyflow/react";
import { useCallback } from "react";
import { api } from "@/trpc/react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function DeleteNode({
  node,
  setOpen,
}: {
  node: NodeProps<CustomNodeType>;
  setOpen: (open: boolean) => void;
}) {
  const router = useRouter();
  const { data, mutate } = api.node.deleteNode.useMutation({
    onSuccess() {
      router.refresh();
    },
  });
  const descendants = node.data.d3Node ? node.data.d3Node.descendants() : [];

  const onDelete = useCallback(() => {
    if (descendants) {
      mutate({
        ids: descendants.map((d) => d.data.id),
      });
      setOpen(false);
    }
  }, [descendants, setOpen]);

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogDescription className="flex flex-col">
          <span className="font-mono">
            List of Nodes that are going to be deleted:
          </span>
        </DialogDescription>
      </DialogHeader>
      <ul className="list-disc pl-4">
        {descendants.map((d, index) => (
          <li key={d.data.id}>
            <ul className="py-1">
              <li className="px-3">
                <span className="font-mono">{`node id: ${d.id}`}</span>
              </li>
              <li className="px-3">
                <span className="font-mono">{`node name: ${d.data.data.name}`}</span>
              </li>
              {d.data.data.comment && (
                <li className="px-3">
                  <span className="font-mono">{`node comment: ${d.data.data.comment}`}</span>
                </li>
              )}
            </ul>
          </li>
        ))}
      </ul>
      <DialogFooter>
        <Button variant="destructive" onClick={onDelete}>
          Delete
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setOpen(false);
          }}
        >
          Discard
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
