import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout/index';

// render - login
const RobotLogin = Loadable(lazy(() => import('pages/robot/pages/Login')));
const RobotRegister = Loadable(lazy(() => import('pages/robot/pages/Register')));

// ==============================|| AUTH ROUTING ||============================== //

const RobotRoutes = {
    path: '/robot',
    element: <MinimalLayout />,
    children: [
        {
            path: 'login',
            element: <RobotLogin />
        },
        {
            path: 'register',
            element: <RobotRegister />
        }
    ]
        
};

export default RobotRoutes;
