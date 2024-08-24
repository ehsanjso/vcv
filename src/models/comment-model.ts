import mongoose from "mongoose";

export interface IComment extends mongoose.Document {
  tag: string;
  text: string;
}

const CommentSchema = new mongoose.Schema<IComment>(
  {
    tag: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
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

const Comment: mongoose.Model<IComment> =
  mongoose.models?.Comment || mongoose.model("Comment", CommentSchema);

export default Comment;
