// material-ui
import { Grid } from '@mui/material';
import DemoHeatmap from 'graphs/heatmaps/posConnection';
import BatteryBullets from 'graphs/battery/groupBullet'


// project import

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
    return (
        <Grid container rowSpacing={1.75} columnSpacing={2}>
            {/* Main block */}
            <DemoHeatmap />
            <BatteryBullets />
        </Grid>
    );
};

export default DashboardDefault;
