import { nodeRouter } from "@/server/api/routers/node";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { commentRouter } from "@/server/api/routers/comment";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  node: nodeRouter,
  comment: commentRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.node.all();
 *       ^? Node[]
 */
export const createCaller = createCallerFactory(appRouter);
