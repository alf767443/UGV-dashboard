// Import from react
import React from 'react';

// material-ui
import { Grid, Typography } from '@mui/material';
import { PendingActions, FormatListNumbered } from '@mui/icons-material';
// project import
import DataBaseButtons from './button';
import { gridParameters } from '../styles';

export const ActionButtons = () => {
    return (
        <Grid >
            <Typography variant="h3" color="textSecondary">
                Actions databases
            </Typography>
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
                    <DataBaseButtons href={'dbs/actions/actions'} Title={'Actions'} Icon={PendingActions} />
                </Grid>
                <Grid
                    item
                    xs={gridParameters.xs}
                    sm={gridParameters.sm}
                    md={gridParameters.md}
                    lg={gridParameters.lg}
                    xl={gridParameters.xl}
                >
                    <DataBaseButtons href={'dbs/actions/queue'} Title={'Queue'} Icon={FormatListNumbered} />
                </Grid>
            </Grid>
        </Grid>
    );
};
