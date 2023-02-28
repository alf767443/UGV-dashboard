// Import from react
import React from 'react';

// material-ui
import { AddRoad } from '@mui/icons-material';
// project import
import DataBaseButtons from './button';

export const OdometryButtons = () => {
    return (
        <DataBaseButtons href={'dbs/odometry/'} Title={'Odometry'} Icon={AddRoad} />
    );
};
