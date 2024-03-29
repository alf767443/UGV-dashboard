// material-ui
import { Grid, Typography, Stack, Divider } from '@mui/material';
// project import
import { BatteryButtons } from './buttons/batteryButtons';
import { MotorsButtons } from './buttons/motorsButtons';
import { PositionButtons } from './buttons/positionButtons';
import { MapButtons } from './buttons/mapButtons';
import { ActionsButtons } from './buttons/actionsButtons';
import { ConnectionButtons } from './buttons/connectionButtons';
import { DiagnosticButtons } from './buttons/diagnosticButtons';
import { OdometryButtons } from './buttons/odometryButtons';
import { NodesButtons } from './buttons/nodesButtons';
import { ProcessesButtons } from './buttons/processButtons';
import { ComputerButtons } from './buttons/computerButtons';

import styles from './styles';



// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DataBase = () => {
    return (
        <Stack container {...styles.stack}>
            {/* Data bases */}
            <Typography {...styles.typography.title}>
                Data bases
            </Typography>
            <Grid container {...styles.grid.main}>
                <Grid item {...styles.grid.button}>
                    <BatteryButtons />
                </Grid>
                <Grid item {...styles.grid.button}>
                    <MotorsButtons />
                </Grid>
                <Grid item {...styles.grid.button}>
                    <PositionButtons />
                </Grid>
                <Grid item {...styles.grid.button}>
                    <ActionsButtons />
                </Grid>
                <Grid item {...styles.grid.button}>
                    <ConnectionButtons />
                </Grid>
                <Grid item {...styles.grid.button}>
                    <DiagnosticButtons />
                </Grid>
                <Grid item {...styles.grid.button}>
                    <OdometryButtons />
                </Grid>
                <Grid item {...styles.grid.button}>
                    <NodesButtons />
                </Grid>
                <Grid item {...styles.grid.button}>
                    <ProcessesButtons />
                </Grid>
                <Grid item {...styles.grid.button}>
                    <ComputerButtons />
                </Grid>
            </Grid>

            <Divider variant="middle" />

            {/* Extra visualizations */}
            <Typography {...styles.typography.title}>
                More visualizations
            </Typography>
            <Grid container {...styles.grid.main}>
                <Grid item {...styles.grid.button}>
                    <MapButtons />
                </Grid>
            </Grid>
        </Stack>
    );
};

export default DataBase;
