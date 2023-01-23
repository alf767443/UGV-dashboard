// material-ui
import { Grid } from '@mui/material';
import DemoHeatmap from 'graphs/heatmaps/posConnection';
import PercentageBullet from 'graphs/battery/percentageBullet';

// project import

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
    return (
        <Grid container rowSpacing={1.75} columnSpacing={2}>
            {/* Main block */}
            <DemoHeatmap />
            <PercentageBullet />
        </Grid>
    );
};

export default DashboardDefault;