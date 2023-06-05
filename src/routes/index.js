import { useRoutes } from 'react-router-dom';
import { lazy } from 'react';
import Loadable from 'components/Loadable';

// project import
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';
import DebugRoutes from './DebugRoutes';
import RobotRoutes from './RobotRoutes';


const FallbackPage = Loadable(lazy(() => import('pages/fallback')));

// ==============================|| ROUTING RENDER ||============================== //

const Fallback = {path:'*', element: <FallbackPage/>}

export default function ThemeRoutes() {
    return useRoutes([MainRoutes, LoginRoutes, RobotRoutes, DebugRoutes, Fallback]);
}
