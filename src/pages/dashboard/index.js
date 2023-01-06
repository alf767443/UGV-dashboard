// material-ui
import { Grid } from '@mui/material';

// project import
import BatteryIcon from 'graphs/battery/batteryIcon';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
    return (
        <Grid container rowSpacing={1.75} columnSpacing={2}>
            {/* Main block */}
            <BatteryIcon percent={0.2} />
            <BatteryIcon percent={0.4} />
            <BatteryIcon percent={0.6} />
            <BatteryIcon percent={0.8} />
            <Grid item sx={{ mb: -2.25 }} direction={'row'}>
            </Grid>
        </Grid>
    );
};

export default DashboardDefault;
