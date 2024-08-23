import { CustomNodeType } from "@/components/node";
import { type Edge } from "@xyflow/react";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type InputNode = {
  id: string;
  prev: string | null;
  metadata: {
    name: string;
  };
};

type InputComment = {
  tag: string;
  text: string;
};

export type InputData = {
  nodes: InputNode[];
  comments: InputComment[];
};

export function convertData(input: InputData): {
  nodes: CustomNodeType[];
  edges: Edge[];
} {
  const nodes: CustomNodeType[] = [];
  const edges: Edge[] = [];

  // Create a map for quick lookup of comments by tag
  const commentsMap = new Map<string, string>();
  input.comments.forEach((comment) => {
    commentsMap.set(comment.tag, comment.text);
  });

  input.nodes.forEach((node) => {
    const type: "root" | "leaf" | "custom" =
      node.prev === null ? "root" : "custom";
    const comment = commentsMap.get(node.id);
    const convertedNode: CustomNodeType = {
      id: node.id,
      type,
      data: {
        name: node.metadata.name,
        ...(comment && { comment }),
      },
      position: {
        x: 0,
        y: 0,
      },
    };

    nodes.push(convertedNode);

    // Create an edge if the node has a previous node
    if (node.prev) {
      edges.push({
        id: `e${node.prev}-${node.id}`,
        source: node.prev,
        target: node.id,
        animated: true,
      });
    }
  });

  // Identify leaf nodes (nodes that are not referenced as 'prev' by any other node)
  const referencedNodes = new Set(
    input.nodes.map((node) => node.prev).filter((prev) => prev !== null),
  );
  nodes.forEach((node) => {
    if (!referencedNodes.has(node.id) && node.type !== "root") {
      node.type = "leaf";
    }
  });

  return { nodes, edges };
}
