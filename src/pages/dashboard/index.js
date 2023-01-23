// material-ui
import { Grid } from '@mui/material';
import DemoHeatmap from 'graphs/heatmaps/posConnection';
import InstantDataBattery from 'graphs/battery/instantdata';

// project import

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
    return (
        <Grid container rowSpacing={1.75} columnSpacing={2}>
            {/* Main block */}
            <DemoHeatmap />
            <InstantDataBattery />
        </Grid>
    );
};

export default DashboardDefault;
