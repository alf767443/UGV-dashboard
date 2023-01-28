// Import from react
import React from 'react';

// material-ui
import { TireRepair } from '@mui/icons-material';
// project import
import DataBaseButtons from './button';

export const MotorsButtons = () => {
    return (
        <DataBaseButtons href={'dbs/motors/'} Title={'Motors'} Icon={TireRepair} />
    );
};
