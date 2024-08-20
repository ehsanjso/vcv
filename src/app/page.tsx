import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import Visualizer from "@/components/visualizer";
import { api, HydrateClient } from "@/trpc/server";

export default async function Home() {
  const hello = await api.node.getNodes();

  console.log(hello);

  // void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <div className="grid h-screen w-full pl-[56px]">
        <Sidebar />
        <div className="flex flex-col">
          <Header />
          <Visualizer />
        </div>
      </div>
    </HydrateClient>
  );
}
