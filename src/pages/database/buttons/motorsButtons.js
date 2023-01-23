// Import from react
import React from 'react';

// material-ui
import { Grid } from '@mui/material';
import { TireRepair } from '@mui/icons-material';
// project import
import DataBaseButtons from './button';
import { gridParameters } from '../styles';

export const MotorsButtons = () => {
    return (
        <Grid>
            <Grid
                container
                columnSpacing={gridParameters.columnSpacing}
                justifyContent={gridParameters.justifyContent}
                direction={gridParameters.direction}
                alignItems={gridParameters.alignItems}
                columns={gridParameters.columns}
            >
                <Grid
                    item
                    xs={gridParameters.xs}
                    sm={gridParameters.sm}
                    md={gridParameters.md}
                    lg={gridParameters.lg}
                    xl={gridParameters.xl}
                >
                    <DataBaseButtons href={'dbs/motors/'} Title={'Motors'} Icon={TireRepair} />
                </Grid>
            </Grid>
        </Grid>
    );
};
