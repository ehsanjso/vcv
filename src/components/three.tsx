"use client";
import * as d3 from "d3";
import React, { useEffect, useMemo } from "react";
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
import { convertArrayToObject, convertData, InputData } from "@/lib/utils";

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
    nodes: layout.descendants().map((node) => ({
      ...node.data,
      data: {
        ...node.data.data,
        d3Node: node,
      },
      position: { x: node.x, y: node.y },
    })),
    edges,
  };
};

export default function Three({ data }: { data: InputData }) {
  const { nodes: initialNodes, edges: initialEdges } = useMemo(
    () => convertData(data),
    [data],
  );
  const { nodes: layoutedNodes, edges: layoutedEdges } = useMemo(
    () => applyLayout(initialNodes, initialEdges),
    [initialNodes, initialEdges],
  );
  const [nodes, setNodes, onNodesChange] = useNodesState([...layoutedNodes]);
  const [edges, setEdges] = useEdgesState([...layoutedEdges]);
  const [selectedNode, setSelectedNode] = React.useState<
    CustomNodeType | undefined
  >();
  const nodeTypes: NodeTypes = useMemo(
    () => ({ custom: CustomNode, leaf: LeafNode, root: RootNode }),
    [],
  );

  useEffect(() => {
    setNodes([...layoutedNodes]);
    setEdges([...layoutedEdges]);
  }, [layoutedNodes, layoutedEdges]);

  const highlightPath = (
    ancestors: d3.HierarchyPointNode<CustomNodeType>[],
  ) => {
    if (ancestors) {
      const lookupNodes = convertArrayToObject(ancestors);
      setNodes((prevNodes) =>
        prevNodes?.map((node) => {
          const highlight = node.id in lookupNodes;

          return {
            ...node,
            style: {
              ...node.style,
              opacity: highlight ? 1 : 0.25,
            },
          };
        }),
      );

      setEdges((prevEdges) =>
        prevEdges?.map((edge) => {
          const highlight =
            edge.source in lookupNodes && edge.target in lookupNodes;

          return {
            ...edge,
            style: {
              ...edge.style,
              opacity: highlight ? 1 : 0.25,
            },
          };
        }),
      );
    }
  };

  const resetNodeStyles = () => {
    setNodes((prevNodes) => {
      return prevNodes?.map((node) => {
        return {
          ...node,
          style: {
            ...node.style,
            opacity: 1,
          },
        };
      });
    });
    setEdges((prevEdges) =>
      prevEdges?.map((edge) => {
        return {
          ...edge,
          style: {
            ...edge.style,
            opacity: 1,
          },
        };
      }),
    );
  };

  useEffect(() => {
    if (selectedNode && selectedNode.data.d3Node) {
      highlightPath(selectedNode.data.d3Node.ancestors());
    }
  }, [selectedNode]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      elementsSelectable={true}
      fitView
      edgesFocusable={false}
      edgesReconnectable={false}
      nodesDraggable={false}
      nodesConnectable={false}
      onSelectionChange={(selectedElements) => {
        const selectedNode = selectedElements.nodes[0] as CustomNodeType;
        setSelectedNode(selectedNode);
      }}
      onPaneClick={() => {
        resetNodeStyles();
        setSelectedNode(undefined);
      }}
    >
      <Controls
        position="bottom-right"
        className="mb-6 rounded-md bg-slate-100 dark:bg-slate-900"
      />
    </ReactFlow>
  );
}
