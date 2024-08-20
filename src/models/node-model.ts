import mongoose from "mongoose";

export interface Node {
  prev: null | string;
  metadata: {
    name: string;
  };
}

export interface MongoNode extends Node, mongoose.Document {}

export type TNode = Node & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};

const NodeSchema = new mongoose.Schema<Node>({
  prev: {
    type: String || null,
    required: true,
  },
  metadata: {
    name: {
      type: String,
      required: true,
    },
  },
});

export default mongoose.models.Node || mongoose.model<Node>("Node", NodeSchema);
