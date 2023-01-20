// material-ui
import { Grid } from '@mui/material';
import BatteryTimePlot from 'graphs/battery/batteryTimePlot';

// project import

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
    return (
        <Grid container rowSpacing={1.75} columnSpacing={2}>
            {/* Main block */}
            <BatteryTimePlot />
        </Grid>
    );
};

export default DashboardDefault;
