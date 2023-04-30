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
const DatabaseProcesses = Loadable(lazy(() => import('pages/database/pages/processes')));
const DatabaseComputer = Loadable(lazy(() => import('pages/database/pages/computer')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: 'dashboard',
            element: <Dashboard />
        },
        {
            path: 'information',
            children: [
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
                        }, {
                            path: 'processes',
                            element: <DatabaseProcesses />
                        }, {
                            path: 'computer',
                            element: <DatabaseComputer />
                        }

                    ]
                },
                {
                    path: 'logs',
                    element: <Dashboard />
                }
            ]
        },
    ]
};

export default MainRoutes;
