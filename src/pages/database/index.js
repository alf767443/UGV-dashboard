// material-ui
import { Grid, Typography, Stack } from '@mui/material';
// project import
import { BatteryButtons } from './buttons/batteryButtons';
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
                <BatteryButtons />
            </Stack>
        </Grid>
    );
};

export default DataBase;
