import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';


// Render - Debug
const Debug = Loadable(lazy(() => import('pages/debug')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: 'debug',
            element: <Debug />
        },
    ]
};

export default LoginRoutes;
