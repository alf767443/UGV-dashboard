// material-ui
import { Grid, Typography, Stack, Divider } from '@mui/material';
// project import
import { BatteryButtons } from './buttons/batteryButtons';
import { MotorsButtons } from './buttons/motorsButtons';
import { PositionButtons } from './buttons/positionButtons';

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
            </Grid>

            <Divider variant="middle" />

            {/* Extra visualizations */}
            <Typography {...styles.typography.title}>
                More visualizations
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
            </Grid>
        </Stack>

        // <Grid container rowSpacing={3} buttonSpacing={1.25}>
        //     {/* Main block */}
        //     <Stack
        //         direction={stackParameters.direction}
        //         justifyContent={stackParameters.justifyContent}
        //         alignItems={stackParameters.alignItems}
        //         spacing={stackParameters.spacing}
        //     >
        //         {/*Spacing*/}   
        //         <BatteryButtons />
        //         <MotorsButtons />
        //         <PositionButtons />
        //     </Stack>
        // </Grid>
    );
};

export default DataBase;
