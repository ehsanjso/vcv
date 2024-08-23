"use client";
import * as d3 from "d3";
import React, { useMemo } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  Controls,
  type Edge,
  type NodeTypes,
} from "@xyflow/react";
import CustomNode from "./custom-node";
import LeafNode from "./leaf-node";
import RootNode from "./root-node";
import type { CustomNodeType } from "./node";
import { convertData, InputData } from "@/lib/utils";

const applyLayout = (nodes: CustomNodeType[], edges: Edge[]) => {
  if (nodes.length === 0) return { nodes, edges };

  const height = 50;
  const width = 100;
  const hierarchy = d3
    .stratify<CustomNodeType>()
    .id((node) => node.id)
    .parentId((node) => edges.find((edge) => edge.target === node.id)?.source);
  const root = hierarchy(nodes);
  const layout = d3.tree<CustomNodeType>().nodeSize([width * 2, height * 2])(
    root,
  );

  return {
    nodes: layout
      .descendants()
      .map((node) => ({ ...node.data, position: { x: node.x, y: node.y } })),
    edges,
  };
};

export default function Three({ data }: { data: InputData }) {
  const { nodes: initialNodes, edges: initialEdges } = useMemo(
    () => convertData(data),
    [data],
  );
  const { nodes: layoutedNodes, edges: layoutedEdges } = applyLayout(
    initialNodes,
    initialEdges,
  );
  const [nodes, , onNodesChange] = useNodesState([...layoutedNodes]);
  const [edges] = useEdgesState([...layoutedEdges]);
  const nodeTypes: NodeTypes = useMemo(
    () => ({ custom: CustomNode, leaf: LeafNode, root: RootNode }),
    [],
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      fitView
      edgesFocusable={false}
      edgesReconnectable={false}
      nodesDraggable={false}
      nodesConnectable={false}
    >
      <Controls
        position="bottom-right"
        className="mb-6 rounded-md bg-slate-100 dark:bg-slate-900"
      />
    </ReactFlow>
  );
}
