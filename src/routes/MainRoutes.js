import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// Render - Dashboard
const Dashboard = Loadable(lazy(() => import('pages/dashboard')));

// Render - Databases
const Database = Loadable(lazy(() => import('pages/database')));

const DatabaseBattery = Loadable(lazy(() => import('pages/database/pages/battery')));
const DatabaseMotors = Loadable(lazy(() => import('pages/database/pages/motors')));
const DatabasePosition = Loadable(lazy(() => import('pages/database/pages/position')));
const DatabaseMap = Loadable(lazy(() => import('pages/database/pages/map')));
const DatabaseActions = Loadable(lazy(() => import('pages/database/pages/actions')));
const DatabaseConnection = Loadable(lazy(() => import('pages/database/pages/connection')));
const DatabaseDiagnostics = Loadable(lazy(() => import('pages/database/pages/diagnostics')));
const DatabaseOdometry = Loadable(lazy(() => import('pages/database/pages/odometry')));
const DatabaseNodes = Loadable(lazy(() => import('pages/database/pages/nodes')));

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
                        }, {
                            path: 'motors',
                            element: <DatabaseMotors />
                        }, {
                            path: 'position',
                            element: <DatabasePosition />
                        }, {
                            path: 'maps',
                            element: <DatabaseMap />
                        }, {
                            path: 'actions',
                            element: <DatabaseActions />
                        }, {
                            path: 'connection',
                            element: <DatabaseConnection />
                        }, {
                            path: 'diagnostic',
                            element: <DatabaseDiagnostics />
                        }, {
                            path: 'odometry',
                            element: <DatabaseOdometry />
                        }, {
                            path: 'nodes',
                            element: <DatabaseNodes />
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
