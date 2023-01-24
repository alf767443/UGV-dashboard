// material-ui
import { Grid } from '@mui/material';
import DemoHeatmap from 'graphs/heatmaps/posConnection';
import CurrentBullet from 'graphs/motors/currentBullet';
import { Stack } from '../../../node_modules/@mui/joy/index';


// project import

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
    return (
        <Grid container rowSpacing={1.75} columnSpacing={2}>
            {/* Main block */}
            <DemoHeatmap />
            <Stack direction={'column'} alignItems={'center'} spacing={0} >
                <CurrentBullet />
            </Stack>
        </Grid>
    );
};

export default DashboardDefault;
