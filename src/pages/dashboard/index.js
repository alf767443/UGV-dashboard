// material-ui
import { Grid } from '@mui/material';

// project import
import BatteryIcon from 'graphs/battery/batteryIcon';
import DBSwitch from 'components/Switch/DBSwitch';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
    return (
        <Grid container rowSpacing={1.75} columnSpacing={2}>
            {/* Main block */}
            <BatteryIcon percent={0.2} />
            <BatteryIcon percent={0.4} />
            <DBSwitch />
        </Grid>
    );
};

export default DashboardDefault;
