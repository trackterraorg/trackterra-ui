import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import DashboardApp from './pages/DashboardApp';
import NotFound from './pages/Page404';
import Home from './pages/Home';
import TxPage from './pages/Txs';
import ProtocolsPage from './pages/Protocols';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/account/:address',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="dashboard" replace /> },
        { path: 'dashboard', element: <DashboardApp /> },
        { path: 'txs', element: <TxPage /> },
        { path: 'protocols', element: <ProtocolsPage /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Home /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" /> }
  ]);
}
