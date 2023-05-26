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

// Script
const Logs = Loadable(lazy(() => import('pages/logs/logList')));
const LogsHistory = Loadable(lazy(() => import('pages/logs/logHistory')));

// Render - Edit
const EditPlot = Loadable(lazy(() => import('pages/editGraph')));
const EditorScript = Loadable(lazy(() => import('pages/editScript')));


// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: 'information',
            children: [
                {
                    path: 'dbs',     
                    children: [
                        {
                            path: '',
                            element: <Database />
                        },
                        {
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
                    children: [
                        {
                            path: '',
                            element: <Logs />
                        },
                        {
                            path: 'history',
                            element: <LogsHistory />
                        }
                    ]
                },
                {
                    path: 'dashboard',
                    element: <Dashboard />
                }
            ]
        },
        {
            path: 'edit',
            children: [
                {
                    path: 'chart',
                    element: <EditPlot />
                }, 
                {
                    path: 'script',
                    element: <EditorScript />
                }, 
            ]
        },
    ]
};

export default MainRoutes;
