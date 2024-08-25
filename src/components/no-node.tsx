"use client";

import React, { use, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { GitBranch } from "lucide-react";
import AddNode from "./add-node";

export default function NoNode() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="flex h-full w-full flex-1 flex-col items-center justify-center gap-5">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          No node found! Create your first node.
        </h2>
        <DialogTrigger asChild>
          <Button>
            <GitBranch className="mr-2 h-4 w-4" /> Add Node
          </Button>
        </DialogTrigger>
      </div>
      <AddNode nodeId={null} nodeName={null} setOpen={setOpen} />
    </Dialog>
  );
}
