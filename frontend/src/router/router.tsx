import NotFoundPage from '@/pages/not-found-page';
import DashboardPage from '@/pages/dashboard-page';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/components/layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '/',
        element: <DashboardPage />,
      },
    ],
  },
]);
