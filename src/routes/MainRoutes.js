import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// Render - Dashboard
const Dashboard = Loadable(lazy(() => import('pages/dashboard')));

// Render - Databases
const Database = Loadable(lazy(() => import('pages/database')));

const DatabaseBattery = Loadable(lazy(() => import('pages/database/pages/battery')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));

// render - utilities
const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));
const Color = Loadable(lazy(() => import('pages/components-overview/Color')));
const Shadow = Loadable(lazy(() => import('pages/components-overview/Shadow')));
const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <Dashboard />
        },
        {
            path: 'information',
            children: [
                {
                    path: 'dashboard',
                    element: <Dashboard />
                },
                {
                    path: 'dbs',
                    children: [
                        {
                            path: '',
                            element: <Database />
                        }, {
                            path: 'battery',
                            element: <DatabaseBattery />
                        }
                    ]
                },
                {
                    path: 'logs',
                    element: <Dashboard />
                }
            ]
        },
        {
            path: 'sample-page',
            element: <SamplePage />
        },
        {
            path: 'shadow',
            element: <Shadow />
        },
        {
            path: 'typography',
            element: <Typography />
        },
        {
            path: 'icons/ant',
            element: <AntIcons />
        },
        {
            path: 'color',
            element: <Color />
        }
    ]
};

export default MainRoutes;
