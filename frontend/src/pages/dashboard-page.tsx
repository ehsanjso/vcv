import Sidebar from '@/components/sidebar';
import Header from '@/components/header';
import Visualizer from '@/components/visualizer';

export default function DashboardPage() {
  return (
    <div className="grid h-screen w-full pl-[56px]">
      <Sidebar />
      <div className="flex flex-col">
        <Header />
        <Visualizer />
      </div>
    </div>
  );
}
