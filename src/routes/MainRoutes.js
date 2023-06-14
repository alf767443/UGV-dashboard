import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// Render - Dashboard
const Dashboard = Loadable(lazy(() => import('pages/dashboard')));

// Render - Databases
const DatabaseList = Loadable(lazy(() => import('pages/database/databaseList')));
const DatabaseDetail = Loadable(lazy(() => import('pages/database/databaseDetail')));


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
                            element: <DatabaseList />
                        },
                        {
                            path: 'detail',
                            element: <DatabaseDetail />
                        },
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
