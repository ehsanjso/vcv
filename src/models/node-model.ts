import mongoose from "mongoose";

export interface INode extends mongoose.Document {
  prev: null | string;
  metadata: {
    name: string;
  };
}

const NodeSchema = new mongoose.Schema<INode>(
  {
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
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
  },
);

const Node: mongoose.Model<INode> =
  mongoose.models?.Node || mongoose.model("Node", NodeSchema);

export default Node;
