import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import CommentModel from "@/models/comment-model";
import dbConnect from "@/db/mongoose";

export const commentRouter = createTRPCRouter({
  getComments: publicProcedure.query(async () => {
    await dbConnect();
    const comments = await CommentModel.find();
    return comments;
  }),
  addComment: publicProcedure
    .input((v) => {
      const schema = z.object({
        tag: z.string(),
        text: z.string().min(1),
      });
      const result = schema.safeParse(v);
      if (!result.success) {
        throw result.error;
      }
      return result.data;
    })
    .mutation(async ({ input }) => {
      await dbConnect();
      const comment = await CommentModel.create({
        tag: input.tag,
        text: input.text,
      });
      return {
        comment,
      };
    }),
});
