import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';
import Loading from '@/components/loading';

export default function Layout() {
  const loading = false;
  return (
    <>
      {!loading ? (
        <Outlet />
      ) : (
        <div className="flex justify-center items-center w-full h-screen">
          <Loading />
        </div>
      )}
      <Toaster position="top-center" />
    </>
  );
}
