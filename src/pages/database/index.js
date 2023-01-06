//import { useState } from 'react';

// material-ui
import { Grid, Typography, Stack } from '@mui/material';
// project import
//import DataBaseButtons from './buttons/button';
import { PositionButtons } from './buttons/positionButtons';
import { BatteryButtons } from './buttons/batteryButtons';
import { ActionButtons } from './buttons/actionButtons';
import { RouteButtons } from './buttons/routeButtons';
import { DecisionButtons } from './buttons/decisionButtons';
import { stackParameters } from './styles';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DataBase = () => {
    return (
        <Grid container rowSpacing={3} columnSpacing={1.25}>
            {/* Main block */}
            <Stack
                direction={stackParameters.direction}
                justifyContent={stackParameters.justifyContent}
                alignItems={stackParameters.alignItems}
                spacing={stackParameters.spacing}
            >
                {/*Spacing*/}
                <Typography variant="h3" color="textSecondary"></Typography>
                {/*Position databases*/}
                <PositionButtons />
                {/*Decisions databases*/}
                <DecisionButtons />
                {/*Battery databases*/}
                <BatteryButtons />
                {/*Actions databases*/}
                <ActionButtons />
                {/*Route databases*/}
                <RouteButtons />
            </Stack>
        </Grid>
    );
};

export default DataBase;
