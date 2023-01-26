// material-ui
import { Grid, Stack } from '@mui/material';
import DemoHeatmap from 'graphs/maps/positionMap';

import Battery_Bullet from 'graphs/battery/groupBullet';
import Battery_Area_Percentage from 'graphs/battery/percentageDatetimeArea';
import Battery_Area_Current from 'graphs/battery/currentDatetimeArea'

import Motor_Bullet from 'graphs/motors/groupBullet';
import Motor_Line_Current from 'graphs/motors/currentDatetimeLine';
import Motor_Line_PWM from 'graphs/motors/PWMDatetimeLine';

// project import

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
    return (
        <Grid container rowSpacing={1.75} columnSpacing={1.75}>       
            {/*First column*/}
            <Stack spacing={0} direction={'column'} alignItems={'center'}>
                {/*Battery group*/}
                <Grid>
                    <Battery_Area_Percentage />
                    <Battery_Area_Current />
                    <Battery_Bullet />
                </Grid>
            </Stack>
            {/*Second column*/}
            <Stack spacing={0} direction={'column'} alignItems={'center'}>
                {/*Motor group*/}
                <Grid>   
                    <Motor_Line_PWM />
                    <Motor_Line_Current />
                    <Motor_Bullet />
                </Grid>
            </Stack>
            {/*Third column*/}
            <Grid>  
                <DemoHeatmap />
            </Grid>
            
        </Grid>
    );
};

export default DashboardDefault;
