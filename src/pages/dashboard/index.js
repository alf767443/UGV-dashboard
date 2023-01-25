// material-ui
import { Grid, Stack } from '@mui/material';
import DemoHeatmap from 'graphs/heatmaps/posConnection';
import BatteryBullets from 'graphs/battery/groupBullet'
import MotorBullets from 'graphs/motors/groupBullet';
import PercentageDatetimeArea from 'graphs/battery/percentageDatetimeArea';

// project import

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
    return (
        <Grid container rowSpacing={1.75} columnSpacing={2}>
            {/* Main block */}
            
            {/*First column*/}
            <Stack spacing={0} direction={'column'} alignItems={'center'}>
                {/*Battery group*/}
                <Grid>
                    <PercentageDatetimeArea />
                    <BatteryBullets />
                </Grid>
            </Stack>
            {/*Second column*/}
            <Stack spacing={0} direction={'column'} alignItems={'center'}>
                {/*Battery group*/}
                <Grid>
                    
                    <PercentageDatetimeArea />
                    <MotorBullets />
                </Grid>
            </Stack>
            <Grid>
                <DemoHeatmap />
                <MotorBullets />
            </Grid>
            
        </Grid>
    );
};

export default DashboardDefault;
