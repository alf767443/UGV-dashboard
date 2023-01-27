// material-ui
import { Grid, Stack } from '@mui/material';
// project import
import { BatteryButtons } from './buttons/batteryButtons';
import { MotorsButtons } from './buttons/motorsButtons';
import { PositionButtons } from './buttons/positionButtons'
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
                <BatteryButtons />
                <MotorsButtons />
                <PositionButtons />
            </Stack>
        </Grid>
    );
};

export default DataBase;
