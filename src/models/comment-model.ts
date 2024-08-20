import mongoose from "mongoose";

export interface Comment {
  tag: string;
  text: string;
}

export interface MongoComment extends Comment, mongoose.Document {}

export type TComment = Comment & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};

const CommentSchema = new mongoose.Schema<Comment>({
  tag: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Comment ||
  mongoose.model<Comment>("Comment", CommentSchema);
