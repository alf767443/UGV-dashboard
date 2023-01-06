import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// Render - Dashboard
const Dashboard = Loadable(lazy(() => import('pages/dashboard')));

// Render - Databases
const Database = Loadable(lazy(() => import('pages/database')));

const DBActions = Loadable(lazy(() => import('pages/database/pages/actions')));
const DBAdministrator = Loadable(lazy(() => import('pages/database/pages/administrator')));
const DBFiducialmark = Loadable(lazy(() => import('pages/database/pages/fiducialmark')));
const DBGlobalposition = Loadable(lazy(() => import('pages/database/pages/globalposition')));
const DBGyroscope = Loadable(lazy(() => import('pages/database/pages/gyroscope')));
const DBOdometry = Loadable(lazy(() => import('pages/database/pages/odometry')));
const DBPhysical = Loadable(lazy(() => import('pages/database/pages/physical')));
const DBQueue = Loadable(lazy(() => import('pages/database/pages/queue')));
const DBRemote = Loadable(lazy(() => import('pages/database/pages/remote')));
const DBRobot = Loadable(lazy(() => import('pages/database/pages/robot')));
const DBRoute = Loadable(lazy(() => import('pages/database/pages/route')));
const DBStatus = Loadable(lazy(() => import('pages/database/pages/status')));

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
                        },
                        {
                            path: 'position',
                            children: [
                                {
                                    path: 'odometry',
                                    element: <DBOdometry />
                                },
                                {
                                    path: 'globalPosition',
                                    element: <DBGlobalposition />
                                },
                                {
                                    path: 'fiducialmark',
                                    element: <DBFiducialmark />
                                },
                                {
                                    path: 'gyroscope',
                                    element: <DBGyroscope />
                                }
                            ]
                        },
                        {
                            path: 'routes',
                            children: [
                                {
                                    path: 'routes',
                                    element: <DBRoute />
                                }
                            ]
                        },
                        {
                            path: 'battery',
                            children: [
                                {
                                    path: 'status',
                                    element: <DBStatus />
                                },
                                {
                                    path: 'physical',
                                    element: <DBPhysical />
                                }
                            ]
                        },
                        {
                            path: 'decisions',
                            children: [
                                {
                                    path: 'administrator',
                                    element: <DBAdministrator />
                                },
                                {
                                    path: 'remote',
                                    element: <DBRemote />
                                },
                                {
                                    path: 'robot',
                                    element: <DBRobot />
                                }
                            ]
                        },
                        {
                            path: 'actions',
                            children: [
                                {
                                    path: 'actions',
                                    element: <DBActions />
                                },
                                {
                                    path: 'queue',
                                    element: <DBQueue />
                                }
                            ]
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
