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
const EditorPlot = Loadable(lazy(() => import('pages/graph/editGraph')));
const EditorScript = Loadable(lazy(() => import('pages/graph/editScript')));
const EditorAction = Loadable(lazy(() => import('pages/action/editAction')));


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
                    element: <EditorPlot />
                }, 
                {
                    path: 'script',
                    element: <EditorScript />
                }, 
                {
                    path: 'action',
                    element: <EditorAction />
                },
            ]
        },
    ]
};

export default MainRoutes;
