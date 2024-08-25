import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import NodeModel from "@/models/node-model";
import CommentModel from "@/models/comment-model";
import dbConnect from "@/db/mongoose";

export const nodeRouter = createTRPCRouter({
  getNodes: publicProcedure.query(async () => {
    await dbConnect();
    const nodes = await NodeModel.find();
    return nodes;
  }),
  addNode: publicProcedure
    .input((v) => {
      const schema = z.object({
        name: z.string().min(1),
        comment: z.string().optional(),
        prev: z.string().nullable(),
      });
      const result = schema.safeParse(v);
      if (!result.success) {
        throw result.error;
      }
      return result.data;
    })
    .mutation(async ({ input }) => {
      await dbConnect();
      const node = await NodeModel.create({
        prev: input.prev,
        metadata: {
          name: input.name,
        },
      });
      if (input.comment) {
        const comment = await CommentModel.create({
          tag: node.id,
          text: input.comment,
        });
        return {
          node,
          comment,
        };
      }
      return {
        node,
      };
    }),
  editNode: publicProcedure
    .input((v) => {
      const schema = z.object({
        id: z.string(),
        name: z.string().min(1),
        comment: z.string().optional(),
      });
      const result = schema.safeParse(v);
      if (!result.success) {
        throw result.error;
      }
      return result.data;
    })
    .mutation(async ({ input }) => {
      await dbConnect();
      const node = await NodeModel.findById(input.id);
      const comment = await CommentModel.findOne({
        tag: input.id,
      });
      if (node) {
        Object.assign(node, {
          ...node,
          metadata: {
            name: input.name,
          },
        });
        await node.save();
      }
      if (comment) {
        Object.assign(comment, {
          ...comment,
          text: input.comment,
        });
        await comment.save();
        return {
          node,
          comment,
        };
      } else if (input.comment) {
        const newComment = await CommentModel.create({
          tag: input.id,
          text: input.comment,
        });
        return {
          node,
          comment: newComment,
        };
      }
      return {
        node,
      };
    }),
  deleteNode: publicProcedure
    .input((v) => {
      const schema = z.object({
        ids: z.array(z.string()),
      });
      const result = schema.safeParse(v);
      if (!result.success) {
        throw result.error;
      }
      return result.data;
    })
    .mutation(async ({ input }) => {
      await dbConnect();
      const nodes = await NodeModel.find({
        _id: {
          $in: input.ids,
        },
      });
      const comments = await CommentModel.find({
        tag: {
          $in: input.ids,
        },
      });
      await NodeModel.deleteMany({
        _id: {
          $in: input.ids,
        },
      });
      await CommentModel.deleteMany({
        tag: {
          $in: input.ids,
        },
      });
      return {
        nodes,
        comments,
      };
    }),
});
