import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// render - login
// const AuthLogin = Loadable(lazy(() => import('pages/authentication/Login')));
const AuthRegister = Loadable(lazy(() => import('pages/authentication/Register')));


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
        {
            path: 'debug1',
            element: <AuthRegister />
        }
    ]
};

export default LoginRoutes;
