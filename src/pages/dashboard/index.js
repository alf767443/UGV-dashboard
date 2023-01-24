// material-ui
import { Grid } from '@mui/material';
import DemoHeatmap from 'graphs/heatmaps/posConnection';
import MotorBullets from 'graphs/motors/groupBullet';

// project import

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
    return (
        <Grid container rowSpacing={1.75} columnSpacing={2}>
            {/* Main block */}
            <DemoHeatmap />
            <MotorBullets />
        </Grid>
    );
};

export default DashboardDefault;
