import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import NodeModel, { TNode } from "@/models/node-model";
import dbConnect from "@/db/mongoose";
import { metadata } from "@/app/layout";

export const nodeRouter = createTRPCRouter({
  getNodes: publicProcedure.query(async () => {
    await dbConnect();
    // get all nodes
    const nodes = await NodeModel.find();
    return nodes;
  }),
});
