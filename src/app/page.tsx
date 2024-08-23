import Visualizer from "@/components/visualizer";
import { api, HydrateClient } from "@/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <Visualizer />
    </HydrateClient>
  );
}
