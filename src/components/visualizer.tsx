import Three from "./three";
import { ReactFlowProvider } from "@xyflow/react";
import { api } from "@/trpc/server";

export default async function Visualizer() {
  const nodes = await api.node.getNodes();

  return (
    <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
      <div className="relative flex h-full min-h-[50vh] w-full flex-col rounded-xl bg-[radial-gradient(#1e293b_1px,transparent_1px)] p-4 [background-size:20px_20px] lg:col-span-3">
        <ReactFlowProvider>
          <Three data={{ nodes, comments: [] }} />
        </ReactFlowProvider>
      </div>
    </main>
  );
}
