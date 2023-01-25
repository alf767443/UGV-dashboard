// material-ui
import { Grid } from '@mui/material';
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
            
            {/*Battery group*/}
            <Grid>
                <PercentageDatetimeArea />
                <BatteryBullets />
            </Grid>

            <Grid>
                <DemoHeatmap />
                <MotorBullets />
            </Grid>
            
        </Grid>
    );
};

export default DashboardDefault;
